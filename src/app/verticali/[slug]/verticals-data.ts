export interface VerticalContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  hero: { eyebrow: string; h1: string; body: string };
  icon: string;
  pains: { title: string; body: string }[];
  scenarios: { title: string; body: string }[];
  metric: { value: string; label: string };
  relatedBlogSlug: string | null;
}

const makeVertical = (
  input: Omit<
    VerticalContent,
    'metaTitle' | 'metaDescription' | 'serviceType' | 'relatedBlogSlug'
  > & { serviceType: string },
): VerticalContent => ({
  ...input,
  metaTitle: `${input.title} — AI Receptionist Pro`,
  metaDescription: `AI receptionist workflow for ${input.title.toLowerCase()}: customer conversations, appointment handling and human handoff.`,
  relatedBlogSlug: null,
});

export const VERTICALS_DATA: Record<string, VerticalContent> = {
  salon: makeVertical({
    slug: 'salon',
    title: 'Salon & Barber',
    serviceType: 'AI receptionist for salons and barbers',
    icon: '✂️',
    hero: {
      eyebrow: 'Salon & Barber',
      h1: 'Turn appointment requests into booked time.',
      body: 'Answer service questions, collect the details needed for a booking, check real availability and hand off to staff when automation should stop.',
    },
    pains: [
      {
        title: 'Busy front desk',
        body: 'Handle repetitive appointment questions without forcing staff to answer every message.',
      },
      {
        title: 'Conflicting bookings',
        body: 'Use service duration, working hours and calendar availability before offering a slot.',
      },
      {
        title: 'After-hours requests',
        body: 'Keep the conversation moving outside opening hours and capture the request for follow-up.',
      },
    ],
    scenarios: [
      {
        title: 'New appointment',
        body: 'A customer requests a service and preferred time. The assistant checks availability and offers valid options.',
      },
      {
        title: 'Reschedule',
        body: 'The assistant identifies the existing appointment, checks alternatives and updates the booking.',
      },
      {
        title: 'Human request',
        body: 'The customer asks for a person. Automation stops and the conversation is handed to staff with context.',
      },
    ],
    metric: { value: '24/7', label: 'Customer message coverage' },
  }),
  beauty: makeVertical({
    slug: 'beauty',
    title: 'Beauty & Wellness',
    serviceType: 'AI receptionist for beauty and wellness businesses',
    icon: '✨',
    hero: {
      eyebrow: 'Beauty & Wellness',
      h1: 'Make every treatment request easier to book.',
      body: 'Use service-specific information, durations and business rules to guide customers from questions to valid appointment options.',
    },
    pains: [
      {
        title: 'Many services',
        body: 'Give customers consistent answers from the business knowledge base instead of relying on memory.',
      },
      {
        title: 'Different durations',
        body: 'Keep appointment availability aligned with the configured duration for each service.',
      },
      {
        title: 'Policy questions',
        body: 'Answer approved cancellation and preparation questions from business-provided information.',
      },
    ],
    scenarios: [
      {
        title: 'Treatment question',
        body: 'The assistant explains an approved service description and asks for the information needed to book.',
      },
      {
        title: 'Preferred time',
        body: 'The assistant checks the real calendar before suggesting available times.',
      },
      {
        title: 'Unclear request',
        body: 'When the knowledge base does not contain the answer, the assistant asks for clarification or escalates.',
      },
    ],
    metric: { value: 'Live', label: 'Availability-aware booking flow' },
  }),
  dental: makeVertical({
    slug: 'dental',
    title: 'Dental & Clinic',
    serviceType: 'Administrative AI receptionist for dental and clinic scheduling',
    icon: '🦷',
    hero: {
      eyebrow: 'Dental & Clinic',
      h1: 'Keep scheduling organized without pretending to be a clinician.',
      body: 'Handle administrative questions and appointment requests while keeping a strict boundary: no diagnosis, treatment advice or invented clinical information.',
    },
    pains: [
      {
        title: 'Scheduling pressure',
        body: 'Collect appointment details before a staff member needs to intervene.',
      },
      {
        title: 'Sensitive questions',
        body: 'Use configured guardrails to stop automation when a request moves beyond administrative support.',
      },
      {
        title: 'Missing information',
        body: 'Ask for the required scheduling details instead of guessing.',
      },
    ],
    scenarios: [
      {
        title: 'Routine appointment',
        body: 'The assistant collects the service request and checks configured availability.',
      },
      {
        title: 'Clinical question',
        body: 'A clinical request triggers a safe boundary and human handoff rather than an invented answer.',
      },
      {
        title: 'Reschedule',
        body: 'An existing appointment is moved only after a valid alternative is available.',
      },
    ],
    metric: { value: 'Safe', label: 'Administrative scheduling boundary' },
  }),
  veterinary: makeVertical({
    slug: 'veterinary',
    title: 'Veterinary',
    serviceType: 'AI receptionist for veterinary appointment workflows',
    icon: '🐾',
    hero: {
      eyebrow: 'Veterinary',
      h1: 'Organize pet-care appointment requests around the real calendar.',
      body: 'Collect owner and pet details for scheduling, answer approved business questions and escalate cases that require veterinary staff.',
    },
    pains: [
      {
        title: 'Incomplete intake',
        body: 'Collect the details configured by the business before handing a request to staff.',
      },
      {
        title: 'Urgent requests',
        body: 'Use configured escalation rules instead of attempting diagnosis or treatment advice.',
      },
      {
        title: 'Calendar conflicts',
        body: 'Check actual availability before offering appointment times.',
      },
    ],
    scenarios: [
      {
        title: 'Routine visit',
        body: 'Collect the appointment reason and preferred time, then offer valid availability.',
      },
      {
        title: 'Urgent concern',
        body: 'Escalate according to configured business rules instead of providing medical advice.',
      },
      {
        title: 'Follow-up',
        body: 'Handle administrative follow-up scheduling using the configured service and calendar.',
      },
    ],
    metric: { value: '24/7', label: 'Administrative request coverage' },
  }),
  fitness: makeVertical({
    slug: 'fitness',
    title: 'Gym & Fitness',
    serviceType: 'AI receptionist for gyms and fitness businesses',
    icon: '🏋️',
    hero: {
      eyebrow: 'Gym & Fitness',
      h1: 'Fill bookable time without turning staff into a messaging desk.',
      body: 'Coordinate consultations, personal training and other configured services using real availability and clear customer handoff.',
    },
    pains: [
      {
        title: 'Multiple services',
        body: 'Keep service durations and booking rules consistent across customer conversations.',
      },
      {
        title: 'Trainer schedules',
        body: 'Respect configured availability when staff or resources are part of the workflow.',
      },
      {
        title: 'Late requests',
        body: 'Capture customer requests outside normal hours and route them into the right workflow.',
      },
    ],
    scenarios: [
      {
        title: 'Training request',
        body: 'Match the requested service with configured duration and available time.',
      },
      {
        title: 'Schedule change',
        body: 'Check alternatives before changing an existing appointment.',
      },
      {
        title: 'Staff handoff',
        body: 'Escalate questions that require a trainer or operator while preserving context.',
      },
    ],
    metric: { value: 'Live', label: 'Availability-aware scheduling' },
  }),
  'auto-service': makeVertical({
    slug: 'auto-service',
    title: 'Auto Service',
    serviceType: 'AI receptionist for automotive service scheduling',
    icon: '🚗',
    hero: {
      eyebrow: 'Auto Service',
      h1: 'Turn service requests into structured appointments.',
      body: 'Collect the information needed to schedule automotive services, use configured durations and resources, and escalate technical questions to staff.',
    },
    pains: [
      {
        title: 'Unstructured requests',
        body: 'Turn free-form customer messages into the details the business needs for scheduling.',
      },
      {
        title: 'Resource conflicts',
        body: 'Keep bookable time aligned with configured bays, staff or other resources where supported.',
      },
      {
        title: 'Technical questions',
        body: 'Escalate repair diagnosis and uncertain technical information instead of guessing.',
      },
    ],
    scenarios: [
      {
        title: 'Service booking',
        body: 'Collect the service request and vehicle details configured by the business, then check availability.',
      },
      {
        title: 'Repair question',
        body: 'Route technical questions to staff rather than presenting an unverified diagnosis.',
      },
      {
        title: 'Reschedule',
        body: 'Move a booking only after checking the new slot against business availability.',
      },
    ],
    metric: { value: 'Structured', label: 'Request-to-booking workflow' },
  }),
  consulting: makeVertical({
    slug: 'consulting',
    title: 'Consulting & Professional Services',
    serviceType: 'AI receptionist for consulting and professional services',
    icon: '💼',
    hero: {
      eyebrow: 'Consulting & Professional Services',
      h1: 'Qualify meeting requests before they reach the calendar.',
      body: 'Collect the business-approved intake information, answer known questions, schedule consultations and hand complex requests to a human.',
    },
    pains: [
      {
        title: 'Low-context meetings',
        body: 'Collect the basic information configured by the business before scheduling.',
      },
      {
        title: 'Calendar back-and-forth',
        body: 'Offer only valid appointment times from the connected calendar.',
      },
      {
        title: 'Sensitive requests',
        body: 'Use human handoff for matters that should not be handled automatically.',
      },
    ],
    scenarios: [
      {
        title: 'Discovery call',
        body: 'Collect the configured intake fields and schedule an available consultation.',
      },
      {
        title: 'Existing client',
        body: 'Route requests according to configured business rules and preserve conversation context.',
      },
      {
        title: 'Custom request',
        body: 'Escalate when the knowledge base or workflow does not provide enough information.',
      },
    ],
    metric: { value: 'Focused', label: 'Lead-to-meeting workflow' },
  }),
};

export const VERTICAL_SLUGS = Object.keys(VERTICALS_DATA) as ReadonlyArray<
  keyof typeof VERTICALS_DATA
>;
