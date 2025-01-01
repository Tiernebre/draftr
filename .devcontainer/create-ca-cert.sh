#!/bin/sh

mkcert -install
mkcert -cert-file .devcontainer/certs/draftr.localhost.cert -key-file .devcontainer/certs/draftr.localhost.key draftr.localhost
