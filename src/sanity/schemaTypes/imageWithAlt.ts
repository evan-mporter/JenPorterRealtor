import { defineField, defineType } from "sanity";

/** An image with required alt text. Alt text is necessary for accessibility and SEO. */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo for screen readers. Example: \"Front of a two-story brick house\".",
      validation: (rule) => rule.required(),
    }),
  ],
});
