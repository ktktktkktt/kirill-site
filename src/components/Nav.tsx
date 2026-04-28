'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { NICHES } from '@/lib/niches'

export function Nav() {
  const [openMenu, setOpenMenu] = useState<'services' | 'niches' | null>(null)

  return (
    <nav className="fixed top-0 left-0 w-full px-6 lg:px-12 py-5 z-50 flex justify-between items-center bg-bg/80 backdrop-blur-md border-b border-border/50">
      <Link
        href="/"
        className="font-display font-black text-xl uppercase tracking-tighter text-accent"
      >
        КТ.
      </Link>

      <div className="hidden md:flex items-center gap-8 relative">
        {/* Услуги с дропдауном */}
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
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border py-2 z-50">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/uslugi/${s.slug}`}
                  className="block px-4 py-2 font-mono text-xs text-muted hover:text-accent hover:bg-card transition-colors uppercase tracking-wider"
                >
                  {s.name}
                  <span className="ml-2 text-light/20">{s.price}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Ниши с дропдауном */}
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
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border py-2 z-50">
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

      <a
        href="#contact"
        className="font-mono text-xs uppercase tracking-widest bg-accent text-bg px-5 py-3 hover:bg-light transition-colors duration-200"
      >
        Написать →
      </a>
    </nav>
  )
}
