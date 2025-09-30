import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Astro configuration
export default defineConfig({
  integrations: [react()],
  srcDir: "src",
  server: { host: true, port: 4321 },
});
