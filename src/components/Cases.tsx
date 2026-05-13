'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CASES } from '@/lib/cases'
import { CaseImageScroll } from '@/components/CaseImageScroll'

const SHOWN = 8

export function Cases() {
  const gridRef = useRef<HTMLDivElement>(null)

  const shownCases = CASES.slice(0, SHOWN)

  useEffect(() => {
    const animate = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Skip stagger animation on mobile — use simple fade per item instead
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

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 bg-bg">
      <div className="mb-12 md:mb-16">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ Кейсы ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase">
          Витрина
          <br />
          работ
        </h2>
      </div>

      {/* Mobile: horizontal scroll slider */}
      <div className="md:hidden -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
          {shownCases.map((c) => (
            <div
              key={c.slug}
              className="case-item group snap-start flex-shrink-0 w-[80vw]"
            >
              <Link href={`/cases/${c.slug}`} className="block overflow-hidden relative aspect-[4/3] bg-card mb-4">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
                />
              </Link>
              <div className="font-mono text-xs tracking-widest text-accent uppercase mb-1">
                {c.niche} · {c.year}
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

      {/* Desktop: grid */}
      <div ref={gridRef} className="hidden md:grid grid-cols-2 gap-x-8 gap-y-16">
        {shownCases.map((c) => (
          <div key={c.slug} className="case-item group">
            <Link href={`/cases/${c.slug}`}>
              <CaseImageScroll src={c.image} alt={c.name} className="aspect-[16/10]" />
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 pb-12 border-b border-border">
              <div className="flex flex-col gap-1">
                <div className="font-mono text-xs tracking-widest text-accent uppercase">
                  {c.niche} · {c.year}
                </div>
                <Link href={`/cases/${c.slug}`}>
                  <h3 className="font-display text-2xl lg:text-3xl text-light uppercase hover:text-accent transition-colors duration-300 leading-tight">
                    {c.name}
                  </h3>
                </Link>
              </div>
              <Link
                href={`/cases/${c.slug}`}
                className="flex items-center gap-3 font-mono text-xs text-light/40 uppercase tracking-wider hover:text-accent transition-colors duration-300 flex-shrink-0"
              >
                Смотреть кейс
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 md:mt-16">
        <Link
          href="/cases"
          className="font-mono text-sm uppercase tracking-widest border border-border px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          Все кейсы →
        </Link>
      </div>
    </section>
  )
}
