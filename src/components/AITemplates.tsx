'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// TODO: замени на реальные скриншоты ИИ-шаблонов под каждую нишу
const TEMPLATES = [
  {
    title: 'СТРОИТЕЛЬНАЯ КОМПАНИЯ',
    desc: 'Портфолио объектов, калькулятор сметы, форма заявки',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    num: '01',
  },
  {
    title: 'АВТОСЕРВИС',
    desc: 'Онлайн-запись на ТО, прайс услуг, отзывы клиентов',
    img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=800',
    num: '02',
  },
  {
    title: 'ДИЗАЙН ИНТЕРЬЕРОВ',
    desc: 'Галерея проектов, квиз стиля, форма консультации',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    num: '03',
  },
  {
    title: 'РЕСТОРАН / КАФЕ',
    desc: 'Меню, онлайн-бронирование, спецпредложения',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    num: '04',
  },
]

export function AITemplates() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        if (!sectionRef.current || !wrapperRef.current) return

        const getScrollAmount = () => {
          const wrapperWidth = wrapperRef.current?.scrollWidth || 0
          return -(wrapperWidth - window.innerWidth)
        }

        const tween = gsap.to(wrapperRef.current, {
          x: getScrollAmount,
          ease: 'none',
        })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        })
      }, sectionRef)

      return () => ctx.revert()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="h-screen bg-surface overflow-hidden flex flex-col justify-center relative"
    >
      <div className="absolute top-12 left-6 lg:left-12 z-10">
        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
          [ 05 — ИИ-шаблоны ]
        </div>
        <h2 className="font-display text-2xl lg:text-4xl text-light uppercase">
          Примеры для ниш
        </h2>
        <p className="font-mono text-sm text-light/50 mt-2">
          Посмотри, как может выглядеть сайт твоего бизнеса
        </p>
      </div>

      <div ref={wrapperRef} className="flex gap-12 px-6 lg:px-12 w-max items-center h-full pt-20">
        {TEMPLATES.map((tpl, i) => (
          <div
            key={i}
            className="w-[80vw] md:w-[50vw] lg:w-[35vw] aspect-[4/3] bg-bg border border-border p-8 flex flex-col justify-between relative group"
          >
            <div className="absolute top-8 right-8 font-display text-4xl text-card font-bold group-hover:text-accent/20 transition-colors z-10">
              {tpl.num}
            </div>

            <div className="w-full h-[60%] mb-8 overflow-hidden relative border border-border">
              <Image
                src={tpl.img}
                alt={tpl.title}
                fill
                className="object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="z-10">
              <h3 className="font-display text-xl text-light uppercase mb-2 group-hover:text-accent transition-colors">
                {tpl.title}
              </h3>
              <p className="font-mono text-sm text-light/50">{tpl.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
