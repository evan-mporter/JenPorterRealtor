import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

export const listing = defineType({
  name: "listing",
  title: "Featured listing",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "address", title: "Street address", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", title: "City, State", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price (USD)", type: "number", validation: (r) => r.required().positive() }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["active", "pending", "sold"], layout: "radio", direction: "horizontal" },
      initialValue: "active",
      description: "The site shows active and pending listings. It hides sold listings.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "beds", type: "number", validation: (r) => r.min(0).integer() }),
    defineField({ name: "baths", type: "number", validation: (r) => r.min(0) }),
    defineField({ name: "sqft", title: "Square feet", type: "number", validation: (r) => r.min(0).integer() }),
    defineField({ name: "photo", type: "imageWithAlt", validation: (r) => r.required() }),
    defineField({ name: "link", title: "Listing link", type: "url", description: "Full listing on the brokerage site, Zillow, or Realtor.com." }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", description: "Lower numbers show first.", initialValue: 0 }),
  ],
  orderings: [
    { title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
    { title: "Price, high to low", name: "priceDesc", by: [{ field: "price", direction: "desc" }] },
  ],
  preview: {
    select: { title: "address", city: "city", status: "status", price: "price", media: "photo" },
    prepare: ({ title, city, status, price, media }) => ({
      title,
      subtitle: [status?.toUpperCase(), city, price ? `$${Number(price).toLocaleString("en-US")}` : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
