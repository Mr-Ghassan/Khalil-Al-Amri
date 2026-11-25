# Khalil Al Amri website — static build served by nginx.
# Build args: PUBLIC_SITE_MODE=preview|production (default preview: noindex + draft labels).
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Portrait derivatives + brand vectors are not in Git (public repo). They arrive as a checksummed
# bundle whose part URLs are build variables on the platform. A build without them fails on purpose.
ARG MEDIA_BUNDLE_URLS
ARG MEDIA_BUNDLE_SHA256
RUN MEDIA_BUNDLE_URLS="$MEDIA_BUNDLE_URLS" MEDIA_BUNDLE_SHA256="$MEDIA_BUNDLE_SHA256" node scripts/fetch-media.mjs && \
    mkdir -p public && tar -xzf /tmp/media.tgz -C public && rm /tmp/media.tgz && \
    test -f public/media/og-default.jpg && test -f public/brand/KHA_Signature_Primary_AR_PrimaryColor.min.svg
ARG PUBLIC_SITE_MODE=preview
ARG SITE_URL=https://www.khalilprop.com
ENV PUBLIC_SITE_MODE=$PUBLIC_SITE_MODE SITE_URL=$SITE_URL ASTRO_TELEMETRY_DISABLED=1
RUN npm run build && node scripts/csp.mjs

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/build-meta/csp.conf /etc/nginx/snippets/csp.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/healthz || exit 1
