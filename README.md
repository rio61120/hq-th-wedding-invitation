# Thiệp cưới Hồng Quân & Thương Huyền

Wedding invitation built with Next.js App Router, React, and Tailwind CSS.

## Requirements

- Node.js 20.9 or newer
- Bun 1.3+ (the repository uses `bun.lock`)

## Run locally

```sh
bun install
bun run dev
```

Open http://localhost:3000.

## Production

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS URL before building. This value is used for canonical metadata, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

```sh
bun run build
bun run start
```
