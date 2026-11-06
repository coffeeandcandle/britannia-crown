import type { MetadataRoute } from 'next'
import { SITE_NAME } from './lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Britannia Crown | British Education Consultants',
    short_name: SITE_NAME,
    description: 'British education consultants for tutoring, home education, school placement and UAE relocation.',
    start_url: '/',
    display: 'browser',
    background_color: '#FBF8F4',
    theme_color: '#FBF8F4',
    lang: 'en-GB',
  }
}
