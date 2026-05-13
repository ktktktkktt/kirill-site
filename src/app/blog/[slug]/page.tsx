import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { FooterCTA } from '@/components/FooterCTA'
import { JsonLd } from '@/components/JsonLd'
import { getBreadcrumbJsonLd, getArticleJsonLd, SITE_URL } from '@/lib/seo'
import { ARTICLES, getArticle, type Block } from '@/lib/articles'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url: `${SITE_URL}/blog/${article.slug}`,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display text-2xl lg:text-3xl text-light uppercase leading-tight mt-10 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-display text-xl text-light uppercase leading-tight mt-6 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p className="font-body text-light/70 leading-relaxed">{block.text}</p>
      )
    case 'ul':
      return (
        <ul className="space-y-2 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="font-body text-light/70 leading-relaxed flex gap-3">
              <span className="text-accent mt-1 flex-shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="space-y-3 my-2">
          {block.items.map((item, i) => (
            <li key={i} className="font-body text-light/70 leading-relaxed flex gap-3">
              <span className="font-mono text-accent text-sm flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'cta':
      return (
        <div className="my-10 border border-border bg-surface/40 p-6 lg:p-8">
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            [ Нужен сайт? ]
          </div>
          <h3 className="font-display text-2xl text-light uppercase leading-tight mb-6">
            Обсудим ваш проект
          </h3>
          <LeadForm source="blog" compact />
        </div>
      )
    default:
      return null
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  ).slice(0, 2)

  const otherArticles = relatedArticles.length < 2
    ? [
        ...relatedArticles,
        ...ARTICLES.filter(
          (a) => a.slug !== article.slug && !relatedArticles.includes(a),
        ).slice(0, 2 - relatedArticles.length),
      ]
    : relatedArticles

  return (
    <main className="bg-bg text-light min-h-screen overflow-x-hidden">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Главная', url: '/' },
          { name: 'Блог', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ])}
      />
      <JsonLd
        data={getArticleJsonLd({
          headline: article.title,
          description: article.description,
          url: `/blog/${article.slug}`,
          image: '/og.png',
          datePublished: article.publishedAt,
        })}
      />
      <Nav />

      <article className="max-w-3xl mx-auto px-6 lg:px-12 pt-32 pb-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-light/40 hover:text-accent transition-colors mb-10 uppercase tracking-widest"
        >
          <ArrowLeft size={12} />
          Все статьи
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest border border-accent/30 px-2 py-1">
            {article.category}
          </span>
          <span className="font-mono text-[10px] text-light/30 uppercase tracking-widest flex items-center gap-1">
            <Clock size={10} />
            {article.readingTime} мин
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-3xl lg:text-5xl text-light uppercase leading-tight mb-4">
          {article.title}
        </h1>

        <p className="font-mono text-xs text-light/30 mb-10">
          {formatDate(article.publishedAt)}
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <> · обновлено {formatDate(article.updatedAt)}</>
          )}
        </p>

        {/* Content */}
        <div className="space-y-5">
          {article.blocks.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </div>
      </article>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 lg:px-12 pb-24">
          <div className="border-t border-border pt-12">
            <div className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
              [ Читайте также ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {otherArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group bg-bg p-6 flex flex-col gap-3 hover:bg-surface transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                    {a.category} · {a.readingTime} мин
                  </span>
                  <h3 className="font-display text-lg text-light uppercase leading-tight group-hover:text-accent transition-colors duration-300">
                    {a.title}
                  </h3>
                  <span className="font-mono text-xs text-accent flex items-center gap-1 group-hover:gap-2 transition-all duration-300 mt-auto">
                    Читать <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterCTA />
    </main>
  )
}
