<div align="center">

# AI Receptionist Pro

### White-label AI receptionist for service businesses

**WhatsApp-first · Appointment automation · Human handoff · Self-hostable · MIT upstream**

</div>

---

## Product

AI Receptionist Pro is a configurable receptionist application for businesses that receive appointment and customer-service requests through WhatsApp. It is designed to answer common questions, collect missing booking details, check real availability, create or change appointments, and escalate conversations to a human when automation should stop.

### Launch sectors

- Salon & Barber
- Beauty & Wellness
- Dental & Clinic — administrative scheduling only
- Veterinary
- Gym & Fitness
- Auto Service
- Consultant / Professional Services

One application serves all sectors. Each tenant can override the preset with its own services, hours, assistant identity, knowledge base and business rules.

## Core capabilities

- WhatsApp text and voice-message handling
- AI intent classification and customer conversation context
- Real appointment availability and conflict protection
- Google Calendar integration
- Human escalation with conversation context
- Tenant-specific configuration and integrations
- Knowledge-base retrieval
- Stripe billing support
- GDPR export/delete workflows
- Docker, hosted deployment and environment configuration

## Productization layer

This repository adds product identity, sector presets, white-label configuration contracts, buyer documentation, release gates and additional booking/usage utilities around the upstream application.

Customer-facing defaults must never depend on the seller's third-party accounts. Buyers connect their own providers and credentials.

## Quality standard

A release candidate is not considered ready until type checking, linting, unit/integration tests, database migration checks, production build, security/secret scanning and the buyer-style end-to-end walkthrough pass. See `docs/QA-GATE.md`, `docs/FINAL-QA.md` and `docs/BUYER-TEST.md`.

## Development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Verification:

```bash
npm run verify
npm run build
npm run test:e2e
```

## Licensing and attribution

This product contains code from the upstream **Hiberius/whatsapp-receptionist** project, released under the MIT license. The upstream MIT license and attribution notices are retained. Product documentation must not describe the upstream code as written from scratch.

See `LICENSE` and `docs/UPSTREAM-ATTRIBUTION.md`.
