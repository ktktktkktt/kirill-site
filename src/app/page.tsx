import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Services } from '@/components/Services'
import { Niches } from '@/components/Niches'
import { Cases } from '@/components/Cases'
import { AITemplates } from '@/components/AITemplates'
import { Process } from '@/components/Process'
import { FooterCTA } from '@/components/FooterCTA'

export default function HomePage() {
  return (
    <main className="bg-bg text-light min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Niches />
      <Cases />
      <AITemplates />
      <Process />
      <FooterCTA />
    </main>
  )
}
