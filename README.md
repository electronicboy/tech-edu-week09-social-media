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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Reflections

I have implemented authentication/registration using Clerk; accessing an invalid profile will trigger a not found page
when there are no results inside the database for that profile ID. I did implement fallback support for using a name for
the profile ID; however, I did not implement looking up the user ID if passed a name, so the page will find the user
posts in that case (I just noticed this; I forgot I added this as a feature and may patch that up).

I utilised Material UI to manage layouts and provide more beauty than I usually strive for.

utilisingUtilising a guide I found on a clerk's blog, I added an onboarding flow. For some reason, redirecting out of
this flow seemed to fail; however, it exists, I swear.

Adding posts to the table uses a subquery to the profile table to get the user's ID, which is more familiar with how I
would generally do this sort of thing. We're using the general profile ID elsewhere, so it made more sense for me to use
that for general reference across the database.

I added a follow button to other users' profile pages, which is displayed on the home page under the following tab.

Week 2 of working with NextJS was probably my worst week yet. I put more effort into the overall design aspect than in
previous weeks, where I focused more on the logic behind the app. There is still some stuff to do, such as fixing the
display times (if I still need to) and some CSS tweaks here and there to improve stuff. The thing that irked me the most
was client vs the server, in particular, server actions throwing errors when fetching information from the server for a
client component, as well as my useEffect just not triggering, thus preventing a fetch request from working that made me
pull in SWR after some crying on my keyboard over the NextJS documentation so I could query that info, as well as
Suspense not working on the client due to NextJS. As soon as you want almost any form of interactivity from the client
beyond a simple link, you need to make a client component, which introduces a whole host of caveats and odd behaviours
which I needed more time to figure out. So I opted for a different path, such as, for profile images, I ended up tossing
together a quick image proxy as I was having issues implementing the profile pages; I did end up turning this into the
SWR, as mentioned earlier, to pull the data from the server, so I might have been able to avoid this. I did consider
populating this info into the database when people update their profile page. However, I wanted this to support updating
itself automatically when changed on Clerk; I also added a fallback URL for accounts without an image; however, Clerk
is, for some reason, now providing a fallback image.
