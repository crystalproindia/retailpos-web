import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const modal = read("src/components/forms/TalkToSalesModal.tsx");
const api = read("src/app/api/leads/route.ts");
const leadClient = read("src/lib/lead-client.ts");
const layout = read("src/app/layout.tsx");
const header = read("src/components/layout/Header.tsx");
const mobileNav = read("src/components/layout/MobileNav.tsx");
const countries = read("src/data/countries.ts");
const analytics = read("src/lib/analytics.ts");

assert(layout.includes("<TalkToSalesProvider"), "Root layout must mount the Talk to Sales provider.");
assert(header.includes("TalkToSalesButton") && header.includes('trigger="desktop_nav"'), "Desktop nav CTA must open the popup.");
assert(mobileNav.includes("TalkToSalesButton") && mobileNav.includes('trigger="mobile_nav"'), "Mobile nav CTA must open the popup.");
assert(mobileNav.includes('trigger="mobile_quick_link"'), "Mobile quick-link Talk to Sales tile must open the popup.");

assert(modal.includes('source: "talk_to_sales_popup"'), "Popup lead source must be talk_to_sales_popup.");
assert(modal.includes("submitWebsiteLead"), "Popup must use the existing website lead submission helper.");
assert(leadClient.includes('fetch("/api/leads"'), "Lead helper must submit to the existing /api/leads proxy.");
assert(!leadClient.includes("RETAILPOS_PUBLIC_LEAD_TOKEN"), "Client lead helper must not expose the server lead token.");

assert(modal.includes('const india = countryOptions.find((country) => country.code === "IN")'), "Default country must be India.");
assert(countries.includes('{ name: "India", code: "IN", dialCode: "+91" }'), "India +91 must exist in country data.");
assert(modal.includes("flagFor("), "Country selector must render country flags.");
assert(modal.includes("Search countries"), "Country selector must be searchable.");
assert(modal.includes("talk_to_sales_country_changed"), "Country changes must be tracked without PII.");

assert(modal.includes("normalizePhoneNumber"), "Popup must normalize international phone numbers.");
assert(modal.includes("Enter your mobile number."), "Mobile number must be required.");
assert(modal.includes("email && !isValidEmail(email)"), "Email must be optional and validated only when entered.");
assert(modal.includes("submittingRef.current"), "Repeated rapid submissions must be blocked.");
assert(modal.includes("website") && api.includes("genericSuccess"), "Honeypot behavior must remain generic.");

assert(api.includes('"talk_to_sales_popup"'), "API proxy must allow the popup source.");
assert(api.includes('lead.source === "talk_to_sales_popup"'), "API validation must be source-aware for popup leads.");
assert(api.includes("metadata: leadMetadata"), "Popup-only fields must be carried through metadata.");

[
  "talk_to_sales_open",
  "talk_to_sales_submit",
  "talk_to_sales_success",
  "talk_to_sales_error",
  "talk_to_sales_country_changed",
].forEach((eventName) => {
  assert(analytics.includes(eventName), `Analytics event ${eventName} must be typed.`);
  assert(modal.includes(eventName), `Analytics event ${eventName} must be emitted by the modal.`);
});

assert(modal.includes('role="dialog"') && modal.includes('aria-modal="true"'), "Popup must use dialog semantics.");
assert(modal.includes("trapFocus"), "Popup must trap focus for keyboard users.");
assert(modal.includes('event.key === "Escape"'), "Escape key must close the popup when not submitting.");
assert(modal.includes("closeModal") && modal.includes("status === \"submitting\""), "Popup must not close during submission.");

console.log("Talk to Sales popup verification passed.");
