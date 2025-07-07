---
slug: beginners-guide-to-setting-up-a-secure-server
title: Beginner’s Guide to Setting Up a Secure Server
description: This guide is a beginner-friendly server setup tutorial for anyone who wants to host a server on their local machine—whether it’s for a website, an API, or both.
image: "/images/posts/beginners-guide-to-setting-up-a-secure-server.png"
tags:
  - server
  - beginner
  - ubuntu
  - tutorial
  - linux
  - nginx
  - fail2ban

publishedAt: 2025-07-04T04:34:51.706Z
---

This guide is a beginner-friendly server setup tutorial for anyone who wants to host a server on their local machine—whether it’s for a website, an API, or both.

In this guide, I’ll teach you about SSH, firewalls, security best practices, and how to expose your server to external network connections. If you enjoy this article, I’d appreciate your feedback. And if you find any mistakes or have suggestions for better approaches, feel free to help me improve this guide.

## What you'll need for this tutorial

1. A server (local machine, VPS, cloud instance, etc.)
2. Some time and patience

The first step when setting up your server is finding a way to connect to it and make necessary changes. For that, we’ll use **SSH (Secure Shell)**.

## SSH

**SSH**, or **Secure Shell**, is a network protocol that allows us to create secure connections between two devices over an unsecured network. But SSH isn’t just for remote access—we can also use it to securely transfer files using tools like `scp` or `sftp`.

