import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { CASES } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Кейсы разработки сайтов — Кирилл Ткаченко',
  description:
    'Кейсы разработки сайтов для разных ниш: строительство, производство, психологи и другие направления малого бизнеса.',
  alternates: {
    canonical: '/cases',
  },
}

export default function CasesPage() {
  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Кейсы ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-8">
          Кейсы
          <br />
          <span className="text-accent">по нишам</span>
        </h1>
        <p className="font-body text-lg text-light/60 max-w-3xl leading-relaxed">
          Примеры задач, структуры и решений для сайтов малого бизнеса. Каждый кейс
          связан с услугой и нишей, чтобы можно было быстро перейти к похожему формату.
        </p>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12">
          {CASES.map((item) => (
            <article key={item.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
              <div className="relative min-h-[360px] bg-card">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="bg-bg p-8 lg:p-12">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
                  {item.niche} · {item.service} · {item.year}
                </div>
                <h2 className="font-display text-3xl text-light uppercase mb-8">
                  {item.name}
                </h2>
                <div className="flex flex-col gap-6 font-body text-light/60 leading-relaxed">
                  <p><span className="text-light">Задача:</span> {item.task}</p>
                  <p><span className="text-light">Что сделано:</span> {item.work}</p>
                  <p><span className="text-light">Результат:</span> {item.result}</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link
                    href={`/uslugi/${item.serviceSlug}/${item.nicheSlug}`}
                    className="font-mono text-xs uppercase tracking-widest text-accent hover:text-light transition-colors"
                  >
                    Похожая услуга →
                  </Link>
                  {item.url !== '#' && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-light/40 hover:text-accent transition-colors"
                    >
                      Смотреть проект →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
