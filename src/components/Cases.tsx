'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

// TODO: замени на свои реальные кейсы и скриншоты
const CASES = [
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    tag: 'Строительная компания',
    name: 'ЦКТ РОСТОВ',
    year: '2023',
    url: 'https://stroyinvest39.ru',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
    tag: 'Производство оборудования',
    name: 'СЗГП',
    year: '2023',
    url: '#',
  },
]

export function Cases() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const caseItems = containerRef.current?.querySelectorAll('.case-item')
        if (!caseItems) return

        caseItems.forEach((el) => {
          const img = el.querySelector('.case-img-inner')
          if (!img) return

          gsap.fromTo(
            img,
            { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
            {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                once: true,
              },
            }
          )
        })
      }, containerRef)

      return () => ctx.revert()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section id="кейсы" ref={containerRef} className="py-24 px-6 lg:px-12 bg-bg">
      <div className="mb-16">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ 04 — Кейсы ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase">
          Витрина
          <br />
          работ
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {CASES.map((c, i) => (
          <div key={i} className="case-item flex flex-col group">
            <div className="w-full h-[50vh] md:h-[70vh] mb-8 overflow-hidden bg-card relative">
              <div className="case-img-inner absolute inset-0">
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-mono text-xs tracking-widest text-accent uppercase">
                  {c.tag} · {c.year}
                </div>
                <h3 className="font-display text-3xl lg:text-5xl text-light uppercase">{c.name}</h3>
              </div>

              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 font-mono text-sm text-light uppercase tracking-wider group-hover:text-accent transition-colors duration-300"
              >
                Смотреть проект{' '}
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-24">
        <a
          href="#"
          className="font-mono text-sm uppercase tracking-widest border border-border px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          Все кейсы →
        </a>
      </div>
    </section>
  )
}
