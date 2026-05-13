'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FACTS = [
  { num: '5+', label: 'лет в веб-разработке' },
  { num: '80+', label: 'проектов запущено' },
  { num: '3 дня', label: 'минимальный срок' },
  { num: '100%', label: 'удалённая работа' },
]

export function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.about-text-line',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )

        gsap.fromTo(
          '.about-fact',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: '.about-facts',
              start: 'top 80%',
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
      <div className="font-mono text-xs text-accent uppercase tracking-widest mb-12">
        [ Обо мне ]
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Text */}
        <div>
          <h2 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight mb-10">
            <span className="about-text-line block">Кирилл</span>
            <span className="about-text-line block text-accent">Ткаченко</span>
          </h2>

          <div className="flex flex-col gap-5 font-body text-light/60 leading-relaxed max-w-lg">
            <p className="about-text-line">
              Разрабатываю сайты для малого бизнеса — от лендинга до полноценной упаковки.
              Работаю в одиночку: вы общаетесь напрямую с исполнителем, без менеджеров и телефонного испорченного телефона.
            </p>
            <p className="about-text-line">
              Каждый проект начинается с анализа задачи, а не с шаблона.
              Структура, тексты, SEO и дизайн — всё в рамках одного процесса.
            </p>
            <p className="about-text-line">
              Работаю удалённо по всей России. Срок и стоимость фиксируются до старта —
              никаких сюрпризов на финишной прямой.
            </p>
          </div>

          <Link
            href="/about"
            className="about-text-line inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-light/40 hover:text-accent transition-colors duration-300 mt-10"
          >
            Подробнее обо мне →
          </Link>
        </div>

        {/* Right: image + facts */}
        <div className="flex flex-col gap-8">
          <div className="relative w-full aspect-[4/3] bg-card overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
              alt="Рабочее место разработчика сайтов"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
          </div>

          <div className="about-facts grid grid-cols-2 gap-px bg-border">
            {FACTS.map((f) => (
              <div key={f.label} className="about-fact bg-bg p-6">
                <div className="font-display text-3xl text-accent mb-1">{f.num}</div>
                <div className="font-mono text-[10px] text-light/40 uppercase tracking-wider">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
