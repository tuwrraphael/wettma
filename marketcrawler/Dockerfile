FROM denoland/deno:latest
COPY ./marketcrawler.ts /app/marketcrawler.ts
ENTRYPOINT ["deno", "run", "--allow-net", "--allow-env", "/app/marketcrawler.ts"]