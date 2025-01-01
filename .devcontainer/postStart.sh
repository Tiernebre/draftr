#!/bin/sh

deno task migrate 

if [ -n "$CI" ]; then
    return 0
    exit 0
fi

deno task dev
