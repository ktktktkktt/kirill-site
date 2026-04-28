import { MetadataRoute } from 'next'
import { NICHES, CITIES } from '@/lib/niches'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://YOUR-DOMAIN.ru' // TODO: замени на свой домен

  // /uslugi/[service] — 6 страниц
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // /uslugi/[service]/[niche] — 6×12 = 72 страницы
  const serviceNichePages = SERVICES.flatMap((service) =>
    NICHES.map((niche) => ({
      url: `${baseUrl}/uslugi/${service.slug}/${niche.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  // /dlya/[niche] — 12 страниц
  const nichePages = NICHES.map((niche) => ({
    url: `${baseUrl}/dlya/${niche.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // /dlya/[niche]/[city] — 12×20 = 240 страниц
  const nicheCityPages = NICHES.flatMap((niche) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/dlya/${niche.slug}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...servicePages,
    ...serviceNichePages,
    ...nichePages,
    ...nicheCityPages,
  ]
}
