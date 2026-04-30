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

        if (lines && window.innerWidth >= 1024) {
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
    <section ref={containerRef} className="py-16 md:py-24 px-6 lg:px-12 bg-bg overflow-hidden">
      <div className="mb-12 md:mb-20">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ 06 — Процесс ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase">Процесс работы</h2>
      </div>

      <div className="relative">
        {/* Connecting line — desktop only */}
        <div className="process-line absolute top-8 left-0 w-full h-[1px] bg-border hidden lg:block" />
        <div
          className="process-line absolute top-8 left-0 w-full h-[1px] bg-accent/20 hidden lg:block"
          style={{ transformOrigin: 'left' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-8 relative z-10">
          {STEPS.map((step, i) => (
            <div key={i} className="process-step flex lg:flex-col relative">
              {/* Vertical connector line between steps — mobile only */}
              {i !== STEPS.length - 1 && (
                <div className="absolute left-8 top-16 w-[1px] bottom-0 bg-border lg:hidden" />
              )}

              {/* Step circle */}
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center font-mono text-xl text-accent shrink-0 z-10 hover:border-accent hover:bg-accent hover:text-bg transition-all">
                {step.num}
              </div>

              {/* Content */}
              <div className="pl-8 pb-10 lg:pl-0 lg:pb-0 lg:mt-8 flex-1">
                {/* Day badge — shown inline on mobile */}
                <div className="font-mono text-[10px] text-accent/60 uppercase tracking-widest mb-2 lg:hidden">
                  {step.day}
                </div>
                <h3 className="font-display text-lg text-light uppercase mb-3 lg:h-12">
                  {step.name}
                </h3>
                <p className="font-mono text-xs text-light/50 leading-relaxed max-w-[250px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline row — desktop only */}
        <div className="hidden lg:flex mt-16 pt-8 border-t border-border justify-between gap-4 font-mono text-sm text-light/40 uppercase tracking-widest process-step">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className={i === STEPS.length - 1 ? 'text-accent' : ''}>{step.day}</span>
              {i !== STEPS.length - 1 && <span className="text-border">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
