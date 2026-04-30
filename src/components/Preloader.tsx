'use client'

import { useEffect, useRef, useState } from 'react'

export function Preloader() {
  const [hidden, setHidden] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const botRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock scroll during preloader
    document.documentElement.style.overflow = 'hidden'

    const init = async () => {
      const { default: gsap } = await import('gsap')

      const tl = gsap.timeline()

      // Logo slides in
      tl.fromTo(
        logoRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0
      )

      // Counter 0 → 100
      const obj = { val: 0 }
      tl.to(
        obj,
        {
          val: 100,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, '0')
            }
          },
        },
        0
      )

      // Progress line fills
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left center' },
        0
      )

      // Brief pause at 100
      tl.addLabel('exit', '+=0.15')

      // Exit: top curtain goes up, bottom goes down
      tl.to(
        topRef.current,
        { yPercent: -100, duration: 0.75, ease: 'power3.inOut' },
        'exit'
      )
      tl.to(
        botRef.current,
        { yPercent: 100, duration: 0.75, ease: 'power3.inOut' },
        'exit'
      )

      tl.then(() => {
        document.documentElement.style.overflow = ''
        // Signal Hero (and any other component) that preloader is done
        window.dispatchEvent(new CustomEvent('preloader:done'))
        setHidden(true)
      })
    }

    init()

    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none">
      {/* Top curtain */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-bg flex flex-col items-center justify-end pb-4"
      >
        {/* Logo */}
        <div
          ref={logoRef}
          className="font-display font-black text-2xl tracking-tighter text-accent mb-10"
        >
          КТ.
        </div>
      </div>

      {/* Bottom curtain */}
      <div
        ref={botRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-bg flex flex-col items-center justify-start pt-4"
      >
        {/* Progress line */}
        <div className="w-48 h-px bg-border mb-6 overflow-hidden relative">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Counter */}
        <div className="font-mono text-[10px] text-light/30 uppercase tracking-widest flex items-center gap-2">
          <span ref={counterRef}>000</span>
          <span className="text-light/15">/ 100</span>
        </div>
      </div>

      {/* Center divider line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-border -translate-y-px" />
    </div>
  )
}
