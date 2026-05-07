import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NICHES, CITIES } from '@/lib/niches'
import { SERVICES } from '@/lib/services'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { NicheCases } from '@/components/NicheCases'

interface Props {
  params: Promise<{ niche: string; city: string }>
}

export async function generateStaticParams() {
  return NICHES.flatMap((niche) =>
    CITIES.map((city) => ({
      niche: niche.slug,
      city: city.slug,
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheSlug, city: citySlug } = await params
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!niche || !city) return {}

  const title = `Сайт для ${niche.name} в ${city.name} — под ключ за 7 дней`

  return {
    title: `${title} — Кирилл Ткаченко`,
    description: `Разработка сайта для ${niche.name} в ${city.name}. ИИ-инструменты, срок до 7 дней, цена от 30 000 ₽. ${niche.pain}`,
    keywords: [
      `сайт для ${niche.nameShort.toLowerCase()} в ${city.nameRod}`,
      `разработка сайта ${niche.nameShort.toLowerCase()} ${city.nameRod}`,
      `сайт ${niche.nameShort.toLowerCase()} ${city.nameRod} под ключ`,
      `создать сайт ${niche.nameShort.toLowerCase()} ${city.nameRod}`,
    ],
    openGraph: {
      title,
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default async function NicheCityPage({ params }: Props) {
  const { niche: nicheSlug, city: citySlug } = await params
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!niche || !city) notFound()

  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ {city.nameRod} · {niche.nameShort} ]
        </div>

        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          Сайт для {niche.name}<br />
          в <span className="text-accent">{city.name}</span><br />
          за 7 дней
        </h1>

        <p className="font-body text-lg text-light/60 max-w-2xl mb-12 leading-relaxed">
          {niche.pain} Работаю удалённо по всей России — результат тот же, цена та же.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-widest py-4 px-8 hover:bg-light transition-colors duration-300"
          >
            Обсудить проект →
          </a>
          <div className="flex items-center font-mono text-sm text-light/40 uppercase tracking-widest">
            Ответ в течение часа
          </div>
        </div>
      </section>

      {/* Что входит */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Что входит в сайт для {niche.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg">
          {niche.features.map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Стоимость сайта для {niche.name} в {city.name}
        </h2>
        <div className="flex flex-col border-t border-border">
          {SERVICES.slice(0, 3).map((service, i) => (
            <Link
              key={i}
              href={`/uslugi/${service.slug}/${nicheSlug}/${citySlug}`}
              className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-border hover:bg-surface transition-colors px-4 -mx-4"
            >
              <span className="font-display text-2xl text-light uppercase">{service.name}</span>
              <div className="flex items-center gap-8 mt-2 md:mt-0">
                <span className="font-mono text-sm text-light/50">{service.time}</span>
                <span className="font-mono text-sm text-accent">{service.price}</span>
                <span className="font-mono text-xs text-light/20 uppercase tracking-wider">Подробнее →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Локальная стратегия */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Стратегия ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-8">
          Как продвигать {niche.nameShort.toLowerCase()} в {city.name}
        </h2>
        <p className="font-body text-light/60 max-w-3xl leading-relaxed">
          Для локального продвижения важны отдельные посадочные под город, понятная
          структура услуг, быстрые контакты, доказательства опыта и связка с картами,
          отзывами и поисковыми системами.
        </p>
      </section>

      <NicheCases nicheSlug={nicheSlug} nicheName={niche.name} />

      {/* Хлебные крошки */}
      <section className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-light/40 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
          <span>→</span>
          <Link href={`/dlya/${nicheSlug}`} className="hover:text-accent transition-colors">
            Сайт для {niche.nameShort.toLowerCase()}
          </Link>
          <span>→</span>
          <span className="text-accent">{city.name}</span>
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
