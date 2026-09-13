# Buyer Quickstart

## 1. Install

```bash
npm ci
```

Copy `.env.product.example` to `.env.local` (or configure the same variables in your host) and add credentials for the providers you enable.

## 2. Database

Create a Supabase project, configure the database connection values, and apply every SQL migration under `supabase/migrations/` in filename order.

## 3. Configure the business

- Choose one of the seven launch sector presets.
- Set the business name, location, timezone and contact details.
- Add services and durations.
- Set business hours and booking rules.
- Configure the assistant name, language and knowledge base.
- Configure white-label branding when needed.

## 4. Connect providers

Enable only the integrations you have configured:

- WhatsApp through 360dialog
- Anthropic Claude for AI
- Google Calendar for appointment synchronization
- ElevenLabs for voice messages (optional)
- Stripe for billing (optional)
- Resend for transactional email (optional)
- Upstash Redis for distributed rate limiting (optional)

All provider accounts and credentials must belong to the buyer or their customer.

## 5. Verify

```bash
npm run verify
npm run build
npm run test:e2e
```

For production, also run the pilot checklist with a fresh tenant and real provider test accounts before accepting customer traffic.

> Note: the launch release uses the application's existing single-business availability and calendar workflow. A dedicated multi-staff/resource scheduling module is not part of the launch claim.
