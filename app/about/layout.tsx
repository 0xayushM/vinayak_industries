import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { ORG_ID, pageMetadata, pageNodes } from '@/lib/seo';

const PAGE = {
  path: '/about',
  crumb: 'About Us',
  title: 'About Us | Vinayak Technoplast, Injection Moulding Company in New Delhi',
  description: 'Vinayak Technoplast designs moulds, moulds plastic parts and assembles finished products under one roof in New Delhi. Meet the team led by CEO Sandeep Agarwal and read our ISO 9001:2015 quality policy.',
};

export const metadata: Metadata = pageMetadata(PAGE);

const person = (name: string, jobTitle: string, extra: Record<string, unknown> = {}) => ({ '@type': 'Person', name, jobTitle, worksFor: { '@id': ORG_ID }, ...extra });

const PEOPLE = [
  person('Arjun Kumar Agarwal', 'Chairman', {
    description: 'Mechanical engineer whose engineering vision inspired Vinayak Technoplast.',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology (BHU) Varanasi' },
  }),
  person('Sandeep Agarwal', 'CEO', { description: 'Over 21 years of hands-on experience in precision injection moulding.' }),
  person('Sunny Kalra', 'Chief of Growth Staff', { description: 'Leads strategic expansion and business development.' }),
];

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={[...pageNodes(PAGE, 'AboutPage', { mainEntity: { '@id': ORG_ID } }), ...PEOPLE]} />
    </>
  );
}
