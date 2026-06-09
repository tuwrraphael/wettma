#!/bin/sh
set -e
NETWORK="wettma-net"

# create network if missing
docker network inspect "$NETWORK" >/dev/null 2>&1 || docker network create "$NETWORK"

docker container stop oddscrawler || true
docker container rm oddscrawler || true

docker build --progress=plain --file Dockerfile -t oddscrawler . \
&& docker run \
        -p 8000:8000 \
        --name oddscrawler \
        --network "$NETWORK" \
        -e WETTMA_URL='http://wettma:8080' \
        -d --restart always oddscrawler

echo "Started oddscrawler on network $NETWORK (WETTMA_URL=http://wettma:8080)"