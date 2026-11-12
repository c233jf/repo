FROM ghcr.io/voidzero-dev/vite-plus:1.0.0 AS build

ENV CI=true
WORKDIR /repo

COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN vp install --frozen-lockfile

COPY --chown=vp:vp docs docs
RUN vpr docs:build

FROM nginx:alpine
COPY --from=build /repo/docs/.vitepress/dist /usr/share/nginx/html