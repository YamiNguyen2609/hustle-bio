# SheetCraft Bio Page (Next.js + Google Sheets API)

A premium link-in-bio page for selling Google Sheet templates. All profile, social, and product data is loaded from Google Sheets via the Google Sheets API v4 and rendered with Next.js App Router server components.

## 1) Clone and install

```bash
git clone <your-repo-url>
cd Bio
npm install
```

## 2) Create a Google Cloud project + Service Account

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Go to **APIs & Services > Library**, enable **Google Sheets API**.
4. Go to **IAM & Admin > Service Accounts**.
5. Create a new service account.
6. Create and download a JSON key for that account.
7. Save these values from the key:
   - `client_email` -> `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` -> `GOOGLE_PRIVATE_KEY`

## 3) Share the Google Sheet

Share your Google Sheet with the service account email (Viewer role is enough for this app).

## 4) Setup environment variables

1. Copy the example file:

```bash
cp .env.local.example .env.local
```

2. Fill in values in `.env.local`:

```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 5) Prepare Google Sheet tabs and headers

Create these exact tab names and column headers:

- `profile`: `Key | Value`
- `socials`: `platform | label | handle | url | icon_color | active`
- `products`: `id | title | description | category | price | original_price | badge | image_url | cta_url | active | sort_order`

`active` should be `TRUE` for rows you want to show.

## 6) Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 7) Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the repo into [Vercel](https://vercel.com/).
3. In the Vercel project dashboard, add:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Deploy.

## Notes

- Data is cached with ISR (`revalidate: 3600`) for one hour.
- If Google Sheets fetch fails, the app gracefully falls back to empty data.
