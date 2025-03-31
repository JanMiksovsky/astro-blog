import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pondlife-astro.netlify.app",
  // Page URLs look like `/posts/slug.html` instead of `/posts/slug/index.html`
  trailingSlash: "never",
});
