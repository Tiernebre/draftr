FROM denoland/deno:bin AS deno
FROM amacneil/dbmate AS dbmate
FROM mcr.microsoft.com/devcontainers/base:ubuntu
COPY --from=deno /deno /usr/local/bin/deno
COPY --from=dbmate /usr/local/bin/dbmate /usr/local/bin/dbmate
