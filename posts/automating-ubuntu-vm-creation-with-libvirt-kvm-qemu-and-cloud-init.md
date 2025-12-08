---
slug: automating-ubuntu-vm-creation-with-libvirt-kvm-qemu-and-cloud-init
title: Automating Ubuntu VM Creation with libvirt (KVM/QEMU) and Cloud-Init
description: Ever needed to spin up multiple Ubuntu VMs quickly for testing, development, or learning? In this post, I'll walk you through a bash script that automates the entire process using libvirt/KVM and cloud-init.
image: "https://i.imgur.com/sKCLcxY.png"
tags:
  - virtualization
  - ubuntu
  - libvirt
  - script
  - automating
  - python
  - github

publishedAt: 2025-12-08T04:34:51.706Z
---

Ever needed to spin up multiple Ubuntu VMs quickly for testing, development, or learning? In this post, I'll walk you through a bash script that automates the entire process using libvirt/KVM and cloud-init.

## What This Script Does

- Downloads the official Ubuntu Noble cloud image automatically
- Creates multiple VMs with customizable resources (memory, CPUs, disk)
- Configures static IPs in the 192.168.1.100-150 range
- Sets up SSH access via your GitHub public keys
- Pre-installs useful packages including Docker, Python 3.13, and a minimal desktop environment (Openbox)

## Prerequisites

Before running this script, make sure you have:

- A Linux host with KVM/QEMU installed
- `libvirt` and `virt-install` packages
- `cloud-localds` (from `cloud-image-utils` package)
- A bridge network interface (`br0`) configured
- `wget` for downloading the cloud image

Below is the script

