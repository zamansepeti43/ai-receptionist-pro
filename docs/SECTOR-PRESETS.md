# Sector Presets

AI Receptionist Pro is designed around one booking engine with configurable sector presets.

| Preset | Typical services | Booking focus |
|---|---|---|
| Salon & Barber | Haircut, coloring, styling | Staff + duration |
| Beauty & Wellness | Facial, nails, massage | Staff + duration |
| Dental & Clinic | Consultation, cleaning, follow-up | Provider + duration; administrative scheduling only |
| Veterinary | Exam, vaccination, follow-up | Provider + duration |
| Gym & Fitness | Personal training, classes | Trainer + resource |
| Auto Service | Inspection, oil service, repair | Technician + bay/resource |
| Consultant | Consultation, review, meeting | Consultant + duration |

Each preset should define service defaults, assistant instructions, suggested intake fields, working-hours defaults, and demo data. Businesses can override every preset value.

## Safety boundary
The assistant should not invent availability, prices, policies, or service details. Missing information must be escalated or requested. Healthcare-related presets are for administrative scheduling and customer communication, not diagnosis or treatment advice.
