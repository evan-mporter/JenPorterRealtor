import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";

/** Document types that have exactly one document. */
export const SINGLETON_TYPES = new Set(["siteSettings", "landingPage"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Landing page")
        .icon(HomeIcon)
        .child(S.document().schemaType("landingPage").documentId("landingPage")),
      S.documentTypeListItem("listing").title("Featured listings").icon(TagIcon),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
