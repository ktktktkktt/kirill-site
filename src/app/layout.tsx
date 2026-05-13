import type { Metadata } from 'next'
import { Inter, Space_Mono, Unbounded } from 'next/font/google'
import './globals.css'
import { Preloader } from '@/components/Preloader'
import { JsonLd } from '@/components/JsonLd'
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  SITE_DEFAULT_OG,
  getPersonJsonLd,
  getLocalBusinessJsonLd,
  getWebSiteJsonLd,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700', '900'],
  variable: '--font-unbounded',
  display: 'swap',
})

const title = 'Разработка сайтов под ключ за 7 дней — Кирилл Ткаченко'
const description =
  'Разработка сайтов для малого бизнеса под ключ: лендинги от 30 000 ₽, корпоративные сайты, интернет-магазины. Срок от 5 дней. SEO с первого дня, фикс цены в договоре.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: '%s — Кирилл Ткаченко',
  },
  description,
  keywords: [
    'разработка сайтов',
    'сайт под ключ',
    'заказать сайт',
    'разработка лендинга',
    'разработка интернет-магазина',
    'корпоративный сайт',
    'сайт для малого бизнеса',
    'веб-разработчик',
    'SEO-сайт',
    'сайт за 7 дней',
  ],
  authors: [{ name: 'Кирилл Ткаченко', url: SITE_URL }],
  creator: 'Кирилл Ткаченко',
  publisher: 'Кирилл Ткаченко',
  applicationName: SITE_NAME,
  category: 'business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: SITE_DEFAULT_OG,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [SITE_DEFAULT_OG],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceMono.variable} ${unbounded.variable}`}>
      <head>
        <JsonLd data={getLocalBusinessJsonLd()} />
        <JsonLd data={getWebSiteJsonLd()} />
        <JsonLd data={getPersonJsonLd()} />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  )
}
