#!/bin/sh

mkcert -install
mkcert -cert-file .devcontainer/cert/draftr.localhost.pem -key-file .devcontainer/cert/draftr.localhost-key.pem draftr.localhost
