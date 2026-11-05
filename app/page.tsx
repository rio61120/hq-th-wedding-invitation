import App from '../src/App';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const forParam = (await searchParams).for;
  const invitedName =
    (Array.isArray(forParam) ? forParam[0] : forParam)?.trim() || null;

  return <App key={invitedName ?? 'direct'} invitedName={invitedName} />;
}
