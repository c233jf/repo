FROM node:lts-bookworm-slim AS base
RUN apt-get update && apt-get install -y git
# 构建在某个时间开始突然失败，初步怀疑是 pnpm 版本问题，所以锁定版本
# https://github.com/pnpm/pnpm/issues/9744
RUN npm install -g pnpm@10.11.1

FROM base AS build
WORKDIR /repo

COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/tsconfig packages/tsconfig
RUN pnpm fetch

COPY package.json ./
RUN pnpm i --offline --frozen-lockfile

COPY docs docs
RUN pnpm docs:build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /repo/docs/.vitepress/dist /usr/share/nginx/html