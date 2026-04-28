'use client'

import { useEffect, useRef } from 'react'
import {
  HardHat,
  PaintRoller,
  Sofa,
  Wrench,
  Utensils,
  Stethoscope,
  Dumbbell,
  Scale,
  Leaf,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'

// Slug-и соответствуют будущим нишевым страницам /niche/[slug]
const NICHES = [
  { icon: HardHat,      name: 'Строительные компании', slug: 'stroitelnye-kompanii', num: '01' },
  { icon: PaintRoller,  name: 'Ремонт квартир',         slug: 'remont-kvartir',        num: '02' },
  { icon: Sofa,         name: 'Дизайн интерьеров',      slug: 'dizain-interierov',     num: '03' },
  { icon: Wrench,       name: 'Автосервисы',             slug: 'avtoservisy',           num: '04' },
  { icon: Utensils,     name: 'Рестораны и кафе',        slug: 'restorany',             num: '05' },
  { icon: Stethoscope,  name: 'Стоматологии',            slug: 'stomatologii',          num: '06' },
  { icon: Dumbbell,     name: 'Фитнес-клубы',            slug: 'fitnes-kluby',          num: '07' },
  { icon: Scale,        name: 'Юридические услуги',      slug: 'yuridicheskie-uslugi',  num: '08' },
  { icon: Leaf,         name: 'Ландшафтный дизайн',      slug: 'landshaftny-dizain',    num: '09' },
  { icon: Smartphone,   name: 'Ремонт техники',           slug: 'remont-tekhniki',       num: '10' },
]

export function Niches() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const grid = gridRef.current
      if (!grid) return

      const cards = grid.querySelectorAll<HTMLElement>('.niche-card')

      const anim = gsap.fromTo(
        cards,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            once: true,
          },
        }
      )

      return () => {
        anim.kill()
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === grid) t.kill()
        })
      }
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <section id="ниши" ref={containerRef} className="py-24 px-6 lg:px-12 bg-bg">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            [ 03 — Ниши ]
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-light uppercase leading-tight">
            Для каких
            <br />
            бизнесов
          </h2>
        </div>
        <p className="font-mono text-xs text-light/40 max-w-[280px] leading-relaxed">
          Разрабатываю сайты под специфику каждой ниши — с правильной структурой и нишевыми УТП
        </p>
      </div>

      {/* SEO: все ниши — живые ссылки на нишевые страницы */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border"
      >
        {NICHES.map((niche) => {
          const Icon = niche.icon
          return (
            <Link
              key={niche.slug}
              href={`/niche/${niche.slug}`}
              className="niche-card bg-bg p-6 lg:p-8 flex flex-col justify-between group hover:bg-surface transition-colors duration-300 min-h-[200px] lg:min-h-[220px]"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] text-light/20 uppercase tracking-widest">
                  {niche.num}
                </span>
                <Icon
                  strokeWidth={1}
                  size={28}
                  className="text-light/20 group-hover:text-accent transition-colors duration-300"
                />
              </div>
              <div>
                <h3 className="font-display text-sm lg:text-base text-light uppercase leading-snug mb-3">
                  {niche.name}
                </h3>
                <div className="font-mono text-[10px] text-light/20 group-hover:text-accent transition-colors duration-300 flex items-center gap-1.5 uppercase tracking-wider">
                  Примеры{' '}
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                    →
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
