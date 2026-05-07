import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CASES } from '@/lib/cases'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { CaseImageScroll } from '@/components/CaseImageScroll'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = CASES.find((c) => c.slug === slug)
  if (!item) return {}

  return {
    title: `${item.name} — Кейс · Кирилл Ткаченко`,
    description: `${item.service} для ${item.niche.toLowerCase()}. Задача: ${item.task} Результат: ${item.result}`,
    openGraph: {
      title: item.name,
      images: [{ url: item.image }],
      locale: 'ru_RU',
      type: 'article',
    },
  }
}

export default async function CaseSlugPage({ params }: Props) {
  const { slug } = await params
  const item = CASES.find((c) => c.slug === slug)
  if (!item) notFound()

  const related = CASES.filter(
    (c) => c.slug !== slug && c.serviceSlug === item.serviceSlug
  ).slice(0, 3)

  return (
    <main className="bg-bg text-light min-h-screen">
      <Nav />

      {/* Hero image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] bg-card overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority
          className="object-cover object-top grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      {/* Meta row */}
      <section className="px-6 lg:px-12 pt-12 pb-8 border-b border-border">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-6 items-center">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest border border-accent/40 px-3 py-1.5">
              {item.service}
            </span>
            <span className="font-mono text-xs text-light/40 uppercase tracking-wider">
              {item.niche}
            </span>
            <span className="font-mono text-xs text-light/25">{item.year}</span>
          </div>
          {item.url !== '#' && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-light/40 hover:text-accent transition-colors uppercase tracking-wider"
            >
              Открыть сайт
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </section>

      {/* Title */}
      <section className="px-6 lg:px-12 py-16 border-b border-border">
        <h1 className="font-display font-black text-4xl lg:text-6xl text-light uppercase leading-tight max-w-4xl">
          {item.name}
        </h1>
      </section>

      {/* Task / Work / Result */}
      <section className="px-6 lg:px-12 py-16 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg">
          <div className="bg-bg p-8 md:p-10">
            <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-6">
              Задача
            </div>
            <p className="font-body text-light/70 leading-relaxed">{item.task}</p>
          </div>
          <div className="bg-bg p-8 md:p-10">
            <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-6">
              Что сделано
            </div>
            <p className="font-body text-light/70 leading-relaxed">{item.work}</p>
          </div>
          <div className="bg-bg p-8 md:p-10">
            <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-6">
              Результат
            </div>
            <p className="font-body text-light/70 leading-relaxed">{item.result}</p>
          </div>
        </div>
      </section>

      {/* Full-size preview */}
      <section className="px-6 lg:px-12 py-16 border-b border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
          [ Полный экран ]
        </div>
        <div className="max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Related cases */}
      {related.length > 0 && (
        <section className="px-6 lg:px-12 py-24 border-b border-border">
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8">
            [ Похожие работы ]
          </div>
          <h2 className="font-display text-3xl text-light uppercase mb-12">
            Ещё по теме
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group bg-bg hover:bg-surface transition-colors duration-300 block"
              >
                <CaseImageScroll src={c.image} alt={c.name} className="aspect-[16/9]" />
                <div className="p-6">
                  <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">
                    {c.niche} · {c.year}
                  </div>
                  <h3 className="font-display text-lg text-light uppercase group-hover:text-accent transition-colors duration-300">
                    {c.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="px-6 lg:px-12 py-12 border-b border-border">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <Link
            href="/cases"
            className="flex items-center gap-3 font-mono text-xs text-light/40 hover:text-accent transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={12} />
            Все кейсы
          </Link>
          <Link
            href={`/uslugi/${item.serviceSlug}/${item.nicheSlug}`}
            className="flex items-center gap-3 font-mono text-xs text-light/40 hover:text-accent transition-colors uppercase tracking-wider"
          >
            Похожая услуга
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
