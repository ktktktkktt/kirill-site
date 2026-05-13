'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

// Sticky CTA на мобильных. Появляется после первого экрана, скрывается у
// футера, чтобы не перекрывать уже видимые кнопки.
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const nearBottom = max - y < 600
      setVisible(y > 400 && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-bg via-bg/95 to-bg/0 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <a
        href="#contact"
        data-lead-source="sticky-mobile"
        className="w-full bg-accent text-bg font-mono text-xs uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-black/40"
      >
        Получить смету за 15 минут
        <ArrowRight size={16} />
      </a>
    </div>
  )
}
