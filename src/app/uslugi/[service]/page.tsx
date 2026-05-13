import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { NICHES } from '@/lib/niches'
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
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  if (!service) return {}

  return {
    title: `${service.nameFull} под ключ за ${service.time} — Кирилл Ткаченко`,
    description: `${service.description} Срок ${service.time}, цена ${service.price}. Разработка для малого бизнеса по всей России.`,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} под ключ`,
      `заказать ${service.name.toLowerCase()}`,
      `разработка ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} для бизнеса`,
    ],
    alternates: {
      canonical: `/uslugi/${serviceSlug}`,
    },
    openGraph: {
      title: `${service.nameFull} под ключ за ${service.time}`,
      description: service.description,
      type: 'website',
      locale: 'ru_RU',
      url: `/uslugi/${serviceSlug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceSlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  if (!service) notFound()

  const faqItems = [
    {
      q: `Сколько стоит ${service.name.toLowerCase()}?`,
      a: `Базовый ориентир — ${service.price}. Финальная оценка зависит от структуры, контента, интеграций и количества правок.`,
    },
    {
      q: `За какой срок можно запустить ${service.name.toLowerCase()}?`,
      a: `Ориентир по сроку — ${service.time}. Если материалы готовы заранее, запуск проходит быстрее.`,
    },
    {
      q: 'Можно ли сразу заложить SEO?',
      a: 'Да. Структура, метаданные, заголовки, перелинковка и посадочные под ниши закладываются на этапе проектирования.',
    },
  ]

  const priceMatch = service.price.match(/\d[\d\s]*/)
  const priceNum = priceMatch ? priceMatch[0].replace(/\s/g, '') : undefined

  return (
    <main className="bg-bg text-light min-h-screen">
      <JsonLd
        data={getServiceJsonLd({
          name: service.nameFull,
          description: service.description,
          url: `/uslugi/${serviceSlug}`,
          price: priceNum,
          serviceType: service.name,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: service.name, url: `/uslugi/${serviceSlug}` },
        ])}
      />
      <JsonLd data={getFAQJsonLd(faqItems)} />
      <Nav />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Услуга ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          <span className="text-accent">{service.name}</span>
          <br />
          под ключ
        </h1>
        <p className="font-body text-lg text-light/60 max-w-2xl mb-4 leading-relaxed">
          {service.description}
        </p>
        <p className="font-body text-base text-light/40 max-w-2xl mb-12 leading-relaxed">
          {service.pain}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-accent text-bg font-mono text-sm uppercase tracking-widest py-4 px-8 hover:bg-light transition-colors duration-300"
          >
            Обсудить проект →
          </a>
          <div className="flex flex-col justify-center sm:pl-4">
            <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider mb-1">Срок</span>
            <span className="font-mono text-sm text-light">{service.time}</span>
          </div>
          <div className="flex flex-col justify-center sm:pl-4">
            <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider mb-1">Стоимость</span>
            <span className="font-mono text-sm text-accent">{service.price}</span>
          </div>
        </div>
      </section>

      {/* Что входит */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Что входит ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Состав работ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg">
          {service.features.map((feature, i) => (
            <div key={i} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* По нишам — SEO внутренняя перелинковка */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ По нишам ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-4">
          {service.name} для вашей сферы
        </h2>
        <p className="font-body text-light/40 mb-12">
          Выберите свою нишу — покажу конкретные примеры и объясню специфику.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bg">
          {NICHES.map((niche) => (
            <Link
              key={niche.slug}
              href={`/uslugi/${serviceSlug}/${niche.slug}`}
              className="bg-bg p-6 flex flex-col justify-between group hover:bg-surface transition-colors duration-300 min-h-[120px]"
            >
              <span className="font-display text-base text-light uppercase group-hover:text-accent transition-colors duration-300 mb-3">
                {service.name} для {niche.nameShort.toLowerCase()}
              </span>
              <span className="font-mono text-[10px] text-light/20 group-hover:text-accent transition-colors duration-300 uppercase tracking-wider">
                Подробнее →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Процесс */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Как работаем ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          От идеи до запуска
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-bg">
          {[
            'Разбираю задачу, аудиторию и текущие точки входа клиентов.',
            'Собираю структуру страницы и SEO-логику под поисковый спрос.',
            'Делаю дизайн и разработку с адаптацией под мобильные.',
            'Запускаю сайт, проверяю формы, скорость и базовую индексацию.',
          ].map((step, i) => (
            <div key={step} className="bg-bg p-8 min-h-[180px]">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-body text-light/60 mt-8 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Примеры работ */}
      <WorksSlider serviceSlug={serviceSlug} />

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ FAQ ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Частые вопросы про {service.name.toLowerCase()}
        </h2>
        <div className="flex flex-col border-t border-border">
          {[
            {
              q: `Сколько стоит ${service.name.toLowerCase()}?`,
              a: `Базовый ориентир — ${service.price}. Финальная оценка зависит от структуры, контента, интеграций и количества правок.`,
            },
            {
              q: `За какой срок можно запустить ${service.name.toLowerCase()}?`,
              a: `Ориентир по сроку — ${service.time}. Если материалы готовы заранее, запуск проходит быстрее.`,
            },
            {
              q: 'Можно ли сразу заложить SEO?',
              a: 'Да. Структура, метаданные, заголовки, перелинковка и посадочные под ниши закладываются на этапе проектирования.',
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
