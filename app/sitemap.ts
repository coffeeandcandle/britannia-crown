import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.britanniacrown.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', changeFrequency: 'yearly' as const, priority: 1 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/uae', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/tutoring', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/home-education', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/school-placement', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/qualifications', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/membership', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/guides', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/ambassador', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.6 },
    { path: '/book-consultation', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms-and-conditions', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
