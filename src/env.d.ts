/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ANALYTICS_ENABLED?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