```sh
#!/bin/bash

usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Launch Ubuntu VMs using libvirt/KVM with cloud-init configuration.

OPTIONS:
  -n, --num-vms NUM       Number of VMs to create (default: 1, max: 5)
  -m, --memory GB         Memory per VM in GB (default: 1, max: 8)
  -c, --cpus NUM          Number of CPUs per VM (default: 1, max: 2)
  -d, --disk-size GB      Disk size in GB (default: 10, min: 10)
  -g, --github USER       GitHub username for SSH key import (required)
  -h, --help              Show this help message and exit

EXAMPLES:
  $(basename "$0") -g myuser
  $(basename "$0") -n 3 -m 2 -c 2 -d 20 -g myuser
  $(basename "$0") --num-vms 5 --memory 4 --github myuser

NOTES:
  - VMs will be assigned IPs in the range 192.168.1.100-150
  - The script will automatically find available network octets
  - Ubuntu Noble cloud image will be downloaded if not present
EOF
  exit 0
}

NUM_VMS=1
MEMORY=1
CPUS=1
DISK_SIZE=10
GITHUB_USER=""

while [[ $# -gt 0 ]]; do
  case $1 in
    -n|--num-vms)
      NUM_VMS="$2"
      shift 2
      ;;
    -m|--memory)
      MEMORY="$2"
      shift 2
      ;;
    -c|--cpus)
      CPUS="$2"
      shift 2
      ;;
    -d|--disk-size)
      DISK_SIZE="$2"
      shift 2
      ;;
    -g|--github)
      GITHUB_USER="$2"
      shift 2
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Error: Unknown option $1"
      echo "Use -h or --help for usage information."
      exit 1
      ;;
  esac
done

if [ -z "$GITHUB_USER" ]; then
  echo "Error: GitHub username is required for SSH key import."
  echo "Use -g or --github to specify your GitHub username."
  echo "Use -h or --help for usage information."
  exit 1
fi

BASE_IMG="noble-server-cloudimg-amd64.img"
IMG_URL="https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img"
IMG_DIR="/var/lib/libvirt/images"
SUBNET="192.168.1"
GATEWAY="$SUBNET.1"

if [ $NUM_VMS -gt 5 ]; then
  echo "Error: Max 5 VMs to stay within 100-150 range."
  exit 1
fi

if [ $MEMORY -gt 8 ]; then
  echo "Error: Max memory is 8GB"
  exit 1
fi

if [ $CPUS -gt 2 ]; then
  echo "Error: Max CPUs is 2"
  exit 1
fi

if [ $DISK_SIZE -lt 10 ]; then
  echo "Error: Disk size must be at least 10GB to accommodate base image."
  exit 1
fi

if [ ! -f "$IMG_DIR/$BASE_IMG" ]; then
  echo "Downloading Ubuntu Noble cloud image..."
  wget -O "$IMG_DIR/$BASE_IMG" "$IMG_URL"
  if [ $? -ne 0 ]; then
    echo "Error: Failed to download the base image from $IMG_URL"
    exit 1
  fi
  echo "Base image downloaded successfully."
fi

is_octet_available() {
  local octet=$1
  local ip="$SUBNET.$octet"

  for vm in $(virsh list --all --name 2>/dev/null); do
    if [ -n "$vm" ]; then
      if [ "$vm" = "server-$octet" ]; then
        return 1
      fi
    fi
  done

  if ping -c 1 -W 1 "$ip" &>/dev/null; then
    return 1
  fi

  return 0
}

AVAILABLE_OCTETS=()
for octet in $(seq 100 150); do
  if is_octet_available $octet; then
    AVAILABLE_OCTETS+=($octet)
  fi
  if [ ${#AVAILABLE_OCTETS[@]} -ge $NUM_VMS ]; then
    break
  fi
done

if [ ${#AVAILABLE_OCTETS[@]} -lt $NUM_VMS ]; then
  echo "Error: Not enough available network addresses. Found ${#AVAILABLE_OCTETS[@]}, need $NUM_VMS."
  echo "Available range is 192.168.1.100-150. Some addresses may already be in use."
  exit 1
fi

echo "Found ${#AVAILABLE_OCTETS[@]} available network addresses."

for i in $(seq 0 $(($NUM_VMS - 1))); do
  OCTET=${AVAILABLE_OCTETS[$i]}
  HOSTNAME="server-$OCTET"
  IMG="$IMG_DIR/vm-$OCTET.qcow2"
  SEED="$IMG_DIR/seed-$OCTET.iso"
  USER_DATA="user-data-$OCTET.yaml"
  NETWORK_DATA="network-data-$OCTET.yaml"

  qemu-img create -f qcow2 -F qcow2 -b "$IMG_DIR/$BASE_IMG" "$IMG" ${DISK_SIZE}G

  cat <<EOF > "$USER_DATA"
#cloud-config
hostname: $HOSTNAME

package_update: true
package_upgrade: true

users:
  - name: ubuntu
    shell: /bin/bash
    groups: [users, sudo]
    sudo: "ALL=(ALL) NOPASSWD:ALL"
    lock_passwd: false
    passwd: 123456789
    ssh_import_id:
      - gh:$GITHUB_USER

packages:
  - apt-transport-https
  - xorg
  - xterm
  - openbox
  - chromium-browser
  - spice-vdagent

runcmd:
  - mkdir -p /home/ubuntu/.config/openbox
  - wget https://raw.githubusercontent.com/Mikachu/openbox/refs/heads/master/data/rc.xml -P /home/ubuntu/.config/openbox
  - sed -i '/<\/keyboard>/i \   <keybind key="C-A-t">\n     <action name="Execute">\n       <command>xterm</command>\n     </action>\n   </keybind>' /home/ubuntu/.config/openbox/rc.xml
  - sed -i '/<\/keyboard>/i \   <keybind key="C-A-b">\n     <action name="Execute">\n       <command>chromium</command>\n     </action>\n   </keybind>' /home/ubuntu/.config/openbox/rc.xml

  - sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev liblzma-dev
  - cd /tmp/
  - wget https://www.python.org/ftp/python/3.13.7/Python-3.13.7.tgz
  - tar xzf Python-3.13.7.tgz
  - cd Python-3.13.7
  - sudo ./configure --enable-optimizations
  - sudo make -j\$(nproc)
  - sudo make altinstall
  - sudo ln -s /usr/local/bin/python3.13 /usr/local/bin/python
  - sudo ln -s /usr/local/bin/pip3.13 /usr/local/bin/pip

  - echo 'if [[ -z \$DISPLAY ]] && [[ \$(tty) = /dev/tty1 ]]; then exec startx; fi' | sudo tee -a /home/ubuntu/.profile
  - echo "alias displays='ps e | grep -Po " DISPLAY=[\\.0-9A-Za-z:]* " | sort -u'" >> /home/ubuntu/.bashrc
  - sudo groupadd -g 3001 docker
  - sudo usermod -aG docker ubuntu
  - curl -fsSL https://get.docker.com -o get-docker.sh
  - sudo sh get-docker.sh
  - sudo reboot
EOF

  cat <<EOF > "$NETWORK_DATA"
#cloud-config
network:
  version: 2
  ethernets:
    interface0:
      match:
        name: "en*s0"
      dhcp4: false
      addresses: [$SUBNET.$OCTET/24]
      routes:
        - to: default
          via: $GATEWAY
      nameservers:
        addresses: [1.1.1.1]
EOF

  echo "$(cat $USER_DATA)"
  echo "$(cat $NETWORK_DATA)"

  cloud-localds --network-config "$NETWORK_DATA" "$SEED" "$USER_DATA"

  rm "$USER_DATA"
  rm "$NETWORK_DATA"

  virt-install \
    --name "$HOSTNAME" \
    --memory $(( $MEMORY * 1024 )) \
    --vcpus $CPUS \
    --disk path="$IMG",bus=virtio,format=qcow2 \
    --disk path="$SEED",bus=virtio,format=raw \
    --network bridge=br0,model=virtio \
    --os-variant ubuntu24.04 \
    --graphics spice,listen=0.0.0.0 \
    --channel spicevmc \
    --video virtio \
    --import \
    --noautoconsole

  echo "Launched VM $((i + 1)): $HOSTNAME with IP $SUBNET.$OCTET (disk size: ${DISK_SIZE}GB)"
done

echo "All $NUM_VMS VMs launched. Use 'virsh list --all' to see VMs, 'virsh start/stop/destroy <name>', 'virsh console <name>' for access. Clean up images/ISOs when done."
```

If you want to use another version of Python, you can find [here](https://www.build-python-from-source.com/) and update the area into the `runcmd` that install the python

When the machine start you need to wait the cloud-init to configure everything, you can see the logs with `sudo tail -f /var/log/cloud-init-output.log`

Thanks for read until there :)
