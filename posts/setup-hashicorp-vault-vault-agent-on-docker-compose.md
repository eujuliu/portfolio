---
slug: setup-hashicorp-vault-vault-agent-on-docker-compose
title: Setup Hashicorp Vault + Vault Agent on Docker Compose
description: Here you will learn my configuration for a full docker compose hashicorp vault configuration
image: ""
tags:
  - hashicorp
  - security
  - systemdesign
  - softwaredevelopment

publishedAt: 2025-11-19T04:34:51.706Z
---

## Files

First create a directory for put the config files, i will put in `/opt/vault`

Create the `docker-compose.yml`

```yml
services:
  init_vault:
    image: alpine:latest
    container_name: init_vault
    group_add:
      - 3001
    volumes:
      - vault-data:/vault/data:rw
      - certs:/tmp/certs/:rw
      - secrets:/secrets:rw
    command: >
      /bin/sh -c "apk add --no-cache openssl && \
      openssl req -x509 -newkey rsa:4096 -sha256 -days 365 \
      -nodes -keyout /tmp/certs/vault-key.pem -out /tmp/certs/vault-cert.pem \
      -subj '/CN=vault' \
      -addext 'subjectAltName=DNS:vault,IP:127.0.0.1' && \
      chown -R 100:3001 /vault/ /tmp/certs /secrets && \
      chmod -R 0750 /secrets/ && \
      exit 0"

  vault:
    image: "hashicorp/vault:latest"
    restart: unless-stopped
    container_name: vault
    ports:
      - "8201:8201"
      - "8200:8200"
    privileged: true
    depends_on:
      init_vault:
        condition: service_completed_successfully
    environment:
      VAULT_ADDR: "https://vault:8200"
      VAULT_CACERT: "/vault/certs/vault-cert.pem"
      VAULT_SKIP_VERIFY: true
    cap_add:
      - IPC_LOCK
    volumes:
      - vault-data:/vault/data:rw
      - ./agent-policies.hcl:/policies/agent-policies.hcl
      - ./vault-config.hcl:/vault/config/vault-config.hcl:ro
      - certs:/vault/certs:ro
    healthcheck:
      test:
        [
          "CMD-SHELL",
          'vault status -format=json 2>/dev/null | grep -q ''"sealed": false''',
        ]
      interval: 10s
      timeout: 5s
      retries: 1000
      start_period: 20s
    command: vault server -config=/vault/config/vault-config.hcl -log-level="info"

    # run docker exec vault vault status
    # then
    # run docker exec vault vault operator init -key-shares=3 -key-threshold=2

  vault-agent:
    image: "hashicorp/vault:latest"
    restart: unless-stopped
    container_name: vault-agent
    depends_on:
      vault:
        condition: service_healthy
    environment:
      VAULT_ADDR: "https://vault:8200"
      VAULT_CACERT: "/vault/certs/vault-cert.pem"
      VAULT_SKIP_VERIFY: true
    cap_add:
      - IPC_LOCK
    volumes:
      - certs:/vault/certs:ro
      - secrets:/secrets:rw
      - ./role-id.txt:/role-id:ro
      - ./secret-id.txt:/secret-id:ro
      - ./agent-config.hcl:/vault/config/agent-config.hcl:rw
      - ./templates:/templates:ro
    command: vault agent -config=/vault/config/agent-config.hcl -log-level="info"

volumes:
  certs:
  vault-data:
  secrets:
    driver: local
    driver_opts:
      type: none
      device: /path/to/mount/secrets/in/host
      o: bind

networks:
  default:
    name: network
    driver: bridge
```

The `role-id.txt` and the `secret-id.txt` will be created after, and you need to specify the device into the secrets volume.

The group_add 3001, is for my docker group, i use this gid for docker, if you don't do that, you can't access the envs files, when they are created.

Create the `vault-config.hcl`

```hcl
api_addr                = "https://vault:8200"
cluster_addr            = "https://vault:8201"
cluster_name            = "vault_cluster"
disable_mlock           = true
ui                      = true

max_lease_ttl       = "2h"
default_lease_ttl   = "20m"

raw_storage_endpoint = "true"
disable_printable_check = "true"

listener "tcp" {
  address       = "0.0.0.0:8200"
  tls_cert_file = "/vault/certs/vault-cert.pem"
  tls_key_file  = "/vault/certs/vault-key.pem"
}

backend "raft" {
  path    = "/vault/data"
  node_id = "vault_1"
}
```

the `agent-config.hcl` that will have all the vault agent configurations

