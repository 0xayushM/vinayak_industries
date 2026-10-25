import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SERVICES, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/ev',
  crumb: 'EV Components',
  title: 'EV Plastic Components Manufacturer | Vinayak Technoplast',
  description: 'Precision injection-moulded plastic parts for electric vehicles: heat-resistant components, high-strength functional parts and interior trims, made to tight tolerances in New Delhi.',
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function EvLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={[...pageNodes(PAGE, 'WebPage', { mainEntity: { '@id': SERVICES.evComponents['@id'] } }), SERVICES.evComponents]} />
    </>
  );
}
