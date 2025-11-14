import { MetadataRoute } from 'next'

/**
 * Robots.txt Generation
 *
 * Controls search engine crawling behavior
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hometrustafrica.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // Disallow API routes
          '/admin/', // Disallow admin pages (if added)
          '/_next/', // Disallow Next.js internals
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

