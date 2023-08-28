FROM node:18-alpine AS build
WORKDIR /repo
RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/tsconfig packages/tsconfig
COPY packages/markdown-it-plugin-katex packages/markdown-it-plugin-katex
COPY packages/markdown-it-plugin-mermaid packages/markdown-it-plugin-mermaid
RUN pnpm fetch

COPY package.json ./
RUN pnpm i --offline --frozen-lockfile

COPY docs docs
RUN pnpm docs:build

FROM nginx:alpine
COPY --from=build /repo/docs/.vitepress/dist /usr/share/nginx/html