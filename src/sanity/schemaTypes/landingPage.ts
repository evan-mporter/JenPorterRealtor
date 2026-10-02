import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "services", title: "Services & areas" },
    { name: "listings", title: "Listings section" },
    { name: "testimonials", title: "Testimonials" },
    { name: "contact", title: "Contact section" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "hero", validation: (r) => r.required().max(80) }),
    defineField({ name: "heroSubheadline", title: "Subheadline", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroImage", title: "Background photo", type: "imageWithAlt", group: "hero", description: "Use a wide photo, at least 2000 px across." }),
    defineField({ name: "ctaLabel", title: "Button text", type: "string", group: "hero", initialValue: "Get in touch" }),

    // About
    defineField({ name: "aboutHeading", title: "Heading", type: "string", group: "about", initialValue: "About me" }),
    defineField({ name: "aboutPhoto", title: "Headshot", type: "imageWithAlt", group: "about" }),
    defineField({
      name: "aboutBody",
      title: "Text",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
        }),
      ],
    }),

    // Services & areas
    defineField({ name: "servicesHeading", title: "Heading", type: "string", group: "services", initialValue: "How I can help" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "services",
      of: [
        defineArrayMember({
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
        }),
      ],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: "areasServed",
      title: "Areas served",
      type: "array",
      group: "services",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Type a town or neighborhood and press Enter.",
    }),

    // Listings
    defineField({ name: "listingsHeading", title: "Heading", type: "string", group: "listings", initialValue: "Featured listings" }),
    defineField({ name: "listingsIntro", title: "Intro text", type: "text", rows: 2, group: "listings" }),

    // Testimonials
    defineField({ name: "testimonialsHeading", title: "Heading", type: "string", group: "testimonials", initialValue: "What clients say" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      description: "Use real client reviews only, with the client's permission.",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
            defineField({ name: "name", title: "Client name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "context", type: "string", description: "Example: \"Bought in Maple Grove, 2026\"." }),
          ],
          preview: { select: { title: "name", subtitle: "quote" } },
        }),
      ],
    }),

    // Contact
    defineField({ name: "contactHeading", title: "Heading", type: "string", group: "contact", initialValue: "Let's talk" }),
    defineField({ name: "contactBody", title: "Text", type: "text", rows: 3, group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Landing page" }) },
});
