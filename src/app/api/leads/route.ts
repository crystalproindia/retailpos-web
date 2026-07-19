import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const allowedSources = ["contact", "book_demo", "pricing_enquiry", "landing_page", "talk_to_sales_popup"] as const;

type LeadSource = (typeof allowedSources)[number];

interface IncomingLeadPayload {
  name?: unknown;
  company_name?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
  country?: unknown;
  business_type?: unknown;
  requirement?: unknown;
  source?: unknown;
  page_url?: unknown;
  page_title?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  country_code?: unknown;
  whatsapp_preferred?: unknown;
  metadata?: unknown;
  website?: unknown;
}

interface LeadPayload {
  name: string;
  company_name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  business_type: string;
  requirement: string;
  source: LeadSource;
  page_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  metadata: Record<string, unknown>;
}

function text(value: unknown, maxLength = 500): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F<>]/g, "").trim().slice(0, maxLength) : "";
}

function metadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const safe: Record<string, unknown> = {};

  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    const safeKey = text(key, 80);
    if (!safeKey) continue;

    if (typeof entry === "string") {
      safe[safeKey] = text(entry, 500);
    } else if (typeof entry === "number" || typeof entry === "boolean" || entry === null) {
      safe[safeKey] = entry;
    }
  }

  return safe;
}

function isLeadSource(value: string): value is LeadSource {
  return allowedSources.includes(value as LeadSource);
}

function validate(payload: IncomingLeadPayload): { lead?: LeadPayload; errors?: string[] } {
  const source = text(payload.source, 80);
  const leadSource = isLeadSource(source) ? source : "landing_page";
  const leadMetadata = metadata(payload.metadata);
  const pageTitle = text(payload.page_title, 300);
  const referrer = text(payload.referrer, 1000);
  const countryCode = text(payload.country_code, 8).toUpperCase();

  if (pageTitle && typeof leadMetadata.page_title === "undefined") leadMetadata.page_title = pageTitle;
  if (referrer && typeof leadMetadata.referrer === "undefined") leadMetadata.referrer = referrer;
  if (countryCode && typeof leadMetadata.country_code === "undefined") leadMetadata.country_code = countryCode;
  if (typeof payload.whatsapp_preferred === "boolean" && typeof leadMetadata.whatsapp_preferred === "undefined") {
    leadMetadata.whatsapp_preferred = payload.whatsapp_preferred;
  }

  const lead: LeadPayload = {
    name: text(payload.name, 160),
    company_name: text(payload.company_name, 200),
    email: text(payload.email, 200).toLowerCase(),
    phone: text(payload.phone, 80),
    city: text(payload.city, 120),
    country: text(payload.country, 120),
    business_type: text(payload.business_type, 160),
    requirement: text(payload.requirement, 2000),
    source: leadSource,
    page_url: text(payload.page_url, 1000),
    utm_source: text(payload.utm_source, 200),
    utm_medium: text(payload.utm_medium, 200),
    utm_campaign: text(payload.utm_campaign, 200),
    metadata: leadMetadata,
  };

  const errors: string[] = [];
  if (lead.source === "talk_to_sales_popup") {
    if (!/^\+\d{8,15}$/.test(lead.phone)) errors.push("phone");
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email");
  } else {
    if (!lead.name) errors.push("name");
    if (!lead.company_name) errors.push("company_name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email");
    if (!/^[+\d][\d\s-]{7,20}$/.test(lead.phone)) errors.push("phone");
    if (!lead.business_type) errors.push("business_type");
  }

  return errors.length ? { errors } : { lead };
}

function genericSuccess() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(request: Request) {
  let payload: IncomingLeadPayload;

  try {
    payload = (await request.json()) as IncomingLeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (text(payload.website, 300)) return genericSuccess();

  const { lead, errors } = validate(payload);
  if (!lead) {
    return NextResponse.json({ ok: false, message: "Please check the form fields.", fields: errors }, { status: 422 });
  }

  const apiUrl = process.env.RETAILPOS_PLATFORM_LEAD_API_URL;
  const leadToken = process.env.RETAILPOS_PUBLIC_LEAD_TOKEN;

  if (!apiUrl || !leadToken) {
    return NextResponse.json({ ok: false, message: "Lead intake is not configured." }, { status: 503 });
  }

  try {
    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-RetailPOS-Lead-Token": leadToken,
      },
      body: JSON.stringify(lead),
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false, message: "Lead intake failed." }, { status: 502 });
    }

    return genericSuccess();
  } catch {
    return NextResponse.json({ ok: false, message: "Lead intake failed." }, { status: 502 });
  }
}
