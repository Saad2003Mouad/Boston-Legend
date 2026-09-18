import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config';
import { getAllServices } from '@/lib/services-data';
import { MASSACHUSETTS_CITIES } from '@/lib/cities-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_CONFIG.domain;

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',

    '/menu',
    '/packages',

    '/faq',
    '/cities',
    '/occasions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const services = getAllServices().map((service) => ({
    url: `${baseUrl}/occasions/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic City routes — include ALL cities so Google can find and index them
  const cities = MASSACHUSETTS_CITIES.map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: city.isTopCity ? 0.8 : 0.6,
  }));

  return [...routes, ...services, ...cities];
}
