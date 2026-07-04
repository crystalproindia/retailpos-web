import type { Testimonial } from "@/types/content";

/**
 * PLACEHOLDER testimonials — clearly marked and structured so the admin
 * panel can replace them with verified customer quotes. They are rendered
 * with an "illustrative example" label until placeholder=false.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Stock across our outlets finally matches what the system says. Reordering went from a weekend job to a ten-minute review.",
    name: "Retail chain owner",
    role: "Managing Director",
    company: "Multi-store grocery chain",
    placeholder: true,
  },
  {
    quote:
      "Billing stayed up through festival rush, offline and all. Our cashiers learned the screen in a single morning.",
    name: "Store manager",
    role: "Operations",
    company: "Supermarket",
    placeholder: true,
  },
  {
    quote:
      "The daybook posts itself. Our accountant reviews entries instead of typing them, and GST filing prep takes hours, not days.",
    name: "Finance lead",
    role: "Accounts",
    company: "Fashion retailer",
    placeholder: true,
  },
];
