import type { Integration } from "@/types/content";

export const integrations: Integration[] = [
  { slug: "ecommerce", name: "E-commerce", icon: "Globe", description: "Sync catalog, stock and orders with your webstore platform." },
  { slug: "payment-gateways", name: "Payment Gateways", icon: "CreditCard", description: "UPI, cards and wallets reconciled against every bill." },
  { slug: "accounting", name: "Accounting Software", icon: "Calculator", description: "Push clean, structured entries to external accounting systems." },
  { slug: "marketplaces", name: "Marketplaces", icon: "ShoppingBag", description: "List and fulfil marketplace orders from the same stock pool." },
  { slug: "whatsapp", name: "WhatsApp", icon: "MessageCircle", description: "Bills, offers, reminders and order updates on WhatsApp." },
  { slug: "api", name: "Open API", icon: "Braces", description: "REST APIs and webhooks to connect anything else you run." },
];
