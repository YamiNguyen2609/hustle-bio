# CLAUDE.md

@AGENTS.md

## Project Overview

- Name: `bio` (Next.js App Router project)
- Purpose: landing/bio page that renders profile, social links, and products from Google Sheets.
- Stack:
  - `next@16.2.4`
  - `react@19.2.4`
  - `typescript`
  - `googleapis`

## Runtime Commands

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Environment Variables

Required in `.env.local`:

- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_NAME`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

Important:

- `.env.local` must be UTF-8 encoded so Next.js can parse variables correctly.
- `GOOGLE_PRIVATE_KEY` should keep escaped newlines (`\n`).

## Current Source Structure

### Root

- `app/` - App Router entrypoint and global styles
- `components/` - UI components for banner/socials/products
- `lib/` - data fetching and mapping from Google Sheets
- `types/` - shared TypeScript domain types
- `next.config.ts` - Next.js config (images remotePatterns)
- `README.md` - setup and deployment guide

### `app/`

- `app/layout.tsx`
  - Loads fonts (`Syne`, `DM Sans`) via `next/font/google`
  - Applies global CSS and root metadata defaults
- `app/page.tsx`
  - Server component page
  - Fetches `profile`, `socials`, `products` in parallel
  - Renders:
    - `Banner`
    - `SocialLinks`
    - divider
    - `ProductList`
    - footer
- `app/globals.css`
  - Global theme, animation, layout styles
  - Banner/social/product visual styles

### `components/`

- `components/Banner.tsx`
  - Renders top rounded banner image
  - Circular bordered avatar centered
  - Profile name centered below avatar
  - Uses fallback banner/avatar data URL when missing
- `components/SocialLinks.tsx`
  - Renders social cards with per-platform icon
  - Resolves icon background color/gradient
- `components/ProductList.tsx`
  - Section shell + list mapping to `ProductCard`
- `components/ProductCard.tsx`
  - Product media, badge, title/description
  - Price + optional original price
  - CTA link button

### `lib/`

- `lib/googleSheets.ts`
  - Google service account auth (`google.auth.GoogleAuth`)
  - Reads Sheets API v4 values endpoint
  - Supports structured block format using:
    - `Configuration Start/End`
    - `Payment Start/End`
    - `Social Start/End`
    - `Project Start/End`
  - Exposes:
    - `getProfile()`
    - `getSocials()`
    - `getProducts()`
  - Fallback behavior:
    - Returns empty/default data if API fails
  - Cache strategy:
    - `next: { revalidate: 3600 }`

### `types/`

- `types/index.ts`
  - `Profile`
  - `Social`
  - `Product`

## Data Mapping Rules (Current)

- `Profile` derives mainly from `Configuration`:
  - `UserName -> name`
  - `Banner -> banner_url`
  - `Slogan -> tagline/headline`
  - `Description -> subheadline`
  - `Logo -> avatar_url`
  - `Mission -> footer_text`
- `website` is prioritized from `Social` entry with name `website`.
- `Social` list derives from `Social` section rows.
- `Product` list derives from `Project` section rows:
  - `Old Pricing`, `New Pricing`
  - `Thumb -> image_url`
  - `Best Seller -> badge`
  - `Level` + `Category` combined for display category.

## Notes For Future Updates

- If sheet column names change, update mappers in `lib/googleSheets.ts`.
- Keep `types/index.ts` synchronized with component usage.
- Validate `process.env` handling whenever `.env.local` is edited or re-encoded.
