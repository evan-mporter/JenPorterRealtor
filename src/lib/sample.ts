import type { PageContent } from "./types";

/**
 * Sample content. The site shows this only during `npm run dev` before a Sanity
 * project is connected. A production build without Sanity content fails on purpose.
 */
export const sampleContent: Omit<PageContent, "isSample"> = {
  settings: {
    agentName: "Alex Morgan",
    title: "REALTOR®",
    brokerage: "Sample Realty Group",
    licenseNumber: "SL-0000000",
    phone: "(555) 010-0199",
    email: "alex@example.com",
    officeAddress: "100 Main Street, Suite 2\nAnytown, ST 00000",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "Facebook", url: "https://facebook.com/" },
    ],
    seoTitle: "Alex Morgan | Anytown Real Estate",
    seoDescription: "Buy or sell a home in Anytown and nearby towns with local agent Alex Morgan.",
    disclaimer:
      "SAMPLE CONTENT. Alex Morgan is a licensed real estate salesperson with Sample Realty Group. Equal Housing Opportunity.",
  },
  page: {
    heroHeadline: "Find your place in Anytown",
    heroSubheadline: "Local knowledge, clear advice, and a plan from first showing to closing day.",
    ctaLabel: "Get in touch",
    aboutHeading: "About me",
    aboutBody: [
      {
        _type: "block",
        _key: "a1",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: "s1", marks: [], text: "This is sample text. Replace it in the Studio at /admin after you connect Sanity." }],
      },
    ],
    servicesHeading: "How I can help",
    services: [
      { title: "Buying", description: "Search, showings, offers, and negotiation." },
      { title: "Selling", description: "Pricing, staging advice, photography, and marketing." },
      { title: "Relocation", description: "Help to learn the area before you move." },
    ],
    areasServed: ["Anytown", "Maple Grove", "Riverside", "Oak Hill"],
    listingsHeading: "Featured listings",
    listingsIntro: "A selection of my current listings.",
    testimonialsHeading: "What clients say",
    testimonials: [
      { quote: "Sample testimonial. Replace it with a real client review.", name: "Sample Client", context: "Bought in Maple Grove" },
    ],
    contactHeading: "Let's talk",
    contactBody: "Call, text, or email. I reply within one business day.",
  },
  listings: [
    { _id: "s1", address: "12 Sample Lane", city: "Anytown, ST", price: 485000, status: "active", beds: 3, baths: 2, sqft: 1850 },
    { _id: "s2", address: "48 Example Ave", city: "Maple Grove, ST", price: 629000, status: "pending", beds: 4, baths: 2.5, sqft: 2400 },
    { _id: "s3", address: "7 Placeholder Ct", city: "Riverside, ST", price: 359900, status: "active", beds: 2, baths: 1, sqft: 1100 },
  ],
};
