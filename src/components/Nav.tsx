'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { NICHES } from '@/lib/niches'

export function Nav() {
  const [openMenu, setOpenMenu] = useState<'services' | 'niches' | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<'services' | 'niches' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll via class (avoids inline style conflicts with globals.css)
  useEffect(() => {
    if (!mounted) return
    if (mobileOpen) {
      document.documentElement.classList.add('menu-open')
    } else {
      document.documentElement.classList.remove('menu-open')
    }
    return () => {
      document.documentElement.classList.remove('menu-open')
    }
  }, [mobileOpen, mounted])

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  const toggleMobileExpanded = (key: 'services' | 'niches') => {
    setMobileExpanded(prev => prev === key ? null : key)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-6 lg:px-12 py-5 z-50 flex justify-between items-center bg-bg/80 backdrop-blur-md border-b border-border/50">
        <Link
          href="/"
          className="font-display font-black text-xl uppercase tracking-tighter text-accent"
        >
          КТ.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 relative">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('services')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href="/uslugi/lending"
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-light transition-colors duration-200"
            >
              Услуги
            </Link>
            {openMenu === 'services' && (
              <div className="absolute top-full left-0 w-80 bg-surface border border-border pt-4 pb-2 z-50">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/uslugi/${s.slug}`}
                    className="flex items-center justify-between gap-4 px-4 py-2 font-mono text-xs text-muted hover:text-accent hover:bg-card transition-colors uppercase tracking-wider whitespace-nowrap"
                  >
                    <span>{s.name}</span>
                    <span className="text-light/20 flex-shrink-0">{s.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('niches')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href="/dlya/stroitelnye-kompanii"
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-light transition-colors duration-200"
            >
              Ниши
            </Link>
            {openMenu === 'niches' && (
              <div className="absolute top-full left-0 w-64 bg-surface border border-border pt-4 pb-2 z-50">
                {NICHES.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/dlya/${n.slug}`}
                    className="block px-4 py-2 font-mono text-xs text-muted hover:text-accent hover:bg-card transition-colors uppercase tracking-wider"
                  >
                    {n.nameShort}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/cases"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-light transition-colors duration-200"
          >
            Кейсы
          </Link>
          <Link
            href="/about"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-light transition-colors duration-200"
          >
            Обо мне
          </Link>
        </div>

        {/* Right side: CTA (desktop only) + burger (mobile only) */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest bg-accent text-bg px-5 py-3 hover:bg-light transition-colors duration-200"
          >
            Написать →
          </a>

          {/* Burger — only render on client to avoid hydration issues */}
          {mounted && (
            <button
              className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px] shrink-0"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              <span className={`block w-5 h-[1.5px] bg-light transition-all duration-300 origin-center ${mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-light transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-light transition-all duration-300 origin-center ${mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu — only mount when open or transitioning */}
      {mounted && (
        <div
          className={`fixed inset-0 bg-bg z-40 md:hidden flex flex-col transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="flex-1 overflow-y-auto pt-24 pb-8 px-6">
            {/* Услуги */}
            <div className="border-b border-border/50">
              <button
                className="w-full flex items-center justify-between py-5"
                onClick={() => toggleMobileExpanded('services')}
              >
                <span className="font-display text-2xl text-light uppercase">Услуги</span>
                <span className={`font-mono text-accent text-xl transition-transform duration-300 ${mobileExpanded === 'services' ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === 'services' ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/uslugi/${s.slug}`}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between py-3 font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
                  >
                    <span>{s.name}</span>
                    <span className="text-light/30">{s.price}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ниши */}
            <div className="border-b border-border/50">
              <button
                className="w-full flex items-center justify-between py-5"
                onClick={() => toggleMobileExpanded('niches')}
              >
                <span className="font-display text-2xl text-light uppercase">Ниши</span>
                <span className={`font-mono text-accent text-xl transition-transform duration-300 ${mobileExpanded === 'niches' ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded === 'niches' ? 'max-h-[600px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                {NICHES.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/dlya/${n.slug}`}
                    onClick={closeMobileMenu}
                    className="block py-3 font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
                  >
                    {n.nameShort}
                  </Link>
                ))}
              </div>
            </div>

            {/* Simple links */}
            <Link
              href="/cases"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-5 border-b border-border/50"
            >
              <span className="font-display text-2xl text-light uppercase">Кейсы</span>
              <span className="font-mono text-accent">→</span>
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="flex items-center justify-between py-5 border-b border-border/50"
            >
              <span className="font-display text-2xl text-light uppercase">Обо мне</span>
              <span className="font-mono text-accent">→</span>
            </Link>
          </div>

          <div className="px-6 pb-8">
            <a
              href="#contact"
              className="block w-full text-center font-mono text-sm uppercase tracking-widest bg-accent text-bg py-4 hover:bg-light transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Написать →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
