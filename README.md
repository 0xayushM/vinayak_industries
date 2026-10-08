This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Beacon (analytics, AI-bot hits, forms and blog)

The site reports to Beacon at https://beacon.vinayaktechnoplast.com (code in `lib/beacon/`, a copy of `@beacon/next`).

Settings (Vercel → Project → Settings → Environment Variables; locally `.env`):

| Setting | Value |
| --- | --- |
| `NEXT_PUBLIC_BEACON_SITE_KEY` (or `BEACON_SITE_KEY`) | the site key `bk_…` from Beacon → Sites |
| `BEACON_SITE_SECRET` | the site secret `bs_…` (server only; never `NEXT_PUBLIC_`) |
| `NEXT_PUBLIC_BEACON_URL` (or `BEACON_URL`) | optional; defaults to https://beacon.vinayaktechnoplast.com |

What each piece does:

- **Tracker** (`app/layout.tsx`): page views, sources (search, AI assistants…), cookieless.
- **AI-bot hits** (`proxy.ts`): tells Beacon when ChatGPT, Perplexity, Google and others crawl a page.
- **Leads** (`lib/tracking.ts` → `submitLead`): every accepted lead also goes to Beacon → Forms, one table per form (Quote request, Moulding enquiry, Company profile request), with where the visitor came from. The `<form>`s carry `data-beacon-ignore` so Beacon's automatic form capture does not record them twice. A new form that does not use `submitLead` is captured automatically; name its table with `data-beacon-form="…"`.
- **Blog** (`app/blog`, `lib/blog.ts`): posts written and approved in Beacon → Blog show at `/blog/<slug>`, with their SEO title, description, canonical and structured data. `app/api/beacon/revalidate` refreshes them the moment a post is published; set `https://www.vinayaktechnoplast.com/api/beacon/revalidate` as the webhook in Beacon → Blog → Connect a site. RSS at `/blog/rss.xml`.
- **Sitemap and robots** (`app/sitemap.ts`, `app/robots.ts`): every page plus the blog posts.