[For more details, check out Cloudflare’s explanation of SSH.](https://www.cloudflare.com/learning/access-management/what-is-ssh/)

### Enabling SSH on the Server

The first step to using SSH is to install and enable it on your server.
In my case, I’m using **Ubuntu**, which is a **Debian-based distribution**, so installing SSH is simple.

Install the OpenSSH Server

```bash
sudo apt update
sudo apt install openssh-server
```

Enable and Start the SSH service

```bash
sudo systemctl enable --now ssh
```

Verify if the service is running

```bash
sudo systemctl status ssh
```

### Enabling SSH on the Client

An **SSH client** is required on your local machine to connect to the server.

- **Linux**: Most distributions already include the OpenSSH client. If not, you can install it using your package manager.
- **Windows**:
  Windows 10 and later include a built-in OpenSSH client.
  Steps to enable it:
  1.  Go to **Settings > Apps > Optional Features**
  2.  Search for “**OpenSSH Client**” and install it (if it’s not already installed)
  3.  After installation, you can use the `ssh` command from **Command Prompt** or **PowerShell**.
- **macOS**:
  The OpenSSH client comes pre-installed. Just use the `ssh` command in the **Terminal**.

#### Connecting to your Server

To connect to your server, use the following command:

```bash
ssh <username>@<server-ip>
```

Replace `<username>` with your server’s user account (e.g., `admin`), and `<server-ip>` with the server’s IP address (e.g., `192.168.1.100`).
You’ll be prompted to enter the user’s password.

If you don’t know the server’s IP address, run the following command on your server:

```bash
ip a
```

You’ll see output like this:

```bash
inet 192.168.1.16/24
```

In this case, the server IP is `192.168.1.16`.

### Basic SSH Configuration for Enhanced Security

The default SSH configuration may leave your server vulnerable to attacks.
Securing the `/etc/ssh/sshd_config` file is an essential step.

**Backup First**:

Before making changes, create a backup of the original SSH configuration file:

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

This allows you to restore the original configuration if something goes wrong.

#### SSH Key Authentication (Safer than Passwords)

The first step to securing SSH is enabling **SSH key authentication**.

Before enabling it, let’s generate an SSH key on your local machine.

##### Generate a Key Pair on Your Local Machine

```bash
ssh-keygen -t ed25519
```

Or, for compatibility with older systems:

```bash
ssh-keygen -t rsa -b 4096
```

**Tip:**

- **Ed25519** is modern and secure.
- **RSA (4096 bits)** is widely supported but slower.
- If needed, **RSA 2048** is a middle-ground option.

During key generation, you’ll be asked to create a **passphrase**.
It’s highly recommended to use one! Tools like **Bitwarden** can help generate strong passphrases.

> [!WARN] Important
> A **passphrase** is different from a **password**.
> If you’re not familiar with the difference, take a moment to research it.

And you need to add your ssh key to the ssh-agent

```bash
eval "$(ssh-agent -s)"
> Agent pid 595666 # Response
```

After that, you need to specify your ssh passing the path

```bash
ssh-add ~/.ssh/id_ed25519
```

##### Copy the Public Key to the Server

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub <username>@<server-ip>
```

For more information about SSH key generation, check out these resources:

- [SSH Academy](https://www.ssh.com/academy/ssh/keygen)
- [DigitalOcean SSH Key Tutorial](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)
- [Github SSH configuration](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux)

#### SSH Server Security Configuration

Now, let’s edit the SSH configuration file:

```bash
sudo nano /etc/ssh/sshd_config
```

##### Recommended Secure SSH Settings:

```bash
Port 35464                            # Change the default port (choose a number between 1024 and 65535)
PermitRootLogin no                    # Disable root login
PasswordAuthentication no             # Disable password authentication
PubkeyAuthentication yes              # Enable public key authentication
AuthorizedKeysFile .ssh/authorized_keys # Specify the authorized keys file
AllowUsers newuser                    # Allow only specific users to connect
LogLevel INFO                         # Enable useful logging
```

**Why These Settings?**

1. **Custom SSH Port:**
   Avoid port 22 (default SSH port). Hackers commonly target it.
   Also, don’t use obvious alternatives like 2222 or 3022.
   [See more](https://security.stackexchange.com/questions/32308/should-i-change-the-default-ssh-port-on-linux-servers)
2. **Disable Password Authentication:**
   Prevents brute-force password attacks.
3. **Disable Root Login:**
   Logging in directly as root is risky. A compromised root account can destroy your system.

##### Extra Security Settings (Optional but Recommended)

```bash
Protocol 2                 # Use only SSH protocol version 2
MaxAuthTries 3             # Limit authentication attempts
ClientAliveInterval 300    # Client alive interval in seconds
ClientAliveCountMax 2      # Maximum client alive count
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com # Ciphers faster to slower
```

For more advanced SSH hardening tips:

- [Linux Haxor: SSHD Config Guide](https://linuxhaxor.net/code/sshd-config-file-complete-guide-for-linux.html)
- [Brandon Rohrer’s SSH at Home](https://www.brandonrohrer.com/ssh_at_home)

#### Test and Apply Your Changes

Before restarting SSH, **test the configuration** for syntax errors:

```bash
sudo sshd -T -f /etc/ssh/sshd_config
```

If there are no errors, restart the SSH service:

```bash
sudo systemctl restart ssh
```

Now, for connect to your server you'll need to pass the port (if you change the port)

```bash
ssh -p PORT <username>@<server-ip>
```

## Configuring a Static IP on Ubuntu Server

A **static IP** ensures that your server always has the same network address. This is crucial for SSH access and for exposing your server to the internet or local network.

### Edit the Netplan Configuration

On **Ubuntu** (with Netplan), modify the following file:

```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

Example configuration:

```yaml
network:
  version: 2
  ethernets:
	enp0s3:
	  dhcp4: no
	  addresses: [192.168.1.100/24]
	  routes:
		- to: default
		  via: 192.168.1.1
	  nameservers:
		addresses: [8.8.8.8, 8.8.4.4]
```

**Notes:**

- Replace `enp0s3` with your actual network interface name (you can check it using `ip a`).
- Adjust the IP address, gateway, and DNS servers to match your network setup.

### Apply the Changes

After editing, apply the new configuration:

```bash
sudo netplan try
```

### Verify Your Static IP

Check if your server is now using the static IP:

```bash
ip addr show
```

You should see your new IP address listed under the correct network interface.

## Automatic Package Updates

Keeping your server updated is critical for security.
Ubuntu provides a tool called **`unattended-upgrades`**, which automatically installs security updates and bug fixes.

The first thing is install the package

```bash
sudo apt install unattended-upgrades
```

Edit the configuration file:

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Example configuration:

```plaintext
Unattended-Upgrade::Allowed-Origins {
	"Ubuntu:${distro_codename}-security";
	"Ubuntu:${distro_codename}-updates";
};
```

**Explanation:**

- This enables both **security** and **regular update** packages.

To activate automatic updates, run:

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

This will enable the unattended upgrades service.

## Setting Up a Firewall with UFW

A **firewall** is a critical part of server security. It helps **filter inbound and outbound traffic** and **monitors network connections**, reducing the risk of unauthorized access.

On **Ubuntu**, we have **UFW (Uncomplicated Firewall)**—a simple but effective tool for managing firewall rules on a basic server.

To enable the firewall:

```bash
sudo ufw enable
```

For verify the status you need to run

```bash
sudo ufw status
```

Before enabling the firewall, it’s important to **allow SSH connections**, or you could lock yourself out.

If you’ve changed the SSH port, replace `ssh` with your custom port.

```bash
sudo ufw enable ssh
```

Or, for a custom port (example, port 35464):

```bash
sudo ufw allow 35464/tcp
```

If you want to allow access to other services (like HTTP, HTTPS, etc.), you can find the correct port numbers in the `/etc/services` file.

**Tip:**
**Only allow the ports you actually need for your server to operate.**

You can list all active firewall rules with:

```bash
sudo ufw status verbose
```

To log firewall activity (helpful for monitoring suspicious traffic):

```bash
sudo ufw logging medium
```

Logging levels can be: `low`, `medium`, `high`, or `full`.

For more detailed information on UFW and firewalls:

- [DigitalOcean: How To Set Up a Firewall with UFW on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu)
- [Official Ubuntu Firewall Guide](https://documentation.ubuntu.com/server/how-to/security/firewalls/)

## Configuring Fail2Ban for Intrusion Prevention

**Fail2Ban** helps protect your server from brute-force attacks by **monitoring log files** and **banning IP addresses** after repeated failed login attempts (for example, too many failed SSH logins).

If your Linux distribution is **Debian-based (like Ubuntu)**, installation is simple:

```bash
sudo apt install fail2ban
```

First, create a local configuration file by copying the default settings:

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

This ensures that your changes won’t be overwritten during updates.

Now, edit the new configuration file:

```bash
sudo nano /etc/fail2ban/jail.local
```

Below are some important configuration options to set:

```bash
destemail = your-email@example.com         # The email address where you’ll receive ban notifications
action = %(action_mwl)s                    # Sends an email with logs and bans the IP (mwl = message with logs)

[sshd]
enabled = true                             # Enable protection for SSH
port    = ssh                              # Set the port for the ssh
```

You can adjust settings like:

- **maxretry**: Number of failed attempts before banning
- **bantime**: Duration (in seconds) an IP remains banned
- **findtime**: Time window to count failed attempts

These settings are already well-commented inside the config file for guidance.

After making your changes, restart Fail2Ban:

```bash
sudo systemctl restart fail2ban
```

And verify the status with

```bash
sudo systemctl status fail2ban
```

Fail2Ban now actively monitors your server for suspicious login attempts.

## Disabling IPv6 (Optional)

**IPv6** is a newer and more efficient protocol compared to IPv4, offering a much larger address space.

However, not all networks and services fully support IPv6 yet, and if you’re not using it, **disabling it can reduce your server’s attack surface**.

Some attacks specifically target unused IPv6 stacks on servers.

To disable IPv6 system-wide, edit the **`/etc/sysctl.conf`** file:

```bash
sudo nano /etc/sysctl.conf
```

Add the following lines at the end of the file:

```plaintext
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

Apply the changes.

```bash
sudo sysctl -p
```

Then, reboot the server to fully disable IPv6:

```bash
sudo reboot
```

After reboot, check by running:

```bash
ping6 google.com
```

If IPv6 is successfully disabled, you should see an error like:

```vbnet
connect: Network is unreachable
```

For more info:

- [AWS: IPv4 vs IPv6 Comparison](https://aws.amazon.com/compare/the-difference-between-ipv4-and-ipv6/)

## Running Applications Securely with Least Privilege

The **Principle of Least Privilege (PoLP)** ensures that each user or process has **only the permissions necessary to perform their tasks**—nothing more.
This minimizes potential damage if an account or process is ever compromised.

By **isolating applications** with dedicated system users, you can **limit the impact of a breach** and **monitor resource usage per user** to help identify unusual activity.

To run an application as a non-login system user (without shell access), use:

```bash
sudo useradd -rms /usr/sbin/nologin -c "Runs MyApp Service" myappuser
```

**Explanation of the flags:**

- `-r` → Creates a system user
- `-m` → Creates a home directory (optional for some apps)
- `-s /usr/sbin/nologin` → Prevents interactive login
- `-c` → Adds a description for the user

### Organize Applications Under `/opt`

For this guide, we’ll place all custom applications in the `/opt` directory.

> **Why `/opt`?**
> In Linux, `/opt` stands for "**optional**" and is intended for **optional or third-party software** that’s **not part of the core operating system**.

Whenever you install a new app inside `/opt`, set the ownership so that **only the specific user can access it:**

```bash
sudo chown -R myappuser:myappuser /opt/myapp
```

This ensures that the application **only runs with the permissions of its dedicated user**, adding another layer of security.

## Running Multiple Applications

To keep your applications running in the background without blocking your server’s workflow, you need a **process manager**. There are several options:

- **Supervisor**: A popular and easy-to-configure process manager for general use.
- **PM2**: Designed for Node.js applications, with features like clustering and monitoring.

For this tutorial, I will use **`systemd`**, the default process manager on most Linux distributions. It’s **robust, simple to configure**, and widely available.

Create a service file in `/etc/systemd/system/`, for example:

```bash
sudo nano /etc/systemd/system/helloworld.service
```

Add the following content (modify as needed):

```bash
[Unit]
Description=A Hello World Node.js Application     # Description of your app
After=network.target

[Service]
Type=simple
User=helloworld                                  # User to run the app
Group=helloworld                                 # Group (usually same as user)
WorkingDirectory=/opt/helloworld                 # App directory
ExecStart=/usr/bin/node /opt/helloworld/app.js  # Command to start the app
Restart=on-failure                               # Restart on crash

[Install]
WantedBy=multi-user.target
```

Reload systemd to recognize the new service:

```bash
sudo systemctl daemon-reload
```

Enable the service to start at boot:

```bash
sudo systemctl enable helloworld.service
```

Start the service immediately:

```bash
sudo systemctl start helloworld.service
```

To follow the application logs in real-time:

```bash
sudo journalctl -u helloworld -f
```

(The `-f` flag means "follow" and displays new log entries as they appear.)

For more details, see [Understanding systemd Units and Unit Files](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files).

## Exposing Web Applications with Nginx

When you want to expose a web application to the internet, you need a **web server**, and **Nginx** is an excellent choice.

Nginx is a **robust, versatile web server** that can be used as:

- An HTTP web server
- A reverse proxy
- A content cache
- A load balancer
- A TCP/UDP proxy server
- A mail proxy server

One great feature is that you can **configure multiple domains** on a single server. For example:

- Serve an API on `api.example.com`
- Serve a static site on `example2.com`
- Or host multiple applications on one domain using reverse proxying

[Learn more about Nginx in this detailed Medium post](https://medium.com/@ksaquib/nginx-zero-to-hero-your-ultimate-guide-from-beginner-to-advanced-mastery-57e2dad6a77a).

### Installing Nginx

To install Nginx on Ubuntu:

```bash
sudo apt install nginx
```

Check if Nginx is running:

```bash
sudo systemctl status nginx
```

You can also test by opening your server IP in a browser or running:

```bash
curl <server-ip>
```

### Allow HTTP and HTTPS Through the Firewall

If you can’t access the server, allow ports 80 (HTTP) and 443 (HTTPS) through your firewall:

```bash
sudo ufw allow http
sudo ufw allow https
```

If successful, you should see the Nginx welcome page like this:

![[Pasted image 20250701154721.png]]

### Nginx Configuration Files: `sites-available` vs `conf.d`

You have two options to add your configurations:

1. **`/etc/nginx/sites-available/` + symlink to `/etc/nginx/sites-enabled/`**
   - This is common on Debian-based distros.
   - Only configurations linked in `sites-enabled` are active.
   - Be careful with symlink creation to avoid errors.
2. **`/etc/nginx/conf.d/`**
   - Simply drop your `.conf` files here.
   - Files here are automatically loaded when Nginx restarts.

For simplicity, this guide uses the second method.

### Basic Nginx Configuration Template

Create a file, for example `/etc/nginx/conf.d/your-domain.conf`, with:

```nginx
server {
    listen 80;
    server_name your-domain.com;   # Use _ for all domains, or specify IP/multiple domains

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Logging
    access_log /var/log/nginx/your-domain.access.log;
    error_log /var/log/nginx/your-domain.error.log warn;

    location / {
        # Place your static files config or reverse proxy here
    }
}
```

**Tip:** Create one config file per domain for clarity.

#### Reverse Proxy Example

To proxy requests to another service running on your server (e.g., on port 3000), add inside the `location` block:

```nginx
location /api {  # Access via http://your-domain.com/api
    proxy_pass http://localhost:3000;  # Change port to your app’s port
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Test and Restart Nginx

Always test your configuration before restarting:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx:

```bash
sudo systemctl restart nginx
```

Now, if you access your server’s IP or domain with the configured path, you should be able to reach your web application.

Keep in mind this does not automatically expose your app to the internet—firewall rules, DNS setup, and proper SSL certificates are also needed.

## Exposing Applications to the Internet

When you create an application and want it accessible on the internet, most users prefer to use a **domain name** instead of an IP address. Depending on where your server is hosted, the process for setting this up can vary.

### Hosting on a VPS

If you’re using a **VPS (Virtual Private Server)**, the main thing you need to do is:

- Choose your domain name.
- Point an **A record** in your domain’s DNS settings to your server’s **static IP address.**

Most VPS providers offer a static IP by default, so this is usually a straightforward, “set and forget” process.

### Hosting from Home

Hosting a server at home is more challenging because of dynamic IPs and router configurations. There are two main approaches:

1. **Port Forwarding with Static IP**
   - Set up **port forwarding** on your router to allow external access to ports 80 (HTTP) and 443 (HTTPS).
   - You need a **static public IP address**; most home ISPs provide dynamic IPs by default.
   - You may need to contact your ISP and possibly pay for a static IP service.
2. **Using Dynamic DNS (DDNS)**
   - Dynamic DNS services automatically update your domain’s DNS records whenever your IP changes.
   - You can either use a public DDNS provider or run your own.
   - Here is a [list of popular DDNS providers and projects](https://dynamic.domains/dynamic-dns/providers-list/default.aspx).

### Using Tunnels to Expose Your Server

If port forwarding or static IPs are not an option or too complex, **tunneling tools** offer a simple alternative. These tools create a secure tunnel from your local machine to the internet, making your local server accessible remotely.

Popular tunneling tools include:

- [Ngrok](https://dashboard.ngrok.com/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/)
- [LocalTunnel](https://github.com/localtunnel/localtunnel)

Each has its own advantages and pricing models. From what I found, **Cloudflare Tunnel** is well-suited for production environments, but you should explore and choose the best fit for your needs and budget.

With tunnels is not necessary to open allow http and https ports on firewall.

#### Using Ngrok (Example)

Ngrok is simple and great for testing or development.

1. Create an account at [ngrok.com](https://dashboard.ngrok.com/).
2. Run the following command to expose your local port 80 to the internet:

```bash
ngrok http 80
```

Ngrok will provide a publicly accessible URL along with metrics like the number of connected users.

## Enabling HTTPS with SSL Certificates (recommended)

It’s highly recommended to secure your site with HTTPS.

And for that you will need to add the following SSL configuration (after you obtain certificates) into your nginx config file:

```bash
# SSL configuration
listen 443 ssl http2;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:\
ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:\
ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:\
DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# Certbot will add its own SSL certificate paths
ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```

You can obtain free SSL certificates using [Certbot](https://certbot.eff.org/).

##### Redirect HTTP to HTTPS

After enabling HTTPS, it’s best to redirect all HTTP traffic to HTTPS. You can create a separate config like this:

```nginx
# redirect all ports 80 requests
server {
	listen 80 default_server;

	server_name _;
	return 301 https://$host$request_uri;
}

# OR redirect only specific apps
server {
	listen 80;

	server_name foo.com;
	return 301 https://foo.com$request_uri;
}
```

## How to protect against DDoS attacks (recommended)

Another important recommendation is to **configure rate limiting in Nginx**.
This helps **reduce the impact of DDoS attacks** and **slow down brute-force attempts.**

Rate limiting controls the number of requests allowed from each client (IP address) over a given time.
You can customize this limit based on your server’s capacity and the expected traffic.

### Step 1: Define the Rate Limit Zone (In `nginx.conf`)

Open the main Nginx configuration file:

```bash
sudo nano /etc/nginx/nginx.conf
```

Inside the `http` block, add this line:

```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
```

**What this does:**

- **`$binary_remote_addr`** → Uses the client’s IP address as the key (stored in binary for space efficiency).
- **`zone=mylimit:10m`** → Creates a shared memory zone called `mylimit` with **10MB of space**, capable of tracking ~160,000 unique IP addresses.
- **`rate=10r/s`** → Allows **10 requests per second per IP address**.

### Step 2: Apply the Limit in Location Blocks

In any `location` block you want to protect (e.g., `/api`, `/login`, etc.), add:

```nginx
limit_req zone=mylimit burst=20 nodelay;
limit_req_status 429;
```

**Explanation:**

- **`zone=mylimit`** → Applies the limit using the defined zone.
- **`burst=20`** → Allows a burst of up to **20 extra requests** (temporarily exceeding the rate limit).
- **`nodelay`** → Processes the burst requests **immediately without delay** (otherwise, excess requests would be queued and delayed).
- **`limit_req_status 429`** → Returns HTTP status **429 (Too Many Requests)** when the limit is exceeded.

Example Usage Inside a Location Block:

```nginx
location /api {
    limit_req zone=mylimit burst=20 nodelay;
    limit_req_status 429;

    proxy_pass http://localhost:3000;
    # Your other proxy settings...
}
```

Apply this block to **every route** you want to protect.

### Step 3: Reload Nginx

After making changes, always test the config:

```bash
sudo nginx -t
```

```bash
sudo systemctl reload nginx
```

### Additional Learning Resources

For more details on Nginx rate limiting:

- [Nginx Blog: Rate Limiting](https://blog.nginx.org/blog/rate-limiting-nginx)
- [Medium: Protecting Against Bot Attacks](https://irtizahafiz.medium.com/protecting-against-bot-attacks-using-nginx-rate-limits-12872fcbaafd)

## Conclusion

Setting up and securing your own server may seem challenging at first, but with the right steps, it becomes an achievable and rewarding process.

In this guide, you learned how to:

- Connect to your server using **SSH**
- Secure your server with **firewalls**, **Fail2Ban**, and **SSH hardening**
- Keep your system safe with **automatic updates**
- Follow the **Principle of Least Privilege (PoLP)**
- Run your applications in the background using **systemd**
- Expose your services to the internet with **Nginx** and **domain setup**
- Protect your server from attacks with **rate limiting**

Whether you’re self-hosting from home or running on a VPS, these steps help lay a **solid foundation for a secure, reliable server environment**.

Happy hosting!
