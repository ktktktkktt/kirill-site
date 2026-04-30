'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CASES } from '@/lib/cases'

interface WorksSliderProps {
  serviceSlug: string
}

export function WorksSlider({ serviceSlug }: WorksSliderProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const items = CASES.filter((c) => c.serviceSlug === serviceSlug)

  useEffect(() => {
    if (!items.length || !gridRef.current) return

    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const cards = gridRef.current!.querySelectorAll<HTMLElement>('.works-card')
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }, gridRef)

      return () => ctx.revert()
    }

    const cleanup = init()
    return () => { cleanup.then((fn) => fn?.()) }
  }, [items.length])

  if (!items.length) return null

  return (
    <section className="py-24 px-6 lg:px-12 border-t border-border bg-bg">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            [ Примеры работ ]
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-light uppercase leading-tight">
            Что уже сделано
          </h2>
        </div>
        <Link
          href="/cases"
          className="flex-shrink-0 font-mono text-xs text-light/30 hover:text-accent transition-colors uppercase tracking-widest"
        >
          Все кейсы →
        </Link>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-bg"
      >
        {items.map((c, i) => (
          <Link
            key={c.slug}
            href={`/cases/${c.slug}`}
            className="works-card group bg-bg block relative overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-card">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-4 font-display text-7xl font-black text-white/5 leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-bg group-hover:bg-surface transition-colors duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                  {c.service}
                </span>
                <span className="font-mono text-[10px] text-light/25">{c.year}</span>
              </div>
              <h3 className="font-display text-base lg:text-lg text-light uppercase leading-tight mb-1 group-hover:text-accent transition-colors duration-300">
                {c.name}
              </h3>
              <p className="font-mono text-[10px] text-light/30 uppercase tracking-wider mb-5">
                {c.niche}
              </p>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-light/30 group-hover:text-accent transition-colors duration-300 uppercase tracking-wider">
                Смотреть кейс
                <ArrowUpRight
                  size={10}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
