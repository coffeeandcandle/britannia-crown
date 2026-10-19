import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'
import { services } from './lib/services'
import { subjects } from './lib/subjects'
import { guides } from './lib/guides'

type Entry = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
  lastModified?: string
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Entry[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s): Entry => ({ path: `/services/${s.slug}`, changeFrequency: 'monthly', priority: 0.9 })),
    { path: '/tutors', changeFrequency: 'monthly', priority: 0.9 },
    ...subjects.map((s): Entry => ({ path: `/tutors/${s.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    { path: '/guides', changeFrequency: 'weekly', priority: 0.8 },
    ...guides.map((g): Entry => ({ path: `/guides/${g.slug}`, changeFrequency: 'monthly', priority: 0.7, lastModified: g.updated })),
    { path: '/book-consultation', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
    { path: '/uae', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/membership', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/ambassador', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/careers', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.2 },
  ]

  return routes.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: route.lastModified ? new Date(route.lastModified) : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
