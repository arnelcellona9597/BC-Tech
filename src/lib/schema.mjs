import { site } from '../data/site.mjs';
import { services, packages, faqs, clients } from '../data/content.mjs';

const abs = (p) => site.url + p;
const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const orgId = abs('/#organization');
const siteId = abs('/#website');
const bizId = abs('/#business');

const address = {
  '@type': 'PostalAddress',
  addressLocality: site.city,
  addressRegion: site.region,
  addressCountry: site.country,
};

function organization() {
  const o = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    image: abs('/assets/img/og/home.png'),
    slogan: site.tagline,
    email: site.email,
    address,
    description: 'Davao Byte is a web design and web development company in Davao City, Philippines.',
  };
  if (site.phone) o.telephone = [site.phone, site.phone2].filter(Boolean);
  const links = Object.entries(site.social).filter(([k, v]) => v && k !== 'messenger').map(([, v]) => v);
  if (links.length) o.sameAs = links;
  return o;
}

function business() {
  return {
    '@type': 'ProfessionalService',
    '@id': bizId,
    name: site.name,
    url: abs('/'),
    image: abs('/assets/img/og/home.png'),
    email: site.email,
    address,
    priceRange: '₱₱₱',
    parentOrganization: { '@id': orgId },
    // TODO(client): confirm these hours before launch.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    ...(site.phone ? { telephone: [site.phone, site.phone2].filter(Boolean) } : {}),
  };
}

const pageTypes = { about: 'AboutPage', contact: 'ContactPage', services: 'CollectionPage', pricing: 'CollectionPage', guides: 'CollectionPage', work: 'CollectionPage' };

export function jsonLd(meta) {
  const url = abs(meta.path);
  const graph = [organization()];
  graph.push({
    '@type': 'WebSite',
    '@id': siteId,
    url: abs('/'),
    name: site.name,
    description: site.tagline,
    publisher: { '@id': orgId },
    inLanguage: site.lang,
  });
  if (['home', 'about', 'contact'].includes(meta.key)) graph.push(business());

  graph.push({
    '@type': pageTypes[meta.key] || 'WebPage',
    '@id': url + '#webpage',
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(meta.ogImage), width: 1200, height: 630 },
    inLanguage: site.lang,
    ...(meta.key === 'home' ? {} : { breadcrumb: { '@id': url + '#breadcrumb' } }),
  });

  if (meta.key !== 'home' && meta.key !== 'notfound') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
        ...(meta.crumbs || [[meta.crumb || meta.title, meta.path]]).map(([name, path], i) => ({ '@type': 'ListItem', position: i + 2, name, item: abs(path) })),
      ],
    });
  }

  if (meta.key === 'services') {
    graph.push({
      '@type': 'ItemList',
      name: 'Davao Byte services',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Service', name: s.title, description: s.blurb + ' ' + s.items.map(strip).join('; ') + '.', provider: { '@id': orgId }, areaServed: { '@type': 'Country', name: site.countryName } },
      })),
    });
  }

  if (meta.key === 'pricing') {
    graph.push({
      '@type': 'OfferCatalog',
      name: 'Davao Byte website packages',
      itemListElement: packages.map((p) => ({
        '@type': 'Offer',
        name: `${p.name} (${p.sub})`,
        description: p.forWho,
        priceCurrency: 'PHP',
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'PHP', minPrice: p.from, ...(p.open ? {} : { maxPrice: p.to }) },
        seller: { '@id': orgId },
        url,
      })),
    });
  }

  if (meta.schema === 'portfolio') {
    graph.push({
      '@type': 'ItemList',
      name: 'Websites built by Davao Byte',
      itemListElement: clients.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'WebSite', name: c.name, url: c.url, description: c.text, creator: { '@id': orgId }, inLanguage: site.lang },
      })),
    });
  }

  if (meta.schema === 'service') {
    const sv = meta.service;
    graph.push({
      '@type': 'Service',
      '@id': url + '#service',
      name: sv.title,
      serviceType: sv.title,
      description: meta.description,
      url,
      provider: { '@id': orgId },
      areaServed: meta.area ? { '@type': 'City', name: meta.area } : { '@type': 'Country', name: site.countryName },
      mainEntityOfPage: { '@id': url + '#webpage' },
    });
  }

  if (meta.schema === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': url + '#article',
      headline: meta.guide.title,
      description: meta.description,
      image: abs(meta.ogImage),
      author: { '@id': orgId },
      publisher: { '@id': orgId },
      datePublished: site.built,
      dateModified: site.built,
      mainEntityOfPage: { '@id': url + '#webpage' },
      inLanguage: site.lang,
    });
  }

  const faq = meta.faq || faqs[meta.key];
  if (faq) {
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })),
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
}
