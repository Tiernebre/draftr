#!/bin/sh

if [ -n "$CI" ]; then
    return 0
    exit 0
fi

echo "Initializing dev container. Be aware you WILL need to provide sudo access in order for HTTPS to work correctly!"

# insert/update hosts entry
ip_address="0.0.0.0"
host_name="draftr.localhost"
# find existing instances in the host file and save the line numbers
matches_in_hosts="$(grep -n $host_name /etc/hosts | cut -f1 -d:)"
host_entry="${ip_address} ${host_name}"

if [ -z "$matches_in_hosts" ]
then
    echo "Adding new hosts entry."
    echo "$host_entry" | sudo tee -a /etc/hosts > /dev/null
fi

mkcert -install
mkcert -cert-file .devcontainer/certs/draftr.localhost.pem -key-file .devcontainer/certs/draftr.localhost-key.pem draftr.localhost
