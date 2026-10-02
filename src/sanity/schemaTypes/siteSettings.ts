import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "agent", title: "Agent", default: true },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
    { name: "legal", title: "Legal" },
  ],
  fields: [
    defineField({ name: "agentName", title: "Agent name", type: "string", group: "agent", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Job title", type: "string", group: "agent", description: "Example: \"REALTOR®\" or \"Licensed Real Estate Salesperson\"." }),
    defineField({ name: "brokerage", title: "Brokerage name", type: "string", group: "agent", validation: (r) => r.required() }),
    defineField({ name: "licenseNumber", title: "License number", type: "string", group: "agent" }),
    defineField({ name: "logo", title: "Logo", type: "imageWithAlt", group: "agent", description: "Optional. If empty, the site shows the agent name as text." }),

    defineField({ name: "phone", title: "Phone", type: "string", group: "contact", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email", type: "email", group: "contact", validation: (r) => r.required() }),
    defineField({ name: "officeAddress", title: "Office address", type: "text", rows: 3, group: "contact" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok", "Zillow", "Realtor.com", "Other"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    defineField({ name: "seoTitle", title: "Page title", type: "string", group: "seo", description: "Shows in the browser tab and in Google results. Keep it under 60 characters.", validation: (r) => r.max(60).warning() }),
    defineField({ name: "seoDescription", title: "Meta description", type: "text", rows: 3, group: "seo", description: "Shows under the title in Google results. Keep it under 160 characters.", validation: (r) => r.max(160).warning() }),
    defineField({ name: "ogImage", title: "Social share image", type: "imageWithAlt", group: "seo", description: "Shows when someone shares the link. Use 1200 × 630 px." }),

    defineField({
      name: "disclaimer",
      title: "Footer disclaimer",
      type: "text",
      rows: 4,
      group: "legal",
      description: "Brokerage, licensing, and fair-housing statements. Ask the broker which statements are required.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
