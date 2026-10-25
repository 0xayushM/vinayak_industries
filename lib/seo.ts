/**
 * Page metadata and schema.org structured data (JSON-LD) for the site.
 *
 * The root layout renders the Organization and WebSite nodes on every page;
 * each route's layout adds its own WebPage, BreadcrumbList and (where it
 * fits) Service nodes, which point back to those two by @id. Blog posts get
 * their JSON-LD from Beacon instead (app/blog/[slug]/page.tsx).
 *
 * Keep every fact here in step with what the pages show: search engines and
 * AI answer engines distrust structured data that the page does not back up.
 */

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/blog';

export const SITE_NAME = 'Vinayak Technoplast';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const LOGO = { url: '/logo/logo.png', width: 265, height: 182 };

const ADDRESS = 'F-6, DSIDC Industrial Complex, Rohtak Road, Near Udyog Nagar Metro Station, Nangloi, New Delhi 110041, India';

/** Opening hours, in India Standard Time; keep in step with the Hours row on app/contact/page.tsx. */
const OPENING_HOURS = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '09:00',
  closes: '20:00',
};

const hoursSpec = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: OPENING_HOURS.days.map((d) => `https://schema.org/${d}`),
  opens: OPENING_HOURS.opens,
  closes: OPENING_HOURS.closes,
};

type Node = Record<string, unknown>;

export type PageInfo = {
  /** path from the site root, e.g. '/about' */
  path: string;
  /** full <title>, brand included */
  title: string;
  description: string;
  /** label in breadcrumbs; omit for the home page */
  crumb?: string;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

/** Title, description, canonical, Open Graph and Twitter card for one page. */
export function pageMetadata(page: PageInfo): Metadata {
  const url = absoluteUrl(page.path);
  const images = [{ ...LOGO, alt: `${SITE_NAME} logo` }];
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'en_IN', url, siteName: SITE_NAME, title: page.title, description: page.description, images },
    twitter: { card: 'summary', title: page.title, description: page.description, images: [LOGO.url] },
  };
}

export function organizationNode(): Node {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}${LOGO.url}`, width: LOGO.width, height: LOGO.height },
    image: `${SITE_URL}/images/bg-image.png`,
    description:
      'ISO 9001:2015 certified plastic injection moulding manufacturer in New Delhi, India. Designs and builds injection moulds in an in-house tool room, moulds engineering polymers on 30+ machines from 60 to 850 tonnes, and assembles finished products for automotive, EV, electrical, medical, kitchenware and telecom OEMs.',
    email: 'sales@vinayaktechnoplast.com',
    telephone: '+91-9311378904',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'F-6, DSIDC Industrial Complex, Rohtak Road, Near Udyog Nagar Metro Station, Nangloi',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110041',
      addressCountry: 'IN',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
    openingHoursSpecification: [hoursSpec],
    areaServed: { '@type': 'Country', name: 'India' },
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', telephone: '+91-9311378904', email: 'sales@vinayaktechnoplast.com', areaServed: 'IN', hoursAvailable: hoursSpec },
      { '@type': 'ContactPoint', contactType: 'sales', telephone: '+91-9999394814', areaServed: 'IN', hoursAvailable: hoursSpec },
    ],
    sameAs: ['https://www.linkedin.com/company/vinayaktechnoplast'],
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'ISO 9001:2015' },
    knowsAbout: [
      'Plastic injection moulding',
      'Injection mould design and manufacturing',
      'Hot runner moulds',
      'Insert moulding and overmoulding',
      'Design for manufacturability (DFM)',
      'Engineering polymers',
      'Automotive plastic components',
      'EV plastic components',
      'Electrical accessories moulding',
      'Medical device plastic components',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Injection moulding services',
      itemListElement: Object.values(SERVICES).map((s) => ({ '@type': 'Offer', itemOffered: { '@id': s['@id'], name: s.name } })),
    },
  };
}

export function websiteNode(): Node {
  return { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE_URL, name: SITE_NAME, inLanguage: 'en-IN', publisher: { '@id': ORG_ID } };
}

/** The page itself and its breadcrumb trail (Home > page). */
export function pageNodes(page: PageInfo, type = 'WebPage', extra: Node = {}): Node[] {
  const url = absoluteUrl(page.path);
  const nodes: Node[] = [
    {
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
      ...(page.crumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      ...extra,
    },
  ];
  if (page.crumb) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: page.crumb, item: url },
      ],
    });
  }
  return nodes;
}

function service(path: string, slug: string, name: string, serviceType: string, description: string, extra: Node = {}) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#${slug}`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
    ...extra,
  };
}

const MOULD_TYPES = [
  ['Two-plate mould', 'Standard split-line mould for straightforward geometries and mid-to-high volume production.'],
  ['Three-plate mould', 'Gate separates automatically from the part; suited to centre-gated, multi-cavity layouts.'],
  ['Hot runner mould', 'Heated manifold keeps the runner molten: no cold runners to trim and minimal material waste.'],
  ['Hot sprue mould', 'A single heated nozzle feeds the cavity directly, removing the cold slug and shortening the cycle.'],
  ['Cold runner mould', 'Conventional runner system that works with all engineering resins and is easy to maintain.'],
  ['Insert and overmould', 'Metal inserts or a second material moulded onto a substrate, reducing assembly operations.'],
];

/** Services the site describes, keyed for reuse; each @id points at the page that covers it. */
export const SERVICES = {
  mouldMaking: service(
    '/moulding',
    'mould-making',
    'Injection mould design and manufacturing',
    'Injection mould manufacturing',
    'Plastic injection moulds designed and built in-house: DFM review, CAD/CAM, CNC milling on HAAS VMCs, Electronica EDM and wire-cut, assembly and T1 trial. Capacity of 200+ moulds a year at ±2 micron accuracy, with a lead time of 2 to 4 weeks from drawing to T1 trial, for injection moulding machines from 10 to 700 tonnes.',
    {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Mould types',
        itemListElement: MOULD_TYPES.map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description } })),
      },
    },
  ),
  mouldRepair: service(
    '/moulding',
    'mould-repair',
    'Injection mould repair and modification',
    'Mould repair',
    'Repair, modification and re-qualification of third-party injection moulds, with urgent turnaround in 24 to 72 hours. Over 50 active moulds under maintenance.',
  ),
  injectionMoulding: service(
    '/offerings',
    'injection-moulding',
    'Injection moulding of engineering polymers',
    'Plastic injection moulding',
    'High-volume injection moulding on 30+ PLC-controlled machines from 60 to 850 tonnes (Ferromatik, Toshiba, L&T, Shibaura, Bole), with shot weights up to 4,000 g. Materials include polystyrene, nylon, PC, ABS, PMMA, polypropylene and SAN.',
  ),
  assembly: service(
    '/offerings',
    'assembly',
    'Product assembly and supply of finished products',
    'Contract manufacturing',
    'Assembly, sub-assembly, packaging and secondary operations on moulded parts, delivering finished products and shortening the supply chain.',
  ),
  evComponents: service(
    '/ev',
    'ev-components',
    'EV plastic component manufacturing',
    'Plastic injection moulding',
    'Precision injection-moulded plastic parts for electric vehicles: heat-resistant components, high-strength functional parts and aesthetic interior trims, with tight tolerances and uniform wall thickness.',
  ),
};
