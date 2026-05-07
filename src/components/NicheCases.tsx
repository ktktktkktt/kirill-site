'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CASES } from '@/lib/cases'
import { CaseImageScroll } from '@/components/CaseImageScroll'

interface NicheCasesProps {
  nicheSlug: string
  nicheName: string
}

export function NicheCases({ nicheSlug, nicheName }: NicheCasesProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const nicheCases = CASES.filter((c) => c.nicheSlug === nicheSlug).slice(0, 4)

  useEffect(() => {
    const animate = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const isMobile = window.innerWidth < 768
      const items = gridRef.current?.querySelectorAll<HTMLElement>('.case-item')
      if (!items) return

      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isMobile ? 16 : 32 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        )
      })
    }

    animate()
  }, [])

  if (nicheCases.length === 0) {
    return null
  }

  return (
    <section className="py-24 px-6 lg:px-12 border-t border-border">
      <div className="mb-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ Примеры работ ]
        </div>
        <h2 className="font-display text-3xl lg:text-4xl text-light uppercase">
          Кейсы для {nicheName.toLowerCase()}
        </h2>
      </div>

      {/* Mobile: horizontal scroll slider */}
      <div className="md:hidden -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {nicheCases.map((c) => (
            <div key={c.slug} className="case-item group snap-start flex-shrink-0 w-[80vw]">
              <Link
                href={`/cases/${c.slug}`}
                className="block overflow-hidden relative aspect-[4/3] bg-card mb-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
                />
              </Link>
              <div className="font-mono text-xs tracking-widest text-accent uppercase mb-1">
                {c.service} · {c.year}
              </div>
              <Link href={`/cases/${c.slug}`}>
                <h3 className="font-display text-lg text-light uppercase hover:text-accent transition-colors duration-300 leading-tight mb-3">
                  {c.name}
                </h3>
              </Link>
              <Link
                href={`/cases/${c.slug}`}
                className="flex items-center gap-2 font-mono text-xs text-light/40 uppercase tracking-wider hover:text-accent transition-colors duration-300"
              >
                Смотреть кейс
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: grid with scroll-on-hover images */}
      <div ref={gridRef} className="hidden md:grid grid-cols-2 gap-x-8 gap-y-12">
        {nicheCases.map((c) => (
          <div key={c.slug} className="case-item group">
            <Link href={`/cases/${c.slug}`}>
              <CaseImageScroll src={c.image} alt={c.name} className="aspect-[16/10]" />
            </Link>
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-2 mt-4">
              {c.service} · {c.year}
            </div>
            <Link href={`/cases/${c.slug}`}>
              <h3 className="font-display text-xl text-light uppercase hover:text-accent transition-colors duration-300 leading-tight mb-2">
                {c.name}
              </h3>
            </Link>
            <Link
              href={`/cases/${c.slug}`}
              className="flex items-center gap-2 font-mono text-xs text-light/40 uppercase tracking-wider hover:text-accent transition-colors duration-300"
            >
              Смотреть кейс
              <ArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
