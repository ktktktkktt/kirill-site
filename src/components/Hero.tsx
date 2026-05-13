'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'

// Реальные скриншоты портфолио — лежат в /public/cases
const WORK_IMAGES = [
  {
    src: '/cases/domus.png',
    label: '01 — Domus',
    alt: 'Сайт строительной компании Domus',
  },
  {
    src: '/cases/nordwood.png',
    label: '02 — Nordwood',
    alt: 'Сайт по строительству деревянных домов Nordwood',
  },
  {
    src: '/cases/kirpichnye-doma.png',
    label: '03 — Кирпичные дома',
    alt: 'Сайт компании Кирпичные дома',
  },
]

const BULLETS = [
  'Цена от 30 000 ₽, фикс в договоре до старта',
  'SEO с первого дня — заявки из поиска без бюджета на рекламу',
  'Работаю напрямую: без менеджеров и сломанного телефона',
]

type WinWithFlag = typeof window & { __preloaderDone?: boolean }

// Дата открытости к проектам — пересчитывается на каждом ребилде.
// suppressHydrationWarning ниже снимает варнинг, если клиент в другом месяце.
function getAvailabilityLabel() {
  const label = new Date().toLocaleString('ru-RU', {
    month: 'long',
    year: 'numeric',
  })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLSpanElement>(null)
  const title2Ref = useRef<HTMLSpanElement>(null)
  const title3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let ctx: any = null

    const runAnimation = async () => {
      const { default: gsap } = await import('gsap')

      const splitText = (element: HTMLElement) => {
        const text = element.innerText
        element.innerHTML = ''
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          //   — неразрывный пробел: inline-block иначе схлопнул бы обычный пробел до нулевой ширины.
          span.innerText = char === ' ' ? ' ' : char
          span.style.display = 'inline-block'
          span.style.transform = 'translateY(100%)'
          span.style.opacity = '0'
          element.appendChild(span)
        })
        return element.querySelectorAll('span')
      }

      ctx = gsap.context(() => {
        if (title1Ref.current && title2Ref.current && title3Ref.current) {
          const chars1 = splitText(title1Ref.current)
          const chars2 = splitText(title2Ref.current)
          const chars3 = splitText(title3Ref.current)
          gsap.set(
            [title1Ref.current, title2Ref.current, title3Ref.current],
            { opacity: 1 },
          )

          const tl = gsap.timeline()
          tl.to([...chars1, ...chars2, ...chars3], {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power4.out',
            delay: 0.1,
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
            delay: 0.4,
          },
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
            delay: 0.9,
          },
        )
      }, containerRef)
    }

    if ((window as WinWithFlag).__preloaderDone) {
      runAnimation()
    } else {
      const onDone = () => {
        ;(window as WinWithFlag).__preloaderDone = true
        runAnimation()
      }
      window.addEventListener('preloader:done', onDone, { once: true })
      return () => {
        window.removeEventListener('preloader:done', onDone)
        ctx?.revert()
      }
    }

    return () => {
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col lg:flex-row pt-24 px-6 lg:px-12 bg-bg overflow-hidden"
    >
      {/* ── LEFT: Text ── */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center z-10 pb-16 lg:pb-0 pr-0 lg:pr-16">
        <div
          className="mb-6 font-mono text-xs tracking-widest text-light/40 uppercase hero-ui"
          style={{ opacity: 0 }}
        >
          [ Веб-разработка · SEO · ИИ · 2026 ]
        </div>

        <h1
          className="font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[5.8vw] xl:text-[5vw] 2xl:text-[4.5vw] leading-[0.92] tracking-tight text-light uppercase mb-8 flex flex-col"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 110%, 0 110%)' }}
        >
          <span
            ref={title1Ref}
            className="block overflow-hidden whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            РАЗРАБОТКА
          </span>
          <span
            ref={title2Ref}
            className="block overflow-hidden whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            САЙТОВ
          </span>
          <span
            ref={title3Ref}
            className="block overflow-hidden whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            ЗА 7 ДНЕЙ
          </span>
        </h1>

        <p
          className="font-body text-base lg:text-lg text-light/70 max-w-lg mb-8 hero-ui leading-relaxed"
          style={{ opacity: 0 }}
        >
          Лендинги, корпоративные сайты и интернет-магазины под ключ.
          Продающая структура, SEO с первого дня, фикс цены в договоре.
        </p>

        {/* Bullets — выгоды */}
        <ul
          className="flex flex-col gap-3 mb-10 hero-ui max-w-lg"
          style={{ opacity: 0 }}
        >
          {BULLETS.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 font-body text-sm text-light/60"
            >
              <Check
                size={16}
                className="text-accent mt-0.5 flex-shrink-0"
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col sm:flex-row gap-6 items-start hero-ui"
          style={{ opacity: 0 }}
        >
          <a
            href="#contact"
            className="bg-accent text-bg font-mono text-xs uppercase tracking-widest py-4 px-8 flex items-center gap-3 hover:bg-light transition-colors duration-300"
          >
            Получить смету за 15 минут <ArrowRight size={16} />
          </a>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[10px] text-light/40 uppercase tracking-wider mb-1">
              Открыт для проектов
            </span>
            <span
              className="font-mono text-sm text-light"
              suppressHydrationWarning
            >
              {getAvailabilityLabel()}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 mt-14 hero-ui border-t border-card pt-8"
          style={{ opacity: 0 }}
        >
          {[
            { num: '80+', label: 'Проектов' },
            { num: '5+', label: 'Лет опыта' },
            { num: '12', label: 'Ниш' },
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
          style={{ height: '52%', minHeight: '240px', opacity: 0 }}
        >
          <Image
            src={WORK_IMAGES[0].src}
            alt={WORK_IMAGES[0].alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-top grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-4 left-4 font-mono text-[10px] text-accent uppercase tracking-widest bg-black/60 px-2 py-1">
            [ {WORK_IMAGES[0].label} ]
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex gap-3" style={{ height: '48%', minHeight: '180px' }}>
          {[WORK_IMAGES[1], WORK_IMAGES[2]].map((img, i) => (
            <div
              key={i}
              className="hero-work-img relative flex-1 overflow-hidden bg-card"
              style={{ opacity: 0 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover object-top grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-3 left-3 font-mono text-[10px] text-accent uppercase tracking-widest bg-black/60 px-2 py-1">
                [ {img.label} ]
              </div>
            </div>
          ))}
        </div>

        {/* Stack badge */}
        <div
          className="hero-ui border border-card bg-surface px-5 py-4 flex items-center justify-between"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1">
              Stack
            </div>
            <div className="font-mono text-xs text-light/60">
              Next.js · React · Tailwind · GSAP · SEO
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-light/40 uppercase">
              Online
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
