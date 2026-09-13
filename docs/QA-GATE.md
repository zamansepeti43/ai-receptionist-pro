# Release QA Gate

A commercial build is not considered ready until all applicable checks pass.

## Static checks
- TypeScript typecheck
- Lint
- Unit and integration tests
- End-to-end tests
- Production build
- Dependency audit
- Secret scan

## Functional checks
- Business onboarding
- Service creation and duration
- Staff and resource availability
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

## Release checks
- No upstream brand remains in customer-facing UI
- Default customer experience supports English and Turkish
- No secrets or real customer data are committed
- Error states are understandable
- Empty states are useful
- Mobile layout is usable
- Accessibility basics pass
- Deployment documentation works from a clean environment