```hcl
auto_auth {
  method {
    type = "approle"
    config = {
      role_id_file_path = "/role-id",
      secret_id_file_path = "/secret-id",
      remove_secret_id_file_after_reading = false
    }
  }

  sink {
    type = "file",
    config = {
      path = "/tmp/token"
    }
  }
}

template_config {
  static_secret_render_interval = "1m"
  exit_on_retry_failure         = true
  max_connections_per_host      = 10
}

vault {
  address = "https://vault:8200"
  ca_cert = "/vault/certs/vault-cert.pem"
  tls_server_name = "vault"
  tls_skip_verify = true
}

template {
  source = "/path/to/source"
  destination = "path/to/destination"
  perms = "0750"
  error_on_missing_key = true
}
```

The last one is the `agent-policies.hcl`

```hcl
path "kv/*" {
  capabilities = ["read"]
}
```

You can see [here](https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2/setup) how to create your policies file

I recommend you to set the owner with `chown` for enable vault to read/write the files inside the container.

```sh
sudo chown -R 100:100 /path/to/vault/files
```

## Running

Now you need to run the command for build the services `docker compose up -d`

After the vault container started, we need to exec some commands for init, unseal, enable the approle, and create the kv secrets that we need.

### Init

For initialize the operator you need to run

```sh
docker exec vault vault operator init -key-shares=<number> -key-threshold=<number>
```

- key-shares is the quantity of unseal key that will be generated
- key-threshold is how many keys you need to use for unseal the vault (every time that you restart will be necessary to unseal)

==Store this keys into a secure place, without it, you can't unseal the vault==

For unseal the vault you need to run this command with one of the unseal keys n times.

```sh
docker exec vault vault operator unseal <key>
```

You will receive the Root Token too, this is necessary for login into the vault and make the changes.

After init the operator you need to login with your root token

```sh
docker exec vault vault login <token>
```

### kv

The first thing that we need to do is to create our first secrets, then enable kv with

```sh
docker exec vault vault secrets enable -path=<path/to/secrets> kv-v2
```

You can create one for each service that you have, our a single for all the services.

For example, you can create with the name `web-app`, `backend`, or `envs` and put every service as a file inside the `envs`, you choose what is better for you.

I recommend you to add a prefix in all yours kv, like use `kv/your-path` this will facilitate the policies creation after.

After create the kv, now you need to add your secrets to it, you can use the UI or run this command

```sh
docker exec vault vault kv put -mount=path/to/secrets <name> key1=value1 key2=value2
```

If you want, I have a script for convert `.env` into a command for create all the secrets into the kv [here](https://gist.github.com/eujuliu/0aa34b207b7ab9979e93dd0c90bca475)

### approle

This will be necessary to enable your vault agent to login into your vault.

For this, you need to write the policy that we created before (change `my-policy`)

```sh
docker exec vault vault policy write my-policy /policies/agent-policies.hcl
```

Then enable the approle auth method

```sh
docker exec vault vault auth enable approle
```

Then create the role for your agent to use, you can put any name to the role (change `my-role`)

```sh
docker exec vault vault write auth/approle/role/my-role \
    token_type=batch \
    token_ttl=20m \
    token_max_ttl=2h \
    token_policies="my-policy"
```

With this command you will save the role id inside a file to be used by the agent (remember to change the path to your vault files)

```sh
docker exec vault vault read -field=role_id auth/approle/role/agent/role-id > /opt/vault/role-id.txt
```

Other thing that we need is the secret id (remember to change the path to your vault files)

```sh
docker exec vault vault write -field=secret_id -f auth/approle/role/agent/secret-id > /opt/vault/secret-id.txt
```

## Agent Template

Now, if you want to convert your secrets in a `.env` for example, you need to create a template with Consul Template markup.

You can learn more about [here](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent/template)

With your templates created, add then to a folder and make the docker compose mount the templates inside the vault agent, they use `.ctmpl` and look like that

```ctmpl
{{ with secret "kv/data/envs" -}}
KEY={{ .Data.data.KEY }}
{{- end }}
```

After do this, you need to recreate the vault-agent service into the docker.

And with this, now our `.env` will be generated inside a folder and we can access with the docker, if you mount the `/secrets` volume in /secrets, then you can access it on the host machine in the `/secrets`

Maybe you need to change the permissions for read the file, you need to test if your user that runs the docker can access the `.env`, with `cat /path/to/env`.

When i make this tutorial I have some problems in the UI, like the secrets are not showing, for this i created a new token and apply the default policies (remember to edit the policies and add the `kv/*`), should have this lines

```hcl
path "kv/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
```

And you can generate a new token with this command

```sh
docker exec vault vault token create -policy=default -ttl=2h
```
