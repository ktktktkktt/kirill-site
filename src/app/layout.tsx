import type { Metadata } from 'next'
import { Inter, Space_Mono, Unbounded } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://YOUR-DOMAIN.ru'),
  title: 'Кирилл Ткаченко — Сайт за 7 дней с помощью ИИ',
  description:
    'Разработка сайтов для малого бизнеса под ключ. 5+ лет опыта, ИИ-инструменты, срок до 7 дней. Строительные компании, автосервисы, рестораны и другие ниши.',
  keywords: [
    'разработка сайтов',
    'сайт под ключ',
    'сайт за 7 дней',
    'сайт с ИИ',
    'веб-разработчик',
    'сайт для малого бизнеса',
  ],
  openGraph: {
    title: 'Кирилл Ткаченко — Сайт за 7 дней',
    description: 'Сайты для малого бизнеса под ключ. ИИ + 5 лет опыта.',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceMono.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  )
}
