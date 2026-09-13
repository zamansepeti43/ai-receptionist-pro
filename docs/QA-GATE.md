# Release QA Gate

A commercial build is not considered ready until all applicable checks pass.

## Automated checks

- TypeScript typecheck
- Lint
- Unit and integration tests
- End-to-end browser tests
- Production build
- Production dependency audit
- Secret scan
- Database/RLS migration lint

## Functional checks

- Business onboarding
- Service creation and duration
- Business hours and booking rules
- Calendar connection
- Booking and rescheduling
- Booking conflict prevention
- WhatsApp inbound and outbound flow
- Voice-message handling where enabled
- Human escalation
- Knowledge-base answers
- Tenant switching and isolation
- Usage limits
- Billing state changes

## Manual production checks

- Verify Supabase RLS policies with two independent tenants.
- Verify webhook signature/verification behavior with the real WhatsApp provider.
- Verify Google OAuth redirect and calendar write-back with the buyer's domain.
- Verify provider credentials are never exposed to client-side code.
- Verify rate limiting and background-job authentication in the production environment.

## Release hygiene

- No upstream brand remains in customer-facing UI.
- Default customer experience is English-first with Turkish support available.
- No secrets or real customer data are committed.
- Error and empty states are understandable.
- Mobile layout is usable.
- Accessibility basics pass.
- Deployment documentation works from a clean environment.
- Marketing claims match the implemented launch scope.
