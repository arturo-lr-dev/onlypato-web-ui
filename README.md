# Only Pato Web UI

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

## Features

### Launch Modal

The site includes a launch modal that appears when users first visit the website. The modal displays a message about the opening date (September 5th) and allows users to enter their email to be notified when the site launches.

#### Holded CRM Integration

The modal integrates with Holded CRM to store user emails and send them to a specific funnel using the Holded Leads API. To configure this integration:

1. Rename `.env.local.example` to `.env.local`
2. Add your Holded API key to the `.env.local` file
3. The funnel ID is already configured (681e2583df0578e5560e3eb0)
4. The API endpoint is configured to use the Holded CRM API v1 (`https://api.holded.com/api/crm/v1/leads`)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
