FROM node:18-alpine AS build
WORKDIR /repo
RUN wget -O- https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY pnpm-lock.yaml ./
COPY packages/tsconfig packages/tsconfig
RUN pnpm fetch -D

COPY package.json ./
RUN pnpm i --offline -D


COPY docs docs
RUN pnpm docs:build

FROM nginx:alpine
COPY --from=build /repo/docs/.vitepress/dist /usr/share/nginx/html