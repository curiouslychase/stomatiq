import { defineConfig } from "astro/config";

export default defineConfig({
  srcDir: "src",
  server: { host: true, port: 4321 },
});
