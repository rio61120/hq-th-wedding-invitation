import type { Metadata } from 'next';
import App from '../src/App';
import { siteUrl } from './site-url';

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getInvitedName(searchParams: HomePageProps['searchParams']) {
  const forParam = (await searchParams).for;
  return (Array.isArray(forParam) ? forParam[0] : forParam)?.trim() || null;
}

export async function generateMetadata({ searchParams }: HomePageProps): Promise<Metadata> {
  const invitedName = await getInvitedName(searchParams);
  if (!invitedName) return {};

  const invitationUrl = new URL('/', siteUrl);
  invitationUrl.searchParams.set('for', invitedName);
  const imageUrl = new URL('/assets/wedding-share.jpg', siteUrl).toString();
  const title = 'Thiệp cưới Hồng Quân & Thương Huyền | 2026';
  const description = 'Trân trọng kính mời bạn đến chung vui cùng Hồng Quân và Thương Huyền. Xem lịch cưới, địa điểm và xác nhận tham dự.';

  return {
    alternates: { canonical: invitationUrl },
    openGraph: {
      title,
      description,
      siteName: 'Thiệp cưới Hồng Quân & Thương Huyền',
      locale: 'vi_VN',
      type: 'website',
      url: invitationUrl,
      images: [{ url: imageUrl, width: 1200, height: 818, alt: 'Hồng Quân và Thương Huyền' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const invitedName = await getInvitedName(searchParams);
  return <App key={invitedName ?? 'direct'} invitedName={invitedName} />;
}
