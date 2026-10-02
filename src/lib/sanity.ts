import { sanityClient } from "sanity:client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { LandingPage, Listing, PageContent, SiteSettings } from "./types";
import { sampleContent } from "./sample";

const isConfigured = Boolean(import.meta.env.PUBLIC_SANITY_PROJECT_ID);

const builder = createImageUrlBuilder(sanityClient);

/** Returns a URL builder for a Sanity image. Example: urlFor(img).width(800).url() */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");

const PAGE_QUERY = /* groq */ `{
  "settings": *[_id == "siteSettings"][0],
  "page": *[_id == "landingPage"][0],
  "listings": *[_type == "listing" && status in ["active", "pending"]]
    | order(sortOrder asc, price desc) {
      _id, address, city, price, status, beds, baths, sqft, photo, link
    }
}`;

/** Loads all content for the landing page at build time. */
export async function getPageContent(): Promise<PageContent> {
  if (!isConfigured) {
    if (import.meta.env.PROD) {
      throw new Error(
        "PUBLIC_SANITY_PROJECT_ID is not set. Set it in .env (local) or in the host's environment variables. See README.md.",
      );
    }
    return { ...sampleContent, isSample: true };
  }

  const data = await sanityClient.fetch<{
    settings: SiteSettings | null;
    page: LandingPage | null;
    listings: Listing[];
  }>(PAGE_QUERY);

  if (!data.settings || !data.page) {
    const message =
      'Sanity has no published "Site settings" or "Landing page" document. Open /admin, fill in both, and click Publish.';
    if (import.meta.env.PROD) throw new Error(message);
    console.warn(`[content] ${message} Showing sample content.`);
    return { ...sampleContent, isSample: true };
  }

  return { settings: data.settings, page: data.page, listings: data.listings ?? [], isSample: false };
}

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
