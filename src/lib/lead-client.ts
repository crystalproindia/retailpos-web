"use client";

export type WebsiteLeadSource =
  | "contact"
  | "book_demo"
  | "pricing_enquiry"
  | "landing_page"
  | "talk_to_sales_popup";

export interface WebsiteLeadPayload {
  name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  business_type?: string;
  requirement?: string;
  source: WebsiteLeadSource;
  page_url?: string;
  page_title?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  metadata?: Record<string, unknown>;
  website?: string;
}

export function sanitizeLeadText(value: string, maxLength = 500): string {
  return value.replace(/[\u0000-\u001F\u007F<>]/g, "").trim().slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function getLeadTrackingContext() {
  if (typeof window === "undefined") {
    return {
      page_url: "",
      page_title: "",
      referrer: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    };
  }

  const url = new URL(window.location.href);
  return {
    page_url: url.href,
    page_title: document.title,
    referrer: document.referrer,
    utm_source: url.searchParams.get("utm_source") ?? "",
    utm_medium: url.searchParams.get("utm_medium") ?? "",
    utm_campaign: url.searchParams.get("utm_campaign") ?? "",
  };
}

export async function submitWebsiteLead(payload: WebsiteLeadPayload): Promise<void> {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Lead submission failed.");
}
