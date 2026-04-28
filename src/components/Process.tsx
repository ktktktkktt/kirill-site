'use client'

import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    name: 'БРИФ & КОНЦЕПТ',
    desc: 'Анализ ниши, сбор референсов, создание структуры сайта.',
    day: 'День 1',
  },
  {
    num: '02',
    name: 'ПРОТОТИП',
    desc: 'Проектирование страниц, написание текстов, утверждение логики.',
    day: 'День 3',
  },
  {
    num: '03',
    name: 'ДИЗАЙН & КОД',
    desc: 'Сборка в коде с GSAP-анимациями, адаптив, SEO-оптимизация.',
    day: 'День 5',
  },
  {
    num: '04',
    name: 'РЕЛИЗ',
    desc: 'Тестирование, подключение домена, передача проекта и инструктаж.',
    day: 'День 7',
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const steps = containerRef.current?.querySelectorAll('.process-step')
        const lines = containerRef.current?.querySelectorAll('.process-line')

        if (steps) {
          gsap.fromTo(
            steps,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                once: true,
              },
            }
          )
        }

        if (lines) {
          gsap.fromTo(
            lines,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                once: true,
              },
            }
          )
        }
      }, containerRef)

      return () => ctx.revert()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section ref={containerRef} className="py-24 px-6 lg:px-12 bg-bg overflow-hidden">
      <div className="mb-20">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ 06 — Процесс ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase">Процесс работы</h2>
      </div>

      <div className="relative">
        {/* Connecting lines */}
        <div className="process-line absolute top-8 left-0 w-full h-[1px] bg-border hidden lg:block" />
        <div
          className="process-line absolute top-8 left-0 w-full h-[1px] bg-accent/20 hidden lg:block"
          style={{ transformOrigin: 'left' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {STEPS.map((step, i) => (
            <div key={i} className="process-step flex flex-col relative">
              {i !== STEPS.length - 1 && (
                <div className="absolute left-8 top-16 w-[1px] h-full bg-border lg:hidden" />
              )}

              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center font-mono text-xl text-accent mb-8 z-10 shrink-0 relative hover:border-accent hover:bg-accent hover:text-bg transition-all">
                {step.num}
              </div>

              <div className="flex-grow pl-20 lg:pl-0 -mt-20 lg:mt-0 pt-20 lg:pt-0">
                <h3 className="font-display text-lg text-light uppercase mb-4 h-auto lg:h-12">
                  {step.name}
                </h3>
                <p className="font-mono text-xs text-light/50 mb-8 leading-relaxed max-w-[250px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col lg:flex-row justify-between gap-4 font-mono text-sm text-light/40 uppercase tracking-widest process-step">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className={i === STEPS.length - 1 ? 'text-accent' : ''}>{step.day}</span>
              {i !== STEPS.length - 1 && <span className="hidden lg:inline text-border">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
