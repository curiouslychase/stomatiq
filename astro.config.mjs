import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  srcDir: "src",
  server: { host: true, port: 4321 },
  integrations: [mdx()],
});
