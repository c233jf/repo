FROM node:18-alpine AS build
WORKDIR /repo
RUN apk add git
RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/tsconfig packages/tsconfig
RUN pnpm fetch

COPY package.json ./
RUN pnpm i --offline --frozen-lockfile

COPY docs docs
RUN pnpm docs:build

FROM nginx:alpine
COPY --from=build /repo/docs/.vitepress/dist /usr/share/nginx/html