'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

// TODO: замени на свои реальные скриншоты проектов
const WORK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    label: '01 — Лендинг',
  },
  {
    src: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    label: '02 — Корп. сайт',
  },
  {
    src: 'https://images.unsplash.com/photo-1720962158937-7ea890052166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    label: '03 — Дашборд',
  },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Динамический импорт GSAP только на клиенте
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')

      const splitText = (element: HTMLElement) => {
        const text = element.innerText
        element.innerHTML = ''
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.innerText = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.transform = 'translateY(100%)'
          span.style.opacity = '0'
          element.appendChild(span)
        })
        return element.querySelectorAll('span')
      }

      const ctx = gsap.context(() => {
        if (title1Ref.current && title2Ref.current) {
          const chars1 = splitText(title1Ref.current)
          const chars2 = splitText(title2Ref.current)

          const tl = gsap.timeline()
          tl.to([...chars1, ...chars2], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power4.out',
            delay: 0.2,
          })
        }

        gsap.fromTo(
          '.hero-work-img',
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.6,
          }
        )

        gsap.fromTo(
          '.hero-ui',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 1.2,
          }
        )
      }, containerRef)

      return () => ctx.revert()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col lg:flex-row pt-24 px-6 lg:px-12 bg-bg overflow-hidden"
    >
      {/* ── LEFT: Text ── */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center z-10 pb-16 lg:pb-0 pr-0 lg:pr-16">
        <div className="mb-6 font-mono text-xs tracking-widest text-light/40 uppercase hero-ui">
          [ Веб-разработка · ИИ · 2025 ]
        </div>

        <h1
          className="font-display font-black text-5xl md:text-6xl lg:text-[5.5vw] leading-[0.88] text-light uppercase mb-10 flex flex-col"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 110%, 0 110%)' }}
        >
          <span ref={title1Ref} className="block overflow-hidden">
            САЙТ /
          </span>
          <span ref={title2Ref} className="block overflow-hidden">
            ЗА 7 ДНЕЙ
          </span>
        </h1>

        <p className="font-body text-sm text-light/50 max-w-sm mb-10 hero-ui leading-relaxed">
          Разрабатываю продающие сайты для малого бизнеса — быстро,
          с упором на маркетинг, без компромиссов по дизайну.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-start hero-ui">
          <a
            href="#contact"
            className="bg-accent text-bg font-mono text-xs uppercase tracking-widest py-4 px-8 flex items-center gap-3 hover:bg-light transition-colors duration-300"
          >
            Начать проект <ArrowRight size={16} />
          </a>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider mb-1">
              Открыт для новых проектов
            </span>
            {/* TODO: поменяй на актуальный месяц */}
            <span className="font-mono text-sm text-light">Май 2025</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-14 hero-ui border-t border-card pt-8">
          {[
            { num: '50+', label: 'Проектов' },
            { num: '5+', label: 'Лет опыта' },
            { num: '10', label: 'Ниш' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-display text-2xl text-accent">{s.num}</span>
              <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Work mosaic ── */}
      <div className="w-full lg:w-[45%] flex flex-col gap-3 py-12 lg:py-16">
        {/* Top image */}
        <div
          className="hero-work-img relative w-full overflow-hidden bg-card"
          style={{ height: '52%', minHeight: '240px' }}
        >
          <Image
            src={WORK_IMAGES[0].src}
            alt={WORK_IMAGES[0].label}
            fill
            className="object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-4 left-4 font-mono text-[10px] text-accent uppercase tracking-widest bg-black/60 px-2 py-1">
            [ {WORK_IMAGES[0].label} ]
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex gap-3" style={{ height: '48%', minHeight: '180px' }}>
          {[WORK_IMAGES[1], WORK_IMAGES[2]].map((img, i) => (
            <div key={i} className="hero-work-img relative flex-1 overflow-hidden bg-card">
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-3 left-3 font-mono text-[10px] text-accent uppercase tracking-widest bg-black/60 px-2 py-1">
                [ {img.label} ]
              </div>
            </div>
          ))}
        </div>

        {/* Stack badge */}
        <div className="hero-ui border border-card bg-surface px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1">
              Stack
            </div>
            <div className="font-mono text-xs text-light/60">
              React · Tailwind · GSAP · Next.js
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-light/40 uppercase">Online</span>
          </div>
        </div>
      </div>
    </section>
  )
}
