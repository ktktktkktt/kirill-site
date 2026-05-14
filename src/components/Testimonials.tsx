'use client'

import { useEffect, useRef } from 'react'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/testimonials'

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.testimonial-card',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
      className="py-24 px-6 lg:px-12 border-t border-border bg-bg"
    >
      <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            [ Отзывы ]
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight">
            Что говорят
            <br />
            клиенты
          </h2>
        </div>
        <p className="font-mono text-xs text-light/40 max-w-xs leading-relaxed uppercase tracking-wider">
          Реальные отзывы из разных ниш — стройка, авто, медицина, общепит,
          консалтинг.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.name}
            className="testimonial-card bg-bg p-8 flex flex-col gap-6 hover:bg-surface transition-colors duration-500"
          >
            <Quote
              size={28}
              className="text-accent flex-shrink-0"
              strokeWidth={1.5}
            />

            <p className="font-body text-light/75 leading-relaxed text-base flex-1">
              {t.text}
            </p>

            <div className="border-t border-border pt-5 flex flex-col gap-3">
              <div className="font-mono text-[10px] text-accent uppercase tracking-widest">
                {t.result}
              </div>
              <div>
                <div className="font-display text-base text-light uppercase leading-tight">
                  {t.name}
                </div>
                <div className="font-mono text-xs text-light/40 mt-1">
                  {t.role} · {t.company}
                </div>
                <div className="font-mono text-[10px] text-light/25 uppercase tracking-wider mt-1">
                  {t.niche}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-6">
        <p className="font-mono text-xs text-light/55 uppercase tracking-wider leading-relaxed">
          Контакты клиентов даю по запросу — можно связаться и расспросить лично
        </p>
        <a
          href="#contact"
          className="font-mono text-xs uppercase tracking-widest text-accent hover:text-light transition-colors duration-300 whitespace-nowrap"
        >
          Запросить контакты →
        </a>
      </div>
    </section>
  )
}
