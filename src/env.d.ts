/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ANALYTICS_ENABLED?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_AUDIENCE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
