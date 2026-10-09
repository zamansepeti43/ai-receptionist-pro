import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VerticalDetailClient } from '@/components/marketing/VerticalDetailClient';
import { VERTICALS_DATA } from './verticals-data';

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return Object.keys(VERTICALS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = VERTICALS_DATA[slug];
  if (!data) return { title: 'Sector not found', robots: { index: false, follow: false } };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: `/verticali/${data.slug}`, type: 'website', locale: 'en_US' },
    alternates: { canonical: `/verticali/${data.slug}` },
  };
}

export default async function VerticalPage({ params }: PageProps) {
  const { slug } = await params;
  if (!VERTICALS_DATA[slug]) notFound();
  return <VerticalDetailClient slug={slug} />;
}
