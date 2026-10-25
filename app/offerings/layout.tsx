import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SERVICES, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/offerings',
  crumb: 'Offerings',
  title: 'Injection Mould Design, Moulding and Assembly Services | Vinayak Technoplast',
  description: 'Injection mould and die design, injection moulding of engineering polymers (ABS, PC, nylon, PP, PMMA, SAN) and complete product assembly, all from one ISO 9001:2015 certified facility in New Delhi.',
};

export const metadata: Metadata = pageMetadata(PAGE);

const OFFERED = [SERVICES.mouldMaking, SERVICES.injectionMoulding, SERVICES.assembly];

export default function OfferingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={[...pageNodes(PAGE, 'WebPage', { mainEntity: OFFERED.map((s) => ({ '@id': s['@id'] })) }), ...OFFERED]} />
    </>
  );
}
