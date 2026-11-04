import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [{ url: new URL('/', siteUrl).toString(), changeFrequency: 'monthly', priority: 1 }];
}

function getSiteUrl() {
  try {
    const value = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL;
    return value ? new URL(value) : undefined;
  } catch {
    return undefined;
  }
}
