#!/bin/sh
set -e
NETWORK="wettma-net"

# create network if missing
docker network inspect "$NETWORK" >/dev/null 2>&1 || docker network create "$NETWORK"

docker container stop wettma || true
docker container rm wettma || true

docker build --progress=plain --file Dockerfile -t wettma .\
&& docker run \
        --user=$(id -u):$(id -g) \
        -v ./themnt/App_Data:/App/wwwroot/App_Data \
        -v ./themnt/appsettings.json:/App/appsettings.json \
        -p 8080:8080 \
        --name wettma \
        --network "$NETWORK" \
        -e ASPNETCORE_URLS=http://+:8080 \
        -d --restart always wettma