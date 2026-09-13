# Commercial Delivery Checklist

## Included

- Full application source
- Database migrations
- Docker and hosted-deployment guidance
- Buyer environment template
- Seven launch-sector presets
- White-label configuration contract
- Security and privacy guidance
- API and architecture documentation
- Automated verification and browser tests
- MIT license and upstream attribution

## Buyer handoff

1. Download or clone the package.
2. Configure hosting and environment variables with buyer-owned accounts.
3. Create the Supabase project and apply migrations in order.
4. Configure Anthropic and 360dialog for the core AI + WhatsApp workflow.
5. Connect Google Calendar.
6. Select and review a sector preset.
7. Configure business identity, assistant identity, services, hours and knowledge-base content.
8. Run `npm run verify`, `npm run build` and `npm run test:e2e`.
9. Run a controlled pilot with a fresh tenant.
10. Verify webhook validation, booking conflicts, tenant isolation and human escalation before production use.

## Important scope note

The launch release provides the existing appointment/calendar workflow and availability conflict protection. It does **not** claim a dedicated multi-staff/resource scheduling module. Do not advertise staff-specific scheduling as included until that module is implemented and tested.

## Licensing

The package contains code from the upstream MIT-licensed project. Retain the upstream MIT license and attribution in distributed copies. Do not describe the upstream code as written from scratch.
