# Buyer Setup

This package is self-hostable. The buyer supplies and controls all infrastructure and third-party credentials.

## Required for the core workflow

1. **Hosting:** Vercel, Docker-compatible hosting, or another Node.js 22 environment.
2. **Supabase:** database, authentication, storage and row-level security.
3. **Anthropic:** AI conversation and intent handling.
4. **360dialog:** WhatsApp Business messaging.
5. **Google Calendar:** appointment synchronization.

## Optional integrations

- ElevenLabs — voice transcription and replies.
- Stripe — subscription billing.
- Resend — transactional email.
- Upstash Redis — distributed rate limiting.
- OpenAI embeddings — vector knowledge-base retrieval.

## Deployment sequence

1. Copy `.env.product.example` to `.env.local` for local setup.
2. Fill in only the provider credentials required by the features you enable.
3. Create the Supabase project and apply migrations in `supabase/migrations/` order.
4. Start the application with `npm run dev`, or build and start it for production.
5. Complete account registration and business onboarding.
6. Select a sector preset and review its services, hours and assistant defaults.
7. Connect WhatsApp and Google Calendar.
8. Add the business knowledge base and verify representative customer questions.
9. Run the automated verification and E2E suite.
10. Run a controlled pilot before production traffic.

## Production requirements

Use HTTPS, keep server-only secrets out of browser variables, configure webhook verification secrets, set the correct public site URL, and verify tenant isolation in the target Supabase project before launch.

Do not ship seller-owned API keys, customer data, or local `.env` files in the commercial delivery.
