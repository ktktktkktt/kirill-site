import { MetadataRoute } from 'next'
import { NICHES, CITIES } from '@/lib/niches'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://YOUR-DOMAIN.ru' // TODO: замени на свой домен

  const nichePages = NICHES.map((niche) => ({
    url: `${baseUrl}/niche/${niche.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const niche_city_pages = NICHES.flatMap((niche) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/niche/${niche.slug}/${city.slug}`,
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
    ...nichePages,
    ...niche_city_pages,
  ]
}
