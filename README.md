This is a [Next.js](https://nextjs.org/) version 14 app route project (a forum I made for a school project) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load a custom Font.

## Notes

- You may notice i fetch with post in all api routes,that's cuz of the very known issue in next js concerning caching in client components,
soooo as a workaround i fetch with post instead of get.
- If u have any contribution you can contact me, since this project is poorly optimized (not taking any benefits from caching system, ssr, ssg aaand doesn't really respect all best practises lol . :))



