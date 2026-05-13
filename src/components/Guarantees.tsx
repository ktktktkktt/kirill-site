'use client'

import { useEffect, useRef } from 'react'
import { FileText, Calendar, RefreshCw, Receipt } from 'lucide-react'

const ITEMS = [
  {
    icon: FileText,
    title: 'Договор и фикс цены',
    text: 'Стоимость и состав работ фиксируются до старта. Никаких «доплати ещё 30%» по ходу проекта.',
  },
  {
    icon: Calendar,
    title: 'Дедлайн без сдвигов',
    text: 'Сроки прописаны в договоре. Если задерживаюсь по своей вине — компенсирую процентом от стоимости.',
  },
  {
    icon: RefreshCw,
    title: 'Правки бесплатно',
    text: 'Мелкие правки в первый месяц после запуска не тарифицируются. Спокойно тестируешь сайт на боевом трафике.',
  },
  {
    icon: Receipt,
    title: 'Самозанятый — закрывающие',
    text: 'Работаю официально, чек НПД на каждую оплату. Подходит для ИП и юрлиц с учётом расходов.',
  },
]

export function Guarantees() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.guarantee-item',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              once: true,
            },
          },
        )
      }, ref)

      return () => ctx.revert()
    }

    const cleanup = init()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section
      ref={ref}
      className="py-24 px-6 lg:px-12 border-t border-border bg-bg"
    >
      <div className="mb-16">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ Гарантии ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight">
          Что я
          <br />
          гарантирую
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="guarantee-item bg-bg p-8 flex flex-col gap-5 hover:bg-surface transition-colors duration-500"
            >
              <Icon
                size={28}
                className="text-accent flex-shrink-0"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl text-light uppercase leading-tight">
                {item.title}
              </h3>
              <p className="font-body text-light/60 leading-relaxed">
                {item.text}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
