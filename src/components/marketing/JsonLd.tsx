import { headers } from 'next/headers';
import { PRODUCT_IDENTITY } from '@/config/product-identity';

export async function JsonLd({ data }: Readonly<{ data: object }>) {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? undefined;
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: PRODUCT_IDENTITY.name,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: PRODUCT_IDENTITY.tagline,
  knowsLanguage: ['en', 'tr'],
} as const;

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PRODUCT_IDENTITY.name,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI Receptionist / Appointment Booking',
  operatingSystem: 'Web',
  url: SITE_URL,
  description: PRODUCT_IDENTITY.tagline,
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
