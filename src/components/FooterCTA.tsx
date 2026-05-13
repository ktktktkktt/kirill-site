'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function FooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // interval объявляем во внешнем scope useEffect, чтобы и вложенный
    // gsap.context, и cleanup-функция могли к нему обратиться.
    let interval: ReturnType<typeof setInterval> | null = null
    let revert: (() => void) | null = null
    let cancelled = false

    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Если компонент уже размонтировался, пока шёл async-импорт — выходим
      if (cancelled) return

      const ctx = gsap.context(() => {
        if (!titleRef.current) return

        const chars = '!<>-_\\/[]{}—=+*^?#________'
        const targetText = titleRef.current.dataset.text || 'ОБСУДИМ ПРОЕКТ'

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 60%',
          onEnter: () => {
            let iteration = 0
            if (interval) clearInterval(interval)

            interval = setInterval(() => {
              if (titleRef.current) {
                titleRef.current.innerText = targetText
                  .split('')
                  .map((letter, index) => {
                    if (index < iteration) return targetText[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                  })
                  .join('')
              }

              if (iteration >= targetText.length) {
                if (interval) clearInterval(interval)
              }
              iteration += 1 / 3
            }, 30)
          },
        })
      }, containerRef)

      revert = () => ctx.revert()
    }

    initGsap()

    return () => {
      cancelled = true
      if (interval) clearInterval(interval)
      if (revert) revert()
    }
  }, [])

  return (
    <section
      id="contact"
      ref={containerRef}
      className="pt-48 pb-20 px-6 lg:px-12 bg-bg flex flex-col items-center justify-center text-center border-t border-border"
    >
      <h2
        ref={titleRef}
        data-text="ОБСУДИМ ПРОЕКТ"
        className="font-display text-[8vw] lg:text-[10vw] leading-none text-light uppercase mb-16 tracking-tight"
      >
        ОБСУДИМ ПРОЕКТ
      </h2>

      <p className="font-mono text-sm text-light/40 max-w-md mb-12 leading-relaxed">
        Напишите мне — отвечу в течение часа, скажу точную цену и срок для вашей задачи.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a
          href="https://t.me/design_kto"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-bg font-mono font-bold uppercase tracking-wider py-6 px-12 text-sm lg:text-base flex items-center justify-center gap-4 hover:bg-light transition-colors duration-300"
        >
          Написать в Telegram <ArrowRight size={20} />
        </a>
        <a
          href="tel:+79860010665"
          className="border border-border text-light font-mono uppercase tracking-wider py-6 px-12 text-sm flex items-center justify-center gap-4 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          +7 986 001 06 65 →
        </a>
      </div>

      <div className="mt-24 font-mono text-xs text-light/30 flex flex-col lg:flex-row gap-6 items-center uppercase">
        <span>© 2025 Кирилл Ткаченко</span>
        <span className="hidden lg:inline">·</span>
        <span>Россия</span>
        <span className="hidden lg:inline">·</span>
        <span>+7 986 001 06 65</span>
      </div>
    </section>
  )
}
