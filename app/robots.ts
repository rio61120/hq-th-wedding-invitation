import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: { userAgent: '*', allow: '/' },
    ...(siteUrl ? { sitemap: new URL('/sitemap.xml', siteUrl).toString() } : {}),
  };
}

function getSiteUrl() {
  try {
    const value = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL;
    return value ? new URL(value) : undefined;
  } catch {
    return undefined;
  }
}
