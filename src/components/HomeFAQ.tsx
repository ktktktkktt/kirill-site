'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Сколько стоит разработка сайта?',
    a: 'Лендинг — от 30 000 ₽, корпоративный сайт — от 60 000 ₽, интернет-магазин — от 80 000 ₽. Итоговую цену фиксирую в договоре до старта — никаких доплат по ходу работы.',
  },
  {
    q: 'За какой срок готов сайт?',
    a: 'Лендинг — 5 дней, корпоративный сайт — 10 дней, интернет-магазин — 14 дней. Срок считается от заполненного брифа. Если материалы готовы заранее — быстрее.',
  },
  {
    q: 'Закладывается ли SEO с первого дня?',
    a: 'Да. Title, Description, H1–H3, структура и перелинковка оптимизируются сразу. Проектирую посадочные под нишевые и локальные запросы — органический трафик без рекламного бюджета.',
  },
  {
    q: 'Как проходит работа удалённо?',
    a: 'Бриф → прототип → дизайн → разработка → запуск. Все согласования в мессенджере. Промежуточные версии показываю на каждом этапе — вы всегда видите прогресс.',
  },
  {
    q: 'Что нужно подготовить для старта?',
    a: 'Описание услуги, примерные цены и контакты. Тексты, структуру и SEO-логику готовлю сам — вам нужно только согласовать. Фото и примеры работ ускорят процесс.',
  },
  {
    q: 'Можно ли заказать только часть работ?',
    a: 'Да. Только дизайн, только разработка по готовому макету, редизайн существующего сайта или отдельный блок — любой формат работы доступен.',
  },
  {
    q: 'Будет ли сайт адаптирован под мобильные?',
    a: 'Всегда. Мобильная версия проектируется отдельно, а не просто уменьшается. Проверяю на реальных устройствах перед запуском.',
  },
  {
    q: 'Что происходит после запуска сайта?',
    a: 'Передаю доступы, инструкцию по редактированию и базовые рекомендации по продвижению. Мелкие правки в первый месяц — бесплатно.',
  },
]

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.faq-item',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    }

    const cleanup = init()
    return () => { cleanup.then((fn) => fn?.()) }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 border-t border-border bg-bg">
      <div className="mb-12">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ FAQ ]
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight">
          Частые
          <br />
          вопросы
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        {[FAQS.slice(0, 4), FAQS.slice(4)].map((col, colIdx) => (
          <div key={colIdx}>
            {col.map((item, i) => {
              const idx = colIdx * 4 + i
              return (
                <div key={idx} className="faq-item border-t border-border last:border-b">
                  <button
                    onClick={() => setOpen(open === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                  >
                    <span className="font-display text-base lg:text-lg text-light uppercase group-hover:text-accent transition-colors duration-300 leading-snug">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 text-accent">
                      {open === idx ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      open === idx ? 'max-h-96 pb-7' : 'max-h-0'
                    }`}
                  >
                    <p className="font-body text-light/55 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
