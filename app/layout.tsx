import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';

const title = 'Thiệp cưới Hồng Quân & Thương Huyền | 2026';
const description = 'Trân trọng kính mời bạn đến chung vui cùng Hồng Quân và Thương Huyền. Xem lịch cưới, địa điểm và xác nhận tham dự.';
const shareImage = { url: '/assets/wedding-share.jpg', width: 1200, height: 818, alt: 'Hồng Quân và Thương Huyền' };
const siteUrlValue = process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL;
const siteUrl = (() => {
  try {
    return siteUrlValue ? new URL(siteUrlValue) : undefined;
  } catch {
    return undefined;
  }
})();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: 'Thiệp cưới Hồng Quân & Thương Huyền',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title,
    description,
    siteName: 'Thiệp cưới Hồng Quân & Thương Huyền',
    locale: 'vi_VN',
    type: 'website',
    ...(siteUrl ? { url: '/', images: [shareImage] } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    ...(siteUrl ? { images: [shareImage] } : {}),
  },
};

export const viewport: Viewport = { themeColor: '#FAF7F2' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAF7F2] text-[#3D3028] antialiased selection:bg-[#D5C2B4] selection:text-[#2B221B]">
        {children}
      </body>
    </html>
  );
}
