import { useEffect } from 'react';
import { SITE } from '@/lib/site';

function upsert(selector: string, tag: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) { el = document.createElement(tag); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

// Sets title, description, canonical, social tags and optional JSON-LD for each page.
export function Seo({ title, description, path = '/', noindex = false, schema }: { title: string; description: string; path?: string; noindex?: boolean; schema?: object }) {
  useEffect(() => {
    document.title = title;
    const url = SITE.url + path;
    upsert('meta[name="description"]', 'meta', { name: 'description', content: description });
    upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });
    upsert('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
    upsert('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
    upsert('meta[property="og:url"]', 'meta', { property: 'og:url', content: url });
    upsert('meta[name="robots"]', 'meta', { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow' });
    const old = document.getElementById('ld-json');
    if (old) old.remove();
    if (schema) {
      const s = document.createElement('script');
      s.type = 'application/ld+json'; s.id = 'ld-json'; s.text = JSON.stringify(schema);
      document.head.appendChild(s);
    }
  }, [title, description, path, noindex, schema]);
  return null;
}

export const businessSchema = {
  '@context': 'https://schema.org', '@type': 'AutoRental', name: SITE.name, url: SITE.url, telephone: `+91${SITE.phone}`,
  areaServed: 'Kolkata', priceRange: '₹₹',
  address: { '@type': 'PostalAddress', streetAddress: '8, E Mall Rd, K.B.Sarani, Arjunpur, Kaikhali', addressLocality: 'Kolkata', addressRegion: 'West Bengal', postalCode: '700080', addressCountry: 'IN' },
};
