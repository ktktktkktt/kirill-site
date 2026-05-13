import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Clients } from '@/components/Clients'
import { Services } from '@/components/Services'
import { Niches } from '@/components/Niches'
import { Cases } from '@/components/Cases'
import { Testimonials } from '@/components/Testimonials'
import { AITemplates } from '@/components/AITemplates'
import { Process } from '@/components/Process'
import { Guarantees } from '@/components/Guarantees'
import { AboutMe } from '@/components/AboutMe'
import { HomeFAQ } from '@/components/HomeFAQ'
import { FooterCTA } from '@/components/FooterCTA'
import { JsonLd } from '@/components/JsonLd'
import { getFAQJsonLd } from '@/lib/seo'

const HOME_FAQ = [
  {
    q: 'Сколько стоит разработка сайта?',
    a: 'Лендинг — от 30 000 ₽, корпоративный сайт — от 60 000 ₽, интернет-магазин — от 80 000 ₽. Итоговую цену фиксирую в договоре до старта — никаких доплат по ходу работы.',
  },
  {
    q: 'За какой срок готов сайт?',
    a: 'Лендинг — 5 дней, корпоративный сайт — 10 дней, интернет-магазин — 14 дней. Срок считается от заполненного брифа. Если материалы готовы заранее — быстрее.',
  },
  {
    q: 'Закладывается ли SEO с первого дня?',
    a: 'Да. Title, Description, H1–H3, структура и перелинковка оптимизируются сразу. Проектирую посадочные под нишевые и локальные запросы — органический трафик без рекламного бюджета.',
  },
  {
    q: 'Как проходит работа удалённо?',
    a: 'Бриф → прототип → дизайн → разработка → запуск. Все согласования в мессенджере. Промежуточные версии показываю на каждом этапе — вы всегда видите прогресс.',
  },
  {
    q: 'Что нужно подготовить для старта?',
    a: 'Описание услуги, примерные цены и контакты. Тексты, структуру и SEO-логику готовлю сам — вам нужно только согласовать. Фото и примеры работ ускорят процесс.',
  },
  {
    q: 'Можно ли заказать только часть работ?',
    a: 'Да. Только дизайн, только разработка по готовому макету, редизайн существующего сайта или отдельный блок — любой формат работы доступен.',
  },
  {
    q: 'Будет ли сайт адаптирован под мобильные?',
    a: 'Всегда. Мобильная версия проектируется отдельно, а не просто уменьшается. Проверяю на реальных устройствах перед запуском.',
  },
  {
    q: 'Что происходит после запуска сайта?',
    a: 'Передаю доступы, инструкцию по редактированию и базовые рекомендации по продвижению. Мелкие правки в первый месяц — бесплатно.',
  },
]

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
      <AITemplates />
      <Process />
      <Guarantees />
      <AboutMe />
      <HomeFAQ />
      <FooterCTA />
    </main>
  )
}
