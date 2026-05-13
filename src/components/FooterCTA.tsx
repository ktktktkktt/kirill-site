'use client'

import { useEffect, useRef } from 'react'
import { Send, MessageCircle, Phone } from 'lucide-react'
import { LeadForm } from './LeadForm'

const YEAR = new Date().getFullYear()

export function FooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    let revert: (() => void) | null = null
    let cancelled = false

    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

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
      className="pt-32 lg:pt-48 pb-24 px-6 lg:px-12 bg-bg flex flex-col items-center justify-center text-center border-t border-border"
    >
      <h2
        ref={titleRef}
        data-text="ОБСУДИМ ПРОЕКТ"
        className="font-display text-[12vw] lg:text-[9vw] xl:text-[8vw] leading-none text-light uppercase mb-10 tracking-tight"
      >
        ОБСУДИМ ПРОЕКТ
      </h2>

      <p className="font-mono text-sm text-light/40 max-w-md mb-10 leading-relaxed">
        Заполни форму или напиши в мессенджер — отвечу в течение часа,
        скажу точную цену и срок для твоей задачи.
      </p>

      {/* Форма */}
      <div className="w-full max-w-md text-left border border-border bg-surface/40 p-6 lg:p-8 mb-12">
        <LeadForm source="footer" />
      </div>

      <div className="font-mono text-[10px] text-light/30 uppercase tracking-widest mb-6">
        — или мессенджером —
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch w-full max-w-md">
        <a
          href="https://t.me/design_kto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-accent text-bg font-mono text-xs lg:text-sm uppercase tracking-widest py-4 px-5 flex items-center justify-center gap-2 hover:bg-light transition-colors duration-300"
        >
          <Send size={14} />
          Telegram
        </a>
        <a
          href="https://wa.me/79860010665"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border border-border text-light font-mono text-xs lg:text-sm uppercase tracking-widest py-4 px-5 flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        <a
          href="tel:+79860010665"
          className="flex-1 border border-border text-light font-mono text-xs lg:text-sm uppercase tracking-widest py-4 px-5 flex items-center justify-center gap-2 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          <Phone size={14} />
          Позвонить
        </a>
      </div>

      <div className="mt-24 font-mono text-xs text-light/30 flex flex-col lg:flex-row gap-6 items-center uppercase">
        <span>© {YEAR} Кирилл Ткаченко</span>
        <span className="hidden lg:inline">·</span>
        <span>Россия · Самозанятый</span>
        <span className="hidden lg:inline">·</span>
        <span>+7 986 001 06 65</span>
        <span className="hidden lg:inline">·</span>
        <a href="/privacy" className="hover:text-accent transition-colors">
          Политика конфиденциальности
        </a>
      </div>
    </section>
  )
}
