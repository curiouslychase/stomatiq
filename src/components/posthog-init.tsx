"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function PostHogInit() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      return;
    }

    // Initialize PostHog once on the client
    if (!(posthog as unknown as { _isInitialized: boolean })._isInitialized) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
        loaded: () => {
          (posthog as unknown as { _isInitialized: boolean })._isInitialized =
            true;
        },
      });
    }
  }, []);

  return null;
}
