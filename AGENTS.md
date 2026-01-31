# Paymongo Page Template

React + Vite + Tailwind template for AI-generated storefronts.

## Structure

```
template/
├── src/
│   ├── App.tsx          # AI-generated (replaced each build)
│   ├── constants.tsx    # Auto-generated (STOREFRONT_ID)
│   ├── helpers.tsx      # API functions & types (DO NOT MODIFY)
│   ├── hooks.tsx        # Business logic hooks (DO NOT MODIFY)
│   ├── main.tsx         # Entry point (DO NOT MODIFY)
│   └── *.tsx            # Reusable components (DO NOT MODIFY)
├── scripts/
│   └── r2-upload.js     # Uploads dist/ to Cloudflare R2
├── package.json         # npm dependencies
└── vite.config.ts       # Vite build config
```

## Commands

```bash
npm install          # Install dependencies
npm run build        # Production build → dist/
npm run dev          # Local dev server
```

## Sandbox Build Flow

1. `git clone` this repo into sandbox
2. `npm install`
3. Write `src/App.tsx` (AI-generated code)
4. Write `src/constants.tsx` (storefront ID)
5. `npm run build`
6. `node scripts/r2-upload.js dist <page-id>`

## Key Files (DO NOT MODIFY)

- **helpers.tsx** - API client, types (`Product`, `CartItem`, `Storefront`)
- **hooks.tsx** - `useCart`, `useStorefront`, `useCheckout`, `usePageRouter`
- **DataWrapper.tsx** - Loading/error state wrapper
- **PageRouter.tsx** - Simple page navigation

## AI Generation Target

Only `src/App.tsx` is generated. It must:
- Import hooks from `./hooks.tsx`
- Import types from `./helpers.tsx`
- Use Tailwind CSS for styling (v4 syntax)
- Export default `App` component
- Call hooks in this order: `usePageRouter()` first, then `useCart(router.goToCart)`

Note: Toast notifications are handled automatically by the hooks. No need to import or call `toast` in App.tsx.
