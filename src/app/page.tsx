import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Clients } from '@/components/Clients'
import { Services } from '@/components/Services'
import { Niches } from '@/components/Niches'
import { Cases } from '@/components/Cases'
import { Testimonials } from '@/components/Testimonials'
import { Process } from '@/components/Process'
import { Guarantees } from '@/components/Guarantees'
import { AboutMe } from '@/components/AboutMe'
import { HomeFAQ } from '@/components/HomeFAQ'
import { FooterCTA } from '@/components/FooterCTA'
import { JsonLd } from '@/components/JsonLd'
import { getFAQJsonLd } from '@/lib/seo'
import { HOME_FAQ } from '@/lib/homeFaq'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className="bg-bg text-light min-h-screen overflow-x-hidden">
      <JsonLd data={getFAQJsonLd(HOME_FAQ)} />
      <Nav />
      <Hero />
      <Marquee />
      <Clients />
      <Services />
      <Niches />
      <Cases />
      <Testimonials />
      <Process />
      <Guarantees />
      <AboutMe />
      <HomeFAQ />
      <FooterCTA />
    </main>
  )
}
