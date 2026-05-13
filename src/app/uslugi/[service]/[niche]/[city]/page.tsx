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
  params: Promise<{ service: string; niche: string; city: string }>
}

export async function generateStaticParams() {
  return SERVICES.flatMap((service) =>
    NICHES.flatMap((niche) =>
      CITIES.map((city) => ({
        service: service.slug,
        niche: niche.slug,
        city: city.slug,
      }))
    )
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, niche: nicheSlug, city: citySlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!service || !niche || !city) return {}

  const title = `${service.name} для ${niche.nameShort.toLowerCase()} в ${city.name} — под ключ`
  const description = `${service.nameFull} для ${niche.nameShort.toLowerCase()} в ${city.name}. ${service.description} Срок ${service.time}, стоимость ${service.price}.`

  return {
    title: `${title} — Кирилл Ткаченко`,
    description,
    keywords: [
      `${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} в ${city.nameRod}`,
      `${service.name.toLowerCase()} ${niche.nameShort.toLowerCase()} ${city.nameRod}`,
      `заказать ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} ${city.nameRod}`,
      `${service.name.toLowerCase()} под ключ ${city.nameRod}`,
    ],
    alternates: {
      canonical: `/uslugi/${serviceSlug}/${nicheSlug}/${citySlug}`,
    },
    openGraph: {
      title,
      description,
      locale: 'ru_RU',
      type: 'website',
    },
  }
}

export default async function ServiceNicheCityPage({ params }: Props) {
  const { service: serviceSlug, niche: nicheSlug, city: citySlug } = await params
  const service = SERVICES.find((s) => s.slug === serviceSlug)
  const niche = NICHES.find((n) => n.slug === nicheSlug)
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!service || !niche || !city) notFound()

  const nearbyCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 5)
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)
  const combinedFeatures = [...service.features, ...niche.features]

  const url = `/uslugi/${serviceSlug}/${nicheSlug}/${citySlug}`
  const faqItems = [
    {
      q: `Можно ли сделать ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} в ${city.name} удаленно?`,
      a: 'Да. Все этапы проходят онлайн: бриф, прототип, дизайн, разработка, правки и запуск.',
    },
    {
      q: 'Что нужно подготовить для старта проекта?',
      a: 'Достаточно описать услугу, цены, примеры работ и контакты. Остальную структуру помогу собрать.',
    },
    {
      q: 'Будет ли страница готова к SEO-продвижению?',
      a: 'Да. Сразу закладываются H1, метаданные, структура блоков, быстрые CTA и внутренняя перелинковка.',
    },
  ]
  const priceMatch = service.price.match(/\d[\d\s]*/)
  const priceNum = priceMatch ? priceMatch[0].replace(/\s/g, '') : undefined

  return (
    <main className="bg-bg text-light min-h-screen">
      <JsonLd
        data={getServiceJsonLd({
          name: `${service.name} для ${niche.nameShort.toLowerCase()} в ${city.name}`,
          description: `${service.description} ${niche.pain}`,
          url,
          price: priceNum,
          serviceType: service.name,
          areaServed: city.name,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: service.name, url: `/uslugi/${serviceSlug}` },
          { name: niche.nameShort, url: `/uslugi/${serviceSlug}/${nicheSlug}` },
          { name: city.name, url },
        ])}
      />
      <JsonLd data={getFAQJsonLd(faqItems)} />
      <Nav />

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ {city.nameRod} · {niche.nameShort} · {service.name} ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          {service.name}
          <br />
          для <span className="text-accent">{niche.nameShort.toLowerCase()}</span>
          <br />в {city.name}
        </h1>
        <p className="font-body text-lg text-light/60 max-w-3xl mb-4 leading-relaxed">
          {niche.pain} Для {city.nameRod} собираю страницу с понятным оффером, быстрым
          контактом и SEO-структурой под локальный спрос.
        </p>
        <p className="font-body text-base text-light/40 max-w-3xl mb-12 leading-relaxed">
          {service.description} Работаю удаленно, фиксирую этапы и показываю результат на
          промежуточных версиях.
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

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Локальный спрос ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-8">
          Почему {niche.nameShort.toLowerCase()} в {city.name} нужен отдельный сайт
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg">
          {[
            'Клиенты сравнивают подрядчиков в поиске до первого звонка.',
            'Страница должна отвечать на вопросы о цене, сроках и доверии.',
            'Локальная посадочная помогает собрать спрос из Яндекса и Google.',
          ].map((item, i) => (
            <div key={item} className="bg-bg p-8">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="font-body text-light/70 mt-6 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Что входит ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Состав {service.name.toLowerCase()} для {niche.nameShort.toLowerCase()}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bg">
          {combinedFeatures.map((feature, i) => (
            <div key={feature} className="bg-bg p-8 flex items-center gap-6">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-body text-light">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Примеры работ */}
      <WorksSlider serviceSlug={serviceSlug} />

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ FAQ ]
        </div>
        <h2 className="font-display text-3xl text-light uppercase mb-12">
          Частые вопросы
        </h2>
        <div className="flex flex-col border-t border-border">
          {[
            {
              q: `Можно ли сделать ${service.name.toLowerCase()} для ${niche.nameShort.toLowerCase()} в ${city.name} удаленно?`,
              a: 'Да. Все этапы проходят онлайн: бриф, прототип, дизайн, разработка, правки и запуск.',
            },
            {
              q: 'Что нужно подготовить для старта проекта?',
              a: 'Достаточно описать услугу, цены, примеры работ и контакты. Остальную структуру помогу собрать.',
            },
            {
              q: 'Будет ли страница готова к SEO-продвижению?',
              a: 'Да. Сразу закладываются H1, метаданные, структура блоков, быстрые CTA и внутренняя перелинковка.',
            },
          ].map((item) => (
            <div key={item.q} className="py-8 border-b border-border">
              <h3 className="font-display text-xl text-light uppercase mb-4">{item.q}</h3>
              <p className="font-body text-light/50 max-w-3xl leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-light/40 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
          <span>→</span>
          <Link href={`/uslugi/${serviceSlug}`} className="hover:text-accent transition-colors">
            {service.name}
          </Link>
          <span>→</span>
          <Link href={`/uslugi/${serviceSlug}/${nicheSlug}`} className="hover:text-accent transition-colors">
            {niche.nameShort}
          </Link>
          <span>→</span>
          <span className="text-accent">{city.name}</span>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
              [ Другие города ]
            </div>
            <div className="grid grid-cols-2 gap-2">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/uslugi/${serviceSlug}/${nicheSlug}/${nearbyCity.slug}`}
                  className="font-mono text-sm text-light/50 hover:text-accent transition-colors py-2 border-b border-border hover:border-accent"
                >
                  в {nearbyCity.name} →
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
              [ Смежные услуги ]
            </div>
            <div className="flex flex-col border-t border-border">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/uslugi/${relatedService.slug}/${nicheSlug}/${citySlug}`}
                  className="flex items-center justify-between py-5 border-b border-border hover:text-accent transition-colors"
                >
                  <span className="font-display text-lg uppercase">{relatedService.name}</span>
                  <span className="font-mono text-xs text-light/30">{relatedService.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
