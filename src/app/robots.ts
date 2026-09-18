import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers, block API routes
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Explicitly allow major AI/LLM crawlers for GEO/AEO optimization
      { userAgent: 'GPTBot',          allow: '/' },
      { userAgent: 'ChatGPT-User',    allow: '/' },
      { userAgent: 'ClaudeBot',       allow: '/' },
      { userAgent: 'anthropic-ai',    allow: '/' },
      { userAgent: 'PerplexityBot',   allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot',       allow: '/' },
      { userAgent: 'CCBot',           allow: '/' },
      { userAgent: 'OAI-SearchBot',   allow: '/' },
    ],
    sitemap: [
      `${BUSINESS_CONFIG.domain}/sitemap.xml`,
      `${BUSINESS_CONFIG.domain}/image-sitemap.xml`,
    ],
  };
}
