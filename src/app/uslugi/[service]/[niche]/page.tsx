import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { NICHES, CITIES } from '@/lib/niches'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'

interface Props {
  params: Promise<{ service: string; niche: string }>
}

export async function generateStaticParams() {
  return SERVICES.flatMap((service) =>
    NICHES.map((niche) => ({
      service: service.slug,
      niche: niche.slug,
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, niche: nicheSlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  if (!service || !niche) return {}

  const title = `${service.name} для ${niche.nameShort.toLowerCase()} под ключ — за ${service.time}`

  return {
    title: `${title} — Кирилл Ткаченко`,
    description: `Разработка: ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()}. ${service.description} ${niche.pain}`,
    keywords: [
      `${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()}`,
      `${service.name.toLowerCase()} ${niche.nameShort.toLowerCase()}`,
      `заказать ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()}`,
      `${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} под ключ`,
    ],
    openGraph: {
      title,
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default async function ServiceNichePage({ params }: Props) {
  const { service: serviceSlug, niche: nicheSlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  if (!service || !niche) notFound()

  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ {niche.nameShort} · {service.name} ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          {service.name}
          <br />
          для{' '}
          <span className="text-accent">{niche.nameShort.toLowerCase()}</span>
          <br />
          за {service.time}
        </h1>
        <p className="font-body text-lg text-light/60 max-w-2xl mb-4 leading-relaxed">
          {niche.pain}
        </p>
        <p className="font-body text-base text-light/40 max-w-2xl mb-12 leading-relaxed">
          {service.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-widest py-4 px-8 hover:bg-light transition-colors duration-300"
          >
            Обсудить проект →
          </a>
          <div className="flex flex-col justify-center sm:pl-4">
            <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider mb-1">Стоимость</span>
            <span className="font-mono text-sm text-accent">{service.price}</span>
          </div>
        </div>
      </section>

      {/* Что входит — комбо нишевых + сервисных фич */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Что входит ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Состав {service.name.toLowerCase()} для {niche.nameShort.toLowerCase()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[...service.features, ...niche.features].map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Хлебные крошки / навигация вверх */}
      <section className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-light/40 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
          <span>→</span>
          <Link href={`/uslugi/${serviceSlug}`} className="hover:text-accent transition-colors">
            {service.name}
          </Link>
          <span>→</span>
          <span className="text-accent">{niche.nameShort}</span>
        </div>
      </section>

      {/* По городам — SEO внутренняя перелинковка */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ По городам ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          {service.name} для {niche.nameShort.toLowerCase()} по городам
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
