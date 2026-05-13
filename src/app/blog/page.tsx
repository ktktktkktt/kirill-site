import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbJsonLd } from '@/lib/seo'
import { ARTICLES } from '@/lib/articles'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Блог о разработке сайтов для малого бизнеса',
  description:
    'Статьи о разработке сайтов, SEO и привлечении клиентов. Сколько стоит сайт, лендинг или многостраничник, как выбрать разработчика.',
  alternates: { canonical: '/blog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const sorted = [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  return (
    <main className="bg-bg text-light min-h-screen overflow-x-hidden">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Блог', url: '/blog' },
        ])}
      />
      <Nav />

      <section className="pt-40 pb-16 px-6 lg:px-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          [ Блог ]
        </div>
        <h1 className="font-display font-black text-4xl lg:text-7xl text-light uppercase leading-tight mb-6">
          Разработка сайтов:
          <br />
          <span className="text-accent">полезно и честно</span>
        </h1>
        <p className="font-body text-lg text-light/60 max-w-2xl leading-relaxed">
          Статьи о том, как устроена разработка, сколько стоит и как не выбросить деньги.
          Без воды — только то, что поможет принять правильное решение.
        </p>
      </section>

      <section className="px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {sorted.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-bg p-8 flex flex-col gap-4 hover:bg-surface transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest border border-accent/30 px-2 py-1">
                  {article.category}
                </span>
                <span className="font-mono text-[10px] text-light/30 uppercase tracking-widest">
                  {article.readingTime} мин
                </span>
              </div>

              <h2 className="font-display text-xl lg:text-2xl text-light uppercase leading-tight group-hover:text-accent transition-colors duration-300">
                {article.title}
              </h2>

              <p className="font-body text-light/60 leading-relaxed text-sm flex-1">
                {article.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-[10px] text-light/30">
                  {formatDate(article.updatedAt || article.publishedAt)}
                </span>
                <span className="font-mono text-xs text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Читать <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterCTA />
    </main>
  )
}
