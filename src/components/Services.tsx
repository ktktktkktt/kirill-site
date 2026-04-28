'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const SERVICES = [
  { num: '01', name: 'ЛЕНДИНГ ПОД КЛЮЧ',    price: 'от 30 000 ₽',  time: '5 дней'  },
  { num: '02', name: 'КОРПОРАТИВНЫЙ САЙТ',  price: 'от 60 000 ₽',  time: '10 дней' },
  { num: '03', name: 'САЙТ С ИИ-ШАБЛОНОМ', price: 'от 40 000 ₽',  time: '7 дней'  },
  { num: '04', name: 'ИНТЕРНЕТ-МАГАЗИН',    price: 'от 80 000 ₽',  time: '14 дней' },
  { num: '05', name: 'РЕДИЗАЙН САЙТА',      price: 'от 35 000 ₽',  time: '7 дней'  },
  { num: '06', name: 'УПАКОВКА ПОД КЛЮЧ',   price: 'от 110 000 ₽', time: '21 день' },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const rows = containerRef.current?.querySelectorAll('.service-row')
        if (!rows) return

        gsap.fromTo(
          rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }, containerRef)

      return () => ctx.revert()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section id="услуги" ref={containerRef} className="py-24 px-6 lg:px-12 bg-bg">
      <div className="mb-16">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ 02 — Услуги ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase">
          Прайс-лист
          <br />
          агентства
        </h2>
      </div>

      <div className="flex flex-col border-t border-border">
        {SERVICES.map((srv, i) => (
          <div
            key={i}
            className="service-row group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border hover:bg-surface transition-colors duration-500 cursor-pointer px-4 -mx-4"
          >
            <div className="flex items-center gap-8 mb-4 md:mb-0 w-full md:w-1/2">
              <span className="font-mono text-sm text-light/30 w-8">{srv.num}</span>
              <h3 className="font-display text-xl lg:text-3xl text-light uppercase group-hover:text-accent transition-colors duration-300">
                {srv.name}
              </h3>
            </div>

            <div className="flex items-center gap-12 w-full md:w-1/2 justify-between md:justify-end">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-light/40 uppercase mb-1">Срок</span>
                <span className="font-mono text-sm text-light">{srv.time}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-mono text-[10px] text-light/40 uppercase mb-1">
                  Инвестиции
                </span>
                <span className="font-mono text-sm text-light">{srv.price}</span>
              </div>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-bg transition-all duration-300">
                <ArrowRight
                  size={20}
                  className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
