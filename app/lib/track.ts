declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends a conversion/engagement event to GA4 (via gtag) and to GTM (via dataLayer),
// so it can be marked as a key event in GA4 or used as a GTM trigger.
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}
