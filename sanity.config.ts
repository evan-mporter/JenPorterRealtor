import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./src/sanity/structure";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Realtor Site",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Vision is a GROQ query playground. It is useful for you, not for the editor.
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Singletons can be edited and published, but not duplicated or deleted.
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) =>
            action ? ["publish", "discardChanges", "restore"].includes(action) : false,
          )
        : actions,
  },
});
