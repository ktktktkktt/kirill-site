// Единая точка истины по доменным и SEO-данным сайта.
// Хост в punycode, чтобы canonical/og/sitemap не уезжали в кириллицу.

export const SITE_DOMAIN = 'xn----8sblmeib4a2b.xn--p1ai' // кт-дизайн.рф
export const SITE_URL = `https://${SITE_DOMAIN}`
export const SITE_NAME = 'КТ-Дизайн — Кирилл Ткаченко'
export const SITE_AUTHOR = 'Кирилл Ткаченко'
export const SITE_PHONE = '+7 986 001 06 65'
export const SITE_PHONE_TEL = '+79860010665'
export const SITE_TELEGRAM = 'https://t.me/design_kto'
export const SITE_LOCALE = 'ru_RU'
export const SITE_COUNTRY = 'RU'
export const SITE_DEFAULT_OG = '/og.jpg' // 1200x630, положить в /public

export function absoluteUrl(path: string = '/'): string {
  if (!path.startsWith('/')) path = `/${path}`
  return `${SITE_URL}${path}`
}

// ────────────── JSON-LD генераторы ──────────────

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_AUTHOR,
    url: SITE_URL,
    image: absoluteUrl('/about-photo.jpg'),
    jobTitle: 'Веб-разработчик и дизайнер',
    description:
      'Разработка сайтов под ключ для малого бизнеса: лендинги, корпоративные сайты, интернет-магазины, упаковка и брендинг.',
    telephone: SITE_PHONE,
    sameAs: [SITE_TELEGRAM],
    knowsAbout: [
      'разработка сайтов',
      'веб-дизайн',
      'SEO',
      'лендинги',
      'интернет-магазины',
      'брендинг',
    ],
  }
}

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(SITE_DEFAULT_OG),
    telephone: SITE_PHONE,
    priceRange: '₽₽',
    description:
      'Разработка сайтов под ключ: лендинги, корпоративные сайты, интернет-магазины, брендинг и упаковка. Срок от 5 дней.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE_COUNTRY,
    },
    areaServed: { '@type': 'Country', name: 'Россия' },
    founder: { '@type': 'Person', name: SITE_AUTHOR },
    sameAs: [SITE_TELEGRAM],
  }
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ru-RU',
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

export function getServiceJsonLd(opts: {
  name: string
  description: string
  url: string
  price?: string
  serviceType?: string
  areaServed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    serviceType: opts.serviceType ?? opts.name,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: opts.areaServed
      ? { '@type': 'Place', name: opts.areaServed }
      : { '@type': 'Country', name: 'Россия' },
    ...(opts.price
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'RUB',
            price: opts.price,
            url: absoluteUrl(opts.url),
          },
        }
      : {}),
  }
}

export function getFAQJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

export function getArticleJsonLd(opts: {
  headline: string
  description: string
  url: string
  image: string
  datePublished?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: opts.image.startsWith('http') ? opts.image : absoluteUrl(opts.image),
    url: absoluteUrl(opts.url),
    author: { '@type': 'Person', name: SITE_AUTHOR, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#business` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    inLanguage: 'ru-RU',
  }
}
