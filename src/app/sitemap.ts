import { MetadataRoute } from 'next'
import { NICHES, CITIES } from '@/lib/niches'
import { SERVICES } from '@/lib/services'
import { CASES } from '@/lib/cases'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const now = new Date()

  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/uslugi/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const serviceNichePages = SERVICES.flatMap((service) =>
    NICHES.map((niche) => ({
      url: `${baseUrl}/uslugi/${service.slug}/${niche.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  )

  const serviceNicheCityPages = SERVICES.flatMap((service) =>
    NICHES.flatMap((niche) =>
      CITIES.map((city) => ({
        url: `${baseUrl}/uslugi/${service.slug}/${niche.slug}/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ),
  )

  const nichePages = NICHES.map((niche) => ({
    url: `${baseUrl}/dlya/${niche.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const nicheCityPages = NICHES.flatMap((niche) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/dlya/${niche.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  )

  const casePages = CASES.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...servicePages,
    ...serviceNichePages,
    ...serviceNicheCityPages,
    ...nichePages,
    ...nicheCityPages,
    ...casePages,
  ]
}
