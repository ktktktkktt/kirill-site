'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

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
    // Only init horizontal scroll GSAP on desktop
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        if (!sectionRef.current || !wrapperRef.current) return

        const getScrollAmount = () => {
          const wrapperWidth = wrapperRef.current?.scrollWidth || 0
          return Math.max(0, wrapperWidth - window.innerWidth)
        }

        const tween = gsap.to(wrapperRef.current, {
          x: () => -getScrollAmount(),
          ease: 'none',
        })

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        })

        const refresh = () => ScrollTrigger.refresh()
        requestAnimationFrame(refresh)
        window.addEventListener('load', refresh)

        return () => {
          window.removeEventListener('load', refresh)
          trigger.kill()
        }
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
      className="bg-surface overflow-hidden relative z-10"
    >
      <div className="py-12 md:py-0 md:min-h-screen md:flex md:flex-col md:justify-center">
        <div className="px-6 lg:px-12 mb-8 md:absolute md:top-12 md:left-6 lg:md:left-12 md:z-10">
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-3 md:mb-4">
            [ ИИ-шаблоны ]
          </div>
          <h2 className="font-display text-2xl lg:text-4xl text-light uppercase">
            Примеры для ниш
          </h2>
          <p className="font-mono text-sm text-light/50 mt-2">
            Посмотри, как может выглядеть сайт твоего бизнеса
          </p>
        </div>

        {/* Mobile: CSS snap slider */}
        <div className="md:hidden -mx-0 px-6 pb-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {TEMPLATES.map((tpl, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 w-[80vw] bg-bg border border-border p-5 flex flex-col justify-between relative group"
              >
                <div className="absolute top-5 right-5 font-display text-3xl text-card font-bold">
                  {tpl.num}
                </div>
                <div className="w-full aspect-[4/3] mb-4 overflow-hidden relative border border-border">
                  <Image
                    src={tpl.img}
                    alt={tpl.title}
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-display text-base text-light uppercase mb-1">
                    {tpl.title}
                  </h3>
                  <p className="font-mono text-xs text-light/50">{tpl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: GSAP horizontal scroll */}
        <div
          ref={wrapperRef}
          className="hidden md:flex gap-12 px-6 lg:px-12 w-max items-center h-full pt-20 will-change-transform"
        >
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
      </div>
    </section>
  )
}
