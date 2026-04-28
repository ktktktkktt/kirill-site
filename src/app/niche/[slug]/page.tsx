import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NICHES, CITIES } from '@/lib/niches'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'

// В Next.js 15 params — это Promise, поэтому везде await params
interface Props {
  params: Promise<{ slug: string }>
}

// Генерирует все 10 нишевых страниц при билде
export async function generateStaticParams() {
  return NICHES.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const niche = NICHES.find((n) => n.slug === slug)
  if (!niche) return {}

  return {
    title: `Сайт для ${niche.name} под ключ за 7 дней — Кирилл Ткаченко`,
    description: `Разработка сайта для ${niche.name} с ИИ. Срок до 7 дней, цена от 30 000 ₽. ${niche.pain}`,
    keywords: [
      `сайт для ${niche.nameShort.toLowerCase()}`,
      `разработка сайта ${niche.nameShort.toLowerCase()}`,
      `сайт ${niche.nameShort.toLowerCase()} под ключ`,
    ],
  }
}

export default async function NichePage({ params }: Props) {
  const { slug } = await params
  const niche = NICHES.find((n) => n.slug === slug)
  if (!niche) notFound()

  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      {/* Hero нишевой страницы */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Специализация ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          Сайт для<br />
          <span className="text-accent">{niche.name}</span><br />
          за 7 дней
        </h1>
        <p className="font-body text-lg text-light/60 max-w-2xl mb-12 leading-relaxed">
          {niche.pain}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-widest py-4 px-8 hover:bg-light transition-colors duration-300"
        >
          Обсудить проект →
        </a>
      </section>

      {/* Что входит */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Что входит ]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {niche.features.map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ссылки по городам — SEO внутренняя перелинковка */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ По городам ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Сайт для {niche.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/niche/${slug}/${city.slug}`}
              className="font-mono text-sm text-light/50 hover:text-accent transition-colors py-2 border-b border-border hover:border-accent"
            >
              в {city.name} →
            </Link>
          ))}
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
