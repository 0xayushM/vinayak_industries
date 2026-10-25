import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SERVICES, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/capabilities',
  crumb: 'Capabilities',
  title: 'Manufacturing Capabilities: 30+ Moulding Machines, 60 to 850 Tonnes | Vinayak Technoplast',
  description: 'In-house tool room with HAAS VMCs and Electronica EDM, 30+ PLC-controlled injection moulding machines from 60 to 850 tonnes, shot weights up to 4,000 g, assembly lines and an in-house testing lab.',
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function CapabilitiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={pageNodes(PAGE, 'WebPage', { mentions: [SERVICES.mouldMaking, SERVICES.injectionMoulding].map((s) => ({ '@id': s['@id'] })) })} />
    </>
  );
}
