'use client'

import { useEffect, useRef } from 'react'

interface CaseImageScrollProps {
  src: string
  alt: string
  className?: string
}

export function CaseImageScroll({ src, alt, className = '' }: CaseImageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gsapRef = useRef<any>(null)

  useEffect(() => {
    import('gsap').then(({ default: gsap }) => {
      gsapRef.current = gsap
    })
  }, [])

  const handleMouseEnter = () => {
    const gsap = gsapRef.current
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!gsap || !container || !wrapper) return
    gsap.killTweensOf(wrapper)
    const scrollAmount = wrapper.offsetHeight - container.offsetHeight
    if (scrollAmount <= 0) return
    gsap.to(wrapper, {
      y: -scrollAmount,
      duration: scrollAmount / 120,
      ease: 'none',
    })
  }

  const handleMouseLeave = () => {
    const gsap = gsapRef.current
    const wrapper = wrapperRef.current
    if (!gsap || !wrapper) return
    gsap.killTweensOf(wrapper)
    gsap.to(wrapper, { y: 0, duration: 0.7, ease: 'power3.out' })
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-card cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={wrapperRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
    </div>
  )
}
