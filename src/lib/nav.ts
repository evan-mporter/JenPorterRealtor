import type { LandingPage, Listing } from "./types";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Links to the landing-page sections that have content. The header and footer
 * link to Contact separately. The links start with "/" so they also work on other pages.
 */
export function getNav(page: LandingPage, listings: Listing[]): NavItem[] {
  return [
    { href: "/#about", label: "About" },
    ...(page.services?.length ? [{ href: "/#services", label: "Services" }] : []),
    ...(listings.length ? [{ href: "/#listings", label: "Listings" }] : []),
    ...(page.testimonials?.length ? [{ href: "/#testimonials", label: "Reviews" }] : []),
  ];
}
