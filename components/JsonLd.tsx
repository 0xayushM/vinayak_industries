/**
 * Renders schema.org nodes as one JSON-LD <script>. `<` is escaped so a
 * value can never close the tag early.
 */
export default function JsonLd({ nodes }: { nodes: Record<string, unknown>[] }) {
  const data = { '@context': 'https://schema.org', '@graph': nodes };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
