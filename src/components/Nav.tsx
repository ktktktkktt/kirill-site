'use client'

import Link from 'next/link'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 lg:px-12 py-5 z-50 flex justify-between items-center bg-bg/80 backdrop-blur-md border-b border-border/50">
      <Link
        href="/"
        className="font-display font-black text-xl uppercase tracking-tighter text-accent"
      >
        КТ.
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {['Кейсы', 'Услуги', 'Ниши', 'Обо мне'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-light transition-colors duration-200"
          >
            {item}
          </a>
        ))}
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
