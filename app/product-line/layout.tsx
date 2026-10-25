import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, pageMetadata, pageNodes } from '@/lib/seo';
import productLineData from '@/data/product-line-categories.json';

const PAGE = {
  path: '/product-line',
  crumb: 'Product Line',
  title: 'Plastic Injection Moulded Products | Vinayak Technoplast',
  description: 'Injection-moulded plastic parts for automotive, medical, electrical, household, industrial, power tool and telecom applications, made in New Delhi by Vinayak Technoplast.',
};

export const metadata: Metadata = pageMetadata(PAGE);

const categories = productLineData.categories;

const CATEGORY_LIST = {
  '@type': 'ItemList',
  '@id': `${absoluteUrl(PAGE.path)}#categories`,
  name: 'Product categories',
  numberOfItems: categories.length,
  itemListElement: categories.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name })),
};

export default function ProductLineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd nodes={[...pageNodes(PAGE, 'CollectionPage', { mainEntity: { '@id': CATEGORY_LIST['@id'] } }), CATEGORY_LIST]} />
    </>
  );
}
