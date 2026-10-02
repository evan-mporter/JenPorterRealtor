# Realtor Site

A one-page site for a real estate agent.

- **Frontend:** [Astro](https://astro.build). Static HTML, no client JavaScript on the landing page.
- **Content:** [Sanity](https://www.sanity.io). The editor uses Sanity Studio at `/admin`.
- **Hosting:** Any static host (Cloudflare, Netlify, Vercel). No server and no database to operate.

## Requirements

- Node.js 22.12 or later (Astro 7 and Sanity 6 require it)
- A free Sanity account

## 1. Run locally with sample content

```bash
npm install
npm run dev
```

Open http://localhost:4321. Before you connect Sanity, the page shows sample content and a yellow banner.

## 2. Connect Sanity

1. Log in and create a project:

   ```bash
   npx sanity login
   npx sanity projects create "Realtor Site" --dataset production --dataset-visibility public
   ```

   The command prints the project ID. You can also create the project at https://www.sanity.io/manage.

2. Copy `.env.example` to `.env`. Set `PUBLIC_SANITY_PROJECT_ID` to the project ID.

3. Let the local Studio connect to the project:

   ```bash
   npx sanity cors add http://localhost:4321 --credentials
   ```

4. Restart `npm run dev`. Open http://localhost:4321/admin and log in.

5. Fill in **Site settings** and **Landing page**. Add one or more **Featured listings**. Click **Publish** on each document.

6. Reload http://localhost:4321. The page now shows the Sanity content.

> A public dataset lets anyone read published content through the Sanity API. Drafts stay private. This is normal for public website content.

## 3. Deploy

Use these settings on any static host:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 or later |
| Environment variables | `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SITE_URL` |

After the first deploy:

1. Add the production URL as a CORS origin, so the editor can use `/admin` on the live site:

   ```bash
   npx sanity cors add https://www.example.com --credentials
   ```

2. Connect the custom domain in the host's dashboard.

The production build stops with an error if Sanity is not configured or has no published content. This prevents a deploy of the sample content.

## 4. Rebuild the site when the editor publishes

The site is static, so each content change needs a new build.

1. In the host's dashboard, create a **build hook** (also called a deploy hook). Copy its URL.
2. Open https://www.sanity.io/manage → your project → **API** → **Webhooks** → **Create webhook**.
3. Set these values:
   - **URL:** the build hook URL
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["siteSettings", "landingPage", "listing"]`
   - **HTTP method:** POST
4. Publish a small change in `/admin`. Check that the host starts a build. The live site updates when the build is complete.

## 5. Give the editor access

Open https://www.sanity.io/manage → your project → **Members** → **Invite**. Give the editor the **Editor** role. The editor then uses `https://<your-site>/admin`.

## Project structure

```
astro.config.mjs            Astro + Sanity integration. Studio route: /admin
sanity.config.ts            Studio configuration
sanity.cli.ts               Sanity CLI configuration
src/
  pages/index.astro         The landing page
  components/               One component for each page section
  layouts/Base.astro        <head>, SEO tags, structured data
  lib/sanity.ts             GROQ query, image URLs, sample-content fallback
  lib/sample.ts             Sample content for local development
  lib/types.ts              TypeScript types for the content
  sanity/schemaTypes/       Content model (what the editor can change)
  sanity/structure.ts       Studio sidebar
  styles/global.css         Brand colors, fonts, spacing
```

## Customize

- **Brand:** change the variables at the top of `src/styles/global.css`.
- **Layout:** edit the components in `src/components/`.
- **Editable fields:** edit the schemas in `src/sanity/schemaTypes/`. Then update `src/lib/types.ts` and the components. Run `npm run sanity:validate` and `npm run check`.

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start the dev server at http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Type-check the project |
| `npm run sanity:validate` | Validate the Sanity schema |

## Notes for a real estate site

- State rules and the brokerage often require specific statements on agent sites, such as the brokerage name, license number, and fair-housing text. Ask the broker. Put the text in **Site settings → Legal → Footer disclaimer**.
- Use real client testimonials only, with permission.
- The contact section uses phone and email links. To add a contact form, use a form service (for example Netlify Forms or Formspree) or a serverless function.
