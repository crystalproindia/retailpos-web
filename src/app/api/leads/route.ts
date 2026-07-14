import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const allowedSources = ["contact", "book_demo", "pricing_enquiry", "landing_page"] as const;

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
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
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
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function metadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function isLeadSource(value: string): value is LeadSource {
  return allowedSources.includes(value as LeadSource);
}

function validate(payload: IncomingLeadPayload): { lead?: LeadPayload; errors?: string[] } {
  const source = text(payload.source, 80);
  const lead: LeadPayload = {
    name: text(payload.name, 160),
    company_name: text(payload.company_name, 200),
    email: text(payload.email, 200).toLowerCase(),
    phone: text(payload.phone, 80),
    city: text(payload.city, 120),
    country: text(payload.country, 120),
    business_type: text(payload.business_type, 160),
    requirement: text(payload.requirement, 2000),
    source: isLeadSource(source) ? source : "landing_page",
    page_url: text(payload.page_url, 1000),
    utm_source: text(payload.utm_source, 200),
    utm_medium: text(payload.utm_medium, 200),
    utm_campaign: text(payload.utm_campaign, 200),
    metadata: metadata(payload.metadata),
  };

  const errors: string[] = [];
  if (!lead.name) errors.push("name");
  if (!lead.company_name) errors.push("company_name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email");
  if (!/^[+\d][\d\s-]{7,20}$/.test(lead.phone)) errors.push("phone");
  if (!lead.business_type) errors.push("business_type");

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
