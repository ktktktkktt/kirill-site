'use client'

import { useEffect, useRef } from 'react'
import { Send, MessageCircle, Phone, ArrowUpRight } from 'lucide-react'
import { LeadForm } from './LeadForm'

const YEAR = new Date().getFullYear()

const STATS = [
  { value: 5, suffix: ' дней', label: 'срок лендинга' },
  { value: 30, suffix: '+', label: 'проектов сдано' },
  { value: 100, suffix: '%', label: 'фикс цена' },
]

const MESSENGERS = [
  {
    href: 'https://t.me/design_kto',
    icon: Send,
    label: 'Telegram',
    primary: true,
  },
  {
    href: 'https://wa.me/79860010665',
    icon: MessageCircle,
    label: 'WhatsApp',
    primary: false,
  },
  {
    href: 'tel:+79860010665',
    icon: Phone,
    label: '+7 986 001 06 65',
    primary: false,
  },
]

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([])
  const msgRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrambleInterval: ReturnType<typeof setInterval> | null = null
    let cancelled = false

    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (cancelled) return

      const ctx = gsap.context(() => {
        /* ── 1. Title scramble ── */
        const chars = '!<>-_\\/[]{}—=+*^?#________'
        const targetText = titleRef.current?.dataset.text || 'ОБСУДИМ ПРОЕКТ'

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
          onEnter: () => {
            let iteration = 0
            if (scrambleInterval) clearInterval(scrambleInterval)
            scrambleInterval = setInterval(() => {
              if (titleRef.current) {
                titleRef.current.innerText = targetText
                  .split('')
                  .map((_, i) => {
                    if (i < iteration) return targetText[i]
                    return chars[Math.floor(Math.random() * chars.length)]
                  })
                  .join('')
              }
              if (iteration >= targetText.length && scrambleInterval) {
                clearInterval(scrambleInterval)
              }
              iteration += 1 / 3
            }, 30)
          },
        })

        /* ── 2. Horizontal line reveal ── */
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          },
        )

        /* ── 3. Left column slide in ── */
        gsap.fromTo(
          leftRef.current,
          { x: -48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          },
        )

        /* ── 4. Right column slide in ── */
        gsap.fromTo(
          rightRef.current,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.25,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          },
        )

        /* ── 5. Stats count-up ── */
        statsRefs.current.forEach((el, i) => {
          if (!el) return
          const target = STATS[i].value
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            delay: 0.4 + i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
            onUpdate: () => {
              if (el) el.textContent = Math.round(obj.val).toString()
            },
          })
        })

        /* ── 6. Messenger buttons stagger ── */
        gsap.fromTo(
          msgRefs.current.filter(Boolean),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          },
        )

        /* ── 7. Bottom bar ── */
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              once: true,
            },
          },
        )

        /* ── 8. Magnetic hover on messenger buttons ── */
        msgRefs.current.forEach((el) => {
          if (!el) return
          const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            gsap.to(el, { x: x * 0.18, y: y * 0.18, duration: 0.4, ease: 'power2.out' })
          }
          const handleLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
          }
          el.addEventListener('mousemove', handleMove)
          el.addEventListener('mouseleave', handleLeave)
        })
      }, sectionRef)

      return () => ctx.revert()
    }

    const cleanup = init()
    return () => {
      cancelled = true
      if (scrambleInterval) clearInterval(scrambleInterval)
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-bg border-t border-border overflow-hidden"
    >
      {/* ── Big title ── */}
      <div className="px-6 lg:px-12 pt-24 lg:pt-36 pb-0">
        <h2
          ref={titleRef}
          data-text="ОБСУДИМ ПРОЕКТ"
          className="font-display font-black text-[13vw] lg:text-[10vw] xl:text-[9vw] leading-none text-light uppercase tracking-tight whitespace-nowrap"
        >
          ОБСУДИМ ПРОЕКТ
        </h2>
      </div>

      {/* ── Divider line ── */}
      <div
        ref={lineRef}
        className="mx-6 lg:mx-12 mt-8 h-px bg-border"
        style={{ transformOrigin: 'left' }}
      />

      {/* ── Two-column body ── */}
      <div className="px-6 lg:px-12 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT — info, stats, messengers */}
        <div ref={leftRef} className="flex flex-col gap-10">
          <p className="font-body text-lg text-light/60 leading-relaxed max-w-md">
            Заполни форму или напиши в мессенджер — отвечу в течение часа,
            скажу точную цену и срок для твоей задачи.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-1 border-l border-accent/30 pl-4">
                <div className="font-display text-3xl lg:text-4xl text-accent leading-none">
                  <span
                    ref={(el) => { statsRefs.current[i] = el }}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="font-mono text-[10px] text-light/40 uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="font-mono text-[10px] text-light/30 uppercase tracking-widest flex items-center gap-4 before:content-[''] before:flex-1 before:h-px before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">
            или мессенджером
          </div>

          {/* Messenger buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            {MESSENGERS.map((m, i) => {
              const Icon = m.icon
              return (
                <a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith('http') ? '_blank' : undefined}
                  rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  ref={(el) => { msgRefs.current[i] = el }}
                  className={`group flex-1 flex items-center justify-center gap-2.5 py-4 px-5 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    m.primary
                      ? 'bg-accent text-bg hover:bg-light'
                      : 'border border-border text-light hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon size={13} />
                  {m.label}
                  {m.primary && (
                    <ArrowUpRight
                      size={13}
                      className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* RIGHT — form */}
        <div ref={rightRef} className="relative">
          {/* Decorative accent corner */}
          <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-accent/40 pointer-events-none hidden lg:block" />
          <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-accent/20 pointer-events-none hidden lg:block" />

          <div className="border border-border bg-surface/30 p-6 lg:p-8 h-full">
            <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
              Свободен для новых проектов
            </div>
            <LeadForm source="footer" />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        ref={bottomRef}
        className="border-t border-border px-6 lg:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"
      >
        <div className="font-mono text-xs text-light/30 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 uppercase tracking-widest">
          <span>© {YEAR} Кирилл Ткаченко</span>
          <span className="hidden lg:inline text-border">·</span>
          <span>Самозанятый · НПД</span>
          <span className="hidden lg:inline text-border">·</span>
          <span>+7 986 001 06 65</span>
        </div>
        <div className="font-mono text-xs text-light/30 flex gap-6 uppercase tracking-widest">
          <a href="/privacy" className="hover:text-accent transition-colors duration-200">
            Конфиденциальность
          </a>
          <a href="/blog" className="hover:text-accent transition-colors duration-200">
            Блог
          </a>
          <a href="/cases" className="hover:text-accent transition-colors duration-200">
            Кейсы
          </a>
        </div>
      </div>
    </section>
  )
}
