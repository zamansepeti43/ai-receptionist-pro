# ============================================================
# AI Receptionist Pro — Multi-stage Dockerfile
# Build: docker build -t ai-receptionist-pro .
# Run:   docker compose up  (see docker-compose.yml)
# ============================================================

# ---- Stage 1: deps ----------------------------------------
FROM node:22-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./

# Install production dependencies first so the runtime image stays lean.
RUN npm ci --omit=dev --ignore-scripts && \
    cp -r node_modules /tmp/node_modules_prod

# Install the full dependency set for the build stage.
RUN npm ci --ignore-scripts


# ---- Stage 2: build ---------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_APP_URL=https://your-domain.com
ARG NEXT_PUBLIC_APP_NAME=AI Receptionist Pro
ARG NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=placeholder

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Server-side placeholders allow a credential-free image build.
# Real values are injected at runtime via Docker secrets or environment variables.
ENV SUPABASE_SERVICE_ROLE_KEY=placeholder
ENV ANTHROPIC_API_KEY=placeholder
ENV STRIPE_SECRET_KEY=placeholder
ENV STRIPE_WEBHOOK_SECRET=placeholder
ENV WHATSAPP_API_KEY=placeholder
ENV WHATSAPP_WEBHOOK_HEADER_SECRET=placeholder
ENV ELEVENLABS_API_KEY=placeholder
ENV UPSTASH_REDIS_REST_URL=https://placeholder.upstash.io
ENV UPSTASH_REDIS_REST_TOKEN=placeholder
ENV INTERNAL_JOB_SECRET=placeholder

RUN npm run build


# ---- Stage 3: runtime -------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=deps /tmp/node_modules_prod ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
