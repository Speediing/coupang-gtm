# Coupang x SpaceXAI

Password-protected customer leave-behind for Coupang.

The site keeps the approved template architecture:

- Next.js 15.5
- `src/` App Router layout
- Geist Sans and Geist Mono
- vGPU hero effect with a static watercolor fallback

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

The local password in `.env.example` is `land2expand`. Production reads
`SITE_PASSWORD` at runtime.

## Brand source

The lockup vendors the official Coupang wordmark used by the Coupang homepage.
The canonical raster source is:

`https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png`

The local SVG keeps the official wordmark paths so the lockup does not depend
on the Coupang CDN at runtime. The mark is paired with SpaceXAI in a compact
lockup. The watercolor is the Coupang account-plan asset.

## Deploy

The target production domain is `https://coupang-grokbot.vercel.app`.
