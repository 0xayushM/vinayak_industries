import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { SERVICES, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/moulding',
  crumb: 'Mould Making',
  title: 'Injection Mould Manufacturer in Delhi with In-House Tool Room | Vinayak Technoplast',
  description: 'Two-plate, three-plate, hot runner, hot sprue, cold runner and insert moulds built in-house: DFM review, CAD/CAM, CNC milling, EDM and T1 trial. 200+ moulds a year at ±2 micron accuracy.',
};

export const metadata: Metadata = pageMetadata(PAGE);

const OFFERED = [SERVICES.mouldMaking, SERVICES.mouldRepair];

export default function MouldingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={[...pageNodes(PAGE, 'WebPage', { mainEntity: OFFERED.map((s) => ({ '@id': s['@id'] })) }), ...OFFERED]} />
    </>
  );
}
