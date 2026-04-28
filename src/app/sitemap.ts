import { MetadataRoute } from 'next'
import { NICHES, CITIES } from '@/lib/niches'
import { SERVICES } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://YOUR-DOMAIN.ru' // TODO: замени на свой домен

  // /uslugi/[service]
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // /uslugi/[service]/[niche]
  const serviceNichePages = SERVICES.flatMap((service) =>
    NICHES.map((niche) => ({
      url: `${baseUrl}/uslugi/${service.slug}/${niche.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  // /uslugi/[service]/[niche]/[city]
  const serviceNicheCityPages = SERVICES.flatMap((service) =>
    NICHES.flatMap((niche) =>
      CITIES.map((city) => ({
        url: `${baseUrl}/uslugi/${service.slug}/${niche.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    )
  )

  // /dlya/[niche]
  const nichePages = NICHES.map((niche) => ({
    url: `${baseUrl}/dlya/${niche.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // /dlya/[niche]/[city]
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
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...servicePages,
    ...serviceNichePages,
    ...serviceNicheCityPages,
    ...nichePages,
    ...nicheCityPages,
  ]
}
