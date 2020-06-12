FROM hayd/alpine-deno:1.0.5
WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . ./

# Added to ENTRYPOINT of base image.
CMD ["run", "--allow-env","--allow-plugin", "--allow-net","--unstable","--allow-run","--allow-read","--allow-write", "main.ts"]
