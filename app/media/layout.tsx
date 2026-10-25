import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/media',
  crumb: 'Media',
  title: 'Media: Newsletters and Case Studies | Vinayak Technoplast',
  description: 'Newsletters and case studies from Vinayak Technoplast: cycle-time reductions, quality improvements and news from our injection moulding shop floor.',
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={pageNodes(PAGE, 'CollectionPage')} />
    </>
  );
}
