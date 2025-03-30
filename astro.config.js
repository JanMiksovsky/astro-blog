import { defineConfig } from "astro/config";

export default defineConfig({
  // Page URLs look like `/posts/slug.html` instead of `/posts/slug/index.html`
  trailingSlash: "never",
});
