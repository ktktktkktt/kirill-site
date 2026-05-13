import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbJsonLd, getPersonJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Обо мне — Кирилл Ткаченко, разработка сайтов под ключ',
  description:
    'Кирилл Ткаченко: разработка сайтов для малого бизнеса, SEO-структура, дизайн, запуск и упаковка под ключ.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <main className="bg-bg text-light min-h-screen">
      <JsonLd data={getPersonJsonLd()} />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Обо мне', url: '/about' },
        ])}
      />
      <Nav />

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Обо мне ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          Кирилл
          <br />
          <span className="text-accent">Ткаченко</span>
        </h1>
        <p className="font-body text-lg text-light/60 max-w-3xl leading-relaxed">
          Проектирую и разрабатываю сайты для малого и среднего бизнеса: от лендингов
          до многостраничных SEO-структур под услуги, ниши и города.
        </p>
      </section>

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <h2 className="font-display text-3xl text-light uppercase mb-8">
          Подход к работе
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg">
          {[
            'Сначала разбираю бизнес, спрос и сценарии клиента.',
            'Затем собираю структуру, где каждый блок ведет к заявке.',
            'После запуска оставляю основу для SEO-роста и расширения страниц.',
          ].map((item, i) => (
            <div key={item} className="bg-bg p-8">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="font-body text-light/60 mt-8 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 border-t border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Чем полезен ]
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <h2 className="font-display text-3xl text-light uppercase">
            Делаю сайт не ради картинки, а ради заявок и доверия
          </h2>
          <p className="font-body text-light/60 leading-relaxed">
            В проекте соединяю упаковку, дизайн, разработку и базовое SEO. Поэтому
            сайт сразу получает понятную структуру, быстрые CTA, внутреннюю
            перелинковку и страницы, которые можно развивать дальше.
          </p>
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
