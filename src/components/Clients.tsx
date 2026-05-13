'use client'

import { useEffect, useRef } from 'react'
import { CLIENTS } from '@/lib/testimonials'

export function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.client-item',
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          },
        )
      }, sectionRef)

      return () => ctx.revert()
    }

    const cleanup = init()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 lg:px-12 border-t border-border bg-bg"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            [ Клиенты ]
          </div>
          <h2 className="font-display text-2xl lg:text-3xl text-light uppercase leading-tight">
            С кем
            <br />
            работал
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          {CLIENTS.map((c) => (
            <div
              key={c.name}
              className="client-item bg-bg px-5 py-6 flex flex-col gap-1 items-start justify-center min-h-[88px] hover:bg-surface transition-colors duration-300"
            >
              <span className="font-display text-base text-light uppercase leading-tight">
                {c.name}
              </span>
              <span className="font-mono text-[10px] text-light/30 uppercase tracking-wider">
                {c.niche}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
