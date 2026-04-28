'use client'

import { useEffect, useRef } from 'react'

const NICHES = [
  'СТРОИТЕЛЬСТВО',
  'РЕМОНТ КВАРТИР',
  'ДИЗАЙН ИНТЕРЬЕРОВ',
  'АВТОСЕРВИСЫ',
  'РЕСТОРАНЫ',
  'СТОМАТОЛОГИИ',
  'ФИТНЕС',
  'ЮРИСТЫ',
  'ЛАНДШАФТНЫЙ ДИЗАЙН',
  'E-COMMERCE',
]

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import('gsap')
      const el = marqueeRef.current
      if (!el) return

      const totalWidth = el.scrollWidth / 2

      const tween = gsap.to(el, {
        x: -totalWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
      })

      return () => tween.kill()
    }

    const cleanup = initGsap()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <div className="w-full overflow-hidden bg-bg border-y border-border py-4 whitespace-nowrap flex items-center">
      <div ref={marqueeRef} className="inline-flex items-center gap-6">
        {[...NICHES, ...NICHES].map((niche, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-mono text-sm tracking-widest text-light/40 uppercase">
              {niche}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  )
}
