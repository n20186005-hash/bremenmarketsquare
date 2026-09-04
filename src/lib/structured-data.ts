import type { Locale } from '@/i18n/routing';
import { siteUrl } from '@/lib/site';

const BASE_URL = siteUrl;
const MAP_URL = 'https://maps.app.goo.gl/MNMKZRjaTAC3cVVp9';
const HERO_IMAGE = `${BASE_URL}/gallery/bremen-market-square%20(1).jpg`;

const LOCALIZED: Record<
  Locale,
  { name: string; alternateName: string; description: string }
> = {
  en: {
    name: 'Bremen Market Square',
    alternateName: 'Bremer Marktplatz',
    description:
      'Historic town square in the heart of Bremen, Germany, surrounded by the UNESCO-listed Town Hall and Roland statue, St. Peter\u2019s Cathedral and the Town Musicians statue, and home to the annual Christmas market.',
  },
  de: {
    name: 'Bremer Marktplatz',
    alternateName: 'Bremen Market Square',
    description:
      'Historischer Marktplatz im Herzen von Bremen, umgeben von Rathaus und Roland-Statue (UNESCO-Weltkulturerbe), St. Petri Dom und den Bremer Stadtmusikanten sowie Austragungsort des j\u00e4hrlichen Weihnachtsmarktes.',
  },
  zh: {
    name: 'Bremen Market Square',
    alternateName: 'Bremer Marktplatz',
    description:
      '不来梅市中心的标志性广场，四周环绕列入世界遗产的市政厅与罗兰雕像、圣彼得大教堂与城市音乐家雕像，每年还举办著名的圣诞市集。',
  },
};

export function buildTouristAttractionJsonLd(locale: Locale) {
  const content = LOCALIZED[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/${locale}#bremen-market-square`,
    name: content.name,
    alternateName: content.alternateName,
    description: content.description,
    url: `${BASE_URL}/${locale}`,
    image: [HERO_IMAGE],
    isAccessibleForFree: true,
    publicAccess: true,
    telephone: '+49421321676',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Markt 2',
      addressLocality: 'Bremen',
      addressRegion: 'Bremen',
      postalCode: '28195',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.0757432,
      longitude: 8.8071942,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'https://schema.org/Monday',
        'https://schema.org/Tuesday',
        'https://schema.org/Wednesday',
        'https://schema.org/Thursday',
        'https://schema.org/Friday',
        'https://schema.org/Saturday',
        'https://schema.org/Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
      description: 'Open-air public square, freely accessible 24/7',
    },
    hasMap: MAP_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      bestRating: '5',
      reviewCount: '6489',
    },
    sameAs: [
      'https://whc.unesco.org/en/list/1087/',
      'https://www.welterbe.bremen.de/',
      'https://www.bremen-tourismus.de/',
      'https://www.bremen.eu/',
      'https://www.bremen.de/',
    ],
  };
}

export function buildFaqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
