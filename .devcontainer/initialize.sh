#!/bin/sh

echo "Initializing dev container. Be aware you WILL need to provide sudo access in order for HTTPS to work correctly!"
mkcert -install
mkcert -cert-file .devcontainer/certs/draftr.localhost.pem -key-file .devcontainer/certs/draftr.localhost-key.pem draftr.localhost
