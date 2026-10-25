import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { ORG_ID, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/contact',
  crumb: 'Contact',
  title: 'Contact Us and Get a Quote | Vinayak Technoplast',
  description: 'Request a quote for injection moulds or moulded parts. Call +91 93113 78904, email sales@vinayaktechnoplast.com, or visit us at DSIDC Industrial Complex, Nangloi, New Delhi.',
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={pageNodes(PAGE, 'ContactPage', { mainEntity: { '@id': ORG_ID } })} />
    </>
  );
}
