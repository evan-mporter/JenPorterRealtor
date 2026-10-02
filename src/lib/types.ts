import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type ImageWithAlt = SanityImageSource & { alt?: string };

export interface SiteSettings {
  agentName: string;
  title?: string;
  brokerage: string;
  licenseNumber?: string;
  logo?: ImageWithAlt;
  phone: string;
  email: string;
  officeAddress?: string;
  socialLinks?: { platform: string; url: string }[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ImageWithAlt;
  disclaimer?: string;
}

export interface LandingPage {
  heroHeadline: string;
  heroSubheadline?: string;
  heroImage?: ImageWithAlt;
  ctaLabel?: string;
  aboutHeading?: string;
  aboutPhoto?: ImageWithAlt;
  aboutBody?: PortableTextBlock[];
  servicesHeading?: string;
  services?: { title: string; description?: string }[];
  areasServed?: string[];
  listingsHeading?: string;
  listingsIntro?: string;
  testimonialsHeading?: string;
  testimonials?: { quote: string; name: string; context?: string }[];
  contactHeading?: string;
  contactBody?: string;
}

export interface Listing {
  _id: string;
  address: string;
  city: string;
  price: number;
  status: "active" | "pending" | "sold";
  beds?: number;
  baths?: number;
  sqft?: number;
  photo?: ImageWithAlt;
  link?: string;
}

export interface PageContent {
  settings: SiteSettings;
  page: LandingPage;
  listings: Listing[];
  /** True when the content is the built-in sample, not data from Sanity. */
  isSample: boolean;
}
