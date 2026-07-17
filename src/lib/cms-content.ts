import type { Faq } from "@/types/content";

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

const ENTITY_MAP: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: "\"",
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function decodeEntities(value: string): string {
  return value.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (match, entity) => {
    const key = String(entity).toLowerCase();
    if (key.startsWith("#x")) {
      const codePoint = Number.parseInt(key.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    if (key.startsWith("#")) {
      const codePoint = Number.parseInt(key.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }
    return ENTITY_MAP[key] ?? match;
  });
}

function normalizeWhitespace(value: string): string {
  return decodeEntities(value).replace(/\s+/g, " ").trim();
}

export function stripCmsHtml(value: string): string {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, "\n\n")
    .replace(/<[^>]*>/g, " ");
}

export function cmsText(value: unknown, maxLength = 220): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value !== "string") return undefined;
  const text = normalizeWhitespace(stripCmsHtml(value));
  if (!text) return undefined;
  return text.length > maxLength ? `${text.slice(0, maxLength - 3).trimEnd()}...` : text;
}

export function cmsParagraphs(value: unknown, maxParagraphs = 5): string[] {
  if (typeof value !== "string") return [];
  const text = stripCmsHtml(value)
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text
    .split(/\n{2,}/)
    .map((paragraph) => normalizeWhitespace(paragraph))
    .filter(Boolean)
    .slice(0, maxParagraphs);
}

export function safeUrl(value: unknown, { allowRelative = true, allowHttp = true } = {}): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (allowRelative && trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === "https:" || (allowHttp && url.protocol === "http:") ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function safeImageUrl(value: unknown): string | undefined {
  return safeUrl(value);
}

export function stringArray(value: unknown, maxItems = 8): string[] {
  if (typeof value === "string" && value.trim().startsWith("[")) {
    try {
      return stringArray(JSON.parse(value) as unknown, maxItems);
    } catch {
      return [];
    }
  }

  if (Array.isArray(value)) {
    return value.map((item) => cmsText(item, 80)).filter((item): item is string => Boolean(item)).slice(0, maxItems);
  }

  if (typeof value === "string" && value.includes(",")) {
    return value
      .split(",")
      .map((item) => cmsText(item, 80))
      .filter((item): item is string => Boolean(item))
      .slice(0, maxItems);
  }

  const single = cmsText(value, 80);
  return single ? [single] : [];
}

export function faqItems(value: unknown, maxItems = 12): Faq[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!isRecord(item)) return null;
      const question = cmsText(item.question ?? item.q ?? item.title, 180);
      const answer = cmsText(item.answer ?? item.a ?? item.description ?? item.text, 800);
      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is Faq => Boolean(item))
    .slice(0, maxItems);
}

function parseSchema(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function sanitizeSchema(value: unknown, depth = 0): unknown {
  if (depth > 12) return null;
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.map((item) => sanitizeSchema(item, depth + 1)).filter((item) => item !== undefined);
  if (!isRecord(value)) return undefined;

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "__proto__" && key !== "constructor" && key !== "prototype")
      .map(([key, nested]) => [key, sanitizeSchema(nested, depth + 1)])
      .filter(([, nested]) => nested !== undefined),
  );
}

function hasSchemaMarker(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasSchemaMarker);
  if (!isRecord(value)) return false;
  return "@type" in value || "@context" in value || Object.values(value).some(hasSchemaMarker);
}

export function schemaJsonFromCms(value: unknown): JsonLdData | null {
  const sanitized = sanitizeSchema(parseSchema(value));
  if (!hasSchemaMarker(sanitized)) return null;
  if (Array.isArray(sanitized)) {
    const records = sanitized.filter(isRecord);
    return records.length ? records : null;
  }
  return isRecord(sanitized) ? sanitized : null;
}
