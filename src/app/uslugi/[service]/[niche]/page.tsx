import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { NICHES, CITIES } from '@/lib/niches'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { WorksSlider } from '@/components/WorksSlider'
import { JsonLd } from '@/components/JsonLd'
import {
  getServiceJsonLd,
  getBreadcrumbJsonLd,
  getFAQJsonLd,
} from '@/lib/seo'

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
    alternates: {
      canonical: `/uslugi/${serviceSlug}/${nicheSlug}`,
    },
    openGraph: {
      title,
      locale: 'ru_RU',
      type: 'website',
      url: `/uslugi/${serviceSlug}/${nicheSlug}`,
    },
  }
}

export default async function ServiceNichePage({ params }: Props) {
  const { service: serviceSlug, niche: nicheSlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  if (!service || !niche) notFound()

  const url = `/uslugi/${serviceSlug}/${nicheSlug}`
  const faqItems = [
    {
      q: `Чем ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} отличается от обычного сайта?`,
      a: 'Структура строится вокруг конкретных болей, возражений, доказательств и сценариев выбора в этой нише.',
    },
    {
      q: 'Можно ли расширить страницу под города?',
      a: 'Да. Для этой связки доступны отдельные городские посадочные с локальными заголовками и перелинковкой.',
    },
    {
      q: 'Что будет после запуска?',
      a: 'Можно постепенно расширять семантику: добавлять города, смежные услуги, кейсы и FAQ-кластеры.',
    },
  ]
  const priceMatch = service.price.match(/\d[\d\s]*/)
  const priceNum = priceMatch ? priceMatch[0].replace(/\s/g, '') : undefined

  return (
    <main className="bg-bg text-light min-h-screen">
      <JsonLd
        data={getServiceJsonLd({
          name: `${service.name} для ${niche.nameShort.toLowerCase()}`,
          description: `${service.description} ${niche.pain}`,
          url,
          price: priceNum,
          serviceType: service.name,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: service.name, url: `/uslugi/${serviceSlug}` },
          { name: niche.nameShort, url },
        ])}
      />
      <JsonLd data={getFAQJsonLd(faqItems)} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg">
          {[...service.features, ...niche.features].map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Для кого подходит */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Для кого ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Когда {niche.nameShort.toLowerCase()} нужен {service.name.toLowerCase()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg">
          {[
            'Если заявки приходят случайно и нет стабильного потока из поиска.',
            'Если клиентам нужно показать опыт, цены, процесс и гарантии до звонка.',
            'Если текущая страница не объясняет ценность и не ведет к заявке.',
          ].map((item, i) => (
            <div key={item} className="bg-bg p-8">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="font-body text-light/60 mt-6 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Примеры работ */}
      <WorksSlider serviceSlug={serviceSlug} />

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
              href={`/uslugi/${serviceSlug}/${nicheSlug}/${city.slug}`}
              className="font-mono text-sm text-light/50 hover:text-accent transition-colors py-2 border-b border-border hover:border-accent"
            >
              в {city.name} →
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ FAQ ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Вопросы по связке услуги и ниши
        </h2>
        <div className="flex flex-col border-t border-border">
          {[
            {
              q: `Чем ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} отличается от обычного сайта?`,
              a: 'Структура строится вокруг конкретных болей, возражений, доказательств и сценариев выбора в этой нише.',
            },
            {
              q: 'Можно ли расширить страницу под города?',
              a: 'Да. Для этой связки доступны отдельные городские посадочные с локальными заголовками и перелинковкой.',
            },
            {
              q: 'Что будет после запуска?',
              a: 'Можно постепенно расширять семантику: добавлять города, смежные услуги, кейсы и FAQ-кластеры.',
            },
          ].map((item) => (
            <div key={item.q} className="py-8 border-b border-border">
              <h3 className="font-display text-xl text-light uppercase mb-4">{item.q}</h3>
              <p className="font-body text-light/50 max-w-3xl leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
