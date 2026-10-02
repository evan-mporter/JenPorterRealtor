// Used by the Sanity CLI (for example `npx sanity cors add`, `npx sanity schema validate`).
import { defineCliConfig } from "sanity/cli";
import { loadEnv } from "vite";

// Read the same .env file that Astro uses.
const env = loadEnv("development", process.cwd(), "");

export default defineCliConfig({
  api: {
    projectId: env.PUBLIC_SANITY_PROJECT_ID || "placeholder",
    dataset: env.PUBLIC_SANITY_DATASET || "production",
  },
});
