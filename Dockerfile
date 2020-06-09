FROM hayd/alpine-deno:1.0.5

EXPOSE 8080

WORKDIR /app

USER deno

COPY . .
RUN deno cache --unstable server.ts

CMD ["run","--allow-net","--unstable","--allow-write","--allow-read","--allow-plugin","--allow-env", "server.ts"]