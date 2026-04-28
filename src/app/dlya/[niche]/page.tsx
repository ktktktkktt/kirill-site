import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NICHES, CITIES } from '@/lib/niches'
import { SERVICES } from '@/lib/services'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'

interface Props {
  params: Promise<{ niche: string }>
}

export async function generateStaticParams() {
  return NICHES.map((n) => ({ niche: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheSlug } = await params
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  if (!niche) return {}

  return {
    title: `Сайт для ${niche.name} под ключ за 7 дней — Кирилл Ткаченко`,
    description: `Разработка сайта для ${niche.name} с ИИ. Срок до 7 дней, цена от 30 000 ₽. ${niche.pain}`,
    keywords: [
      `сайт для ${niche.nameShort.toLowerCase()}`,
      `разработка сайта ${niche.nameShort.toLowerCase()}`,
      `сайт ${niche.nameShort.toLowerCase()} под ключ`,
      `создать сайт для ${niche.nameShort.toLowerCase()}`,
    ],
  }
}

export default async function NichePage({ params }: Props) {
  const { niche: nicheSlug } = await params
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  if (!niche) notFound()

  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      {/* Hero */}
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
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Особенности сайта для {niche.nameShort.toLowerCase()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {niche.features.map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Какую услугу выбрать */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Форматы ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Какой сайт нужен {niche.nameShort.toLowerCase()}?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/uslugi/${service.slug}/${nicheSlug}`}
              className="bg-bg p-6 flex flex-col justify-between group hover:bg-surface transition-colors duration-300 min-h-[140px]"
            >
              <div>
                <span className="font-display text-base text-light uppercase group-hover:text-accent transition-colors duration-300 block mb-2">
                  {service.name}
                </span>
                <span className="font-body text-sm text-light/40 leading-relaxed block mb-4">
                  {service.description.slice(0, 80)}…
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent">{service.price}</span>
                <span className="font-mono text-[10px] text-light/20 group-hover:text-accent transition-colors duration-300 uppercase tracking-wider">
                  Подробнее →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* По городам */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ По городам ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Сайт для {niche.name} по городам
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/dlya/${nicheSlug}/${city.slug}`}
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
