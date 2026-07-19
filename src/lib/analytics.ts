export type AnalyticsEventName =
  | "whatsapp_floating_click"
  | "whatsapp_country_selected"
  | "whatsapp_mobile_nav_click"
  | "talk_to_sales_open"
  | "talk_to_sales_submit"
  | "talk_to_sales_success"
  | "talk_to_sales_error"
  | "talk_to_sales_country_changed";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}
