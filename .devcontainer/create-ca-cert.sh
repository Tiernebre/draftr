#!/bin/sh

mkcert -install
mkcert -cert-file .devcontainer/certs/draftr.localhost.pem -key-file .devcontainer/certs/draftr.localhost-key.pem draftr.localhost
