# Pilot Checklist

Run this checklist with a fresh tenant and buyer-owned test accounts before production traffic.

- [ ] Create a fresh tenant.
- [ ] Configure one real service with duration and booking rules.
- [ ] Configure business hours and timezone.
- [ ] Connect one Google Calendar.
- [ ] Connect a test WhatsApp number through 360dialog.
- [ ] Send a representative customer request.
- [ ] Confirm the assistant asks for missing booking details.
- [ ] Confirm only real available slots are offered.
- [ ] Complete a booking and verify the calendar event.
- [ ] Reschedule the booking and verify the calendar update.
- [ ] Attempt a conflicting booking and confirm it is rejected.
- [ ] Trigger human handoff and verify conversation context is preserved.
- [ ] Test a representative knowledge-base question.
- [ ] If voice is enabled, test an inbound voice message and its transcript.
- [ ] Verify a second tenant cannot access the first tenant's data.
- [ ] Review logs, usage and failed jobs.
- [ ] Confirm no buyer secrets appear in browser responses or logs.
