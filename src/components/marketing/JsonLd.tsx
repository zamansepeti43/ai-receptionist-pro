import { headers } from 'next/headers';

export async function JsonLd({ data }: Readonly<{ data: object }>) {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? undefined;

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'AI Receptionist Pro',
  url: SITE_URL,
  description: 'White-label AI receptionist for service businesses.',
} as const;

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AI Receptionist Pro',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Receptionist / Booking',
  operatingSystem: 'Web',
  url: SITE_URL,
  description: 'White-label AI receptionist for WhatsApp conversations, appointment workflows, calendar integration, knowledge-base answers and human handoff.',
  inLanguage: ['en-US', 'tr-TR'],
  publisher: { '@id': `${SITE_URL}#organization` },
} as const;

export {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildPersonSchema,
  buildProductOffersSchema,
  buildServiceSchema,
  buildSpeakableSchema,
} from './schema-builders';

export {
  buildDefinedTermSetSchema,
  buildEventSchema,
  buildHowToEnrichedSchema,
  buildQAPageSchema,
  buildReviewSchema,
  buildWebPageSchema,
} from './schema-builders-aeo';
