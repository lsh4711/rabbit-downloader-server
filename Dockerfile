#Currently, playwright only support debian and ubuntu
#mcr.microsoft.com/playwright:v1.48.2-noble => 2.14 GB
#manual build => 1.14 GB (include only chromium)

ARG NODE_ENV=production
ARG NODE_VERSION=20.18.0
ARG PLAYWRIGHT_VERSION=1.48.2

FROM ubuntu:noble AS node-builder

ARG NODE_VERSION
WORKDIR /node

RUN apt-get update && apt install --yes --no-install-recommends \
    curl  \
    ca-certificates  \
    xz-utils \
    && rm -rf /var/lib/apt/lists/* \
    && curl https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz -o node.tar.xz \
    && tar -xf node.tar.xz --strip 1 \
    && rm CHANGELOG.md LICENSE README.md node.tar.xz

FROM ubuntu:noble AS playwright-builder

ARG PLAYWRIGHT_VERSION

COPY --from=node-builder /node /usr
RUN npx playwright@${PLAYWRIGHT_VERSION} install chromium --with-deps \
    && rm -rf ~/.npm /var/lib/apt/lists/*

FROM ubuntu:noble AS app-builder

ARG NODE_ENV
WORKDIR /app

COPY --from=node-builder /node /usr
COPY package.json package-lock.json ./

RUN npm clean-install --force --include=dev # use `--force` until mikro-orm@6.3.14 release, because mikro-orm@next cause peer dependency conflict

#COPY nest-cli.json .
COPY tsconfig.json tsconfig.build.json ./
COPY env/${NODE_ENV}/mikro-orm.config.ts env/${NODE_ENV}/
COPY src src

RUN npx nest build \
    && npm prune --force --production \
    && rm \
    dist/tsconfig.build.tsbuildinfo \
    tsconfig.json \
    tsconfig.build.json \
    package-lock.json

FROM playwright-builder as rabbit-server-nest

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=node-builder /node /usr
COPY --from=app-builder /app .

#for preview
#COPY env/${NODE_ENV}/.env env/${NODE_ENV}/
