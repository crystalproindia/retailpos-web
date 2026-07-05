import type { LandingPage } from "@/lib/landing-pages/types";

export const industryPages: LandingPage[] = [
  {
    slug: "supermarkets", family: "industries", name: "Supermarkets",
    eyebrow: "Industry", title: "Supermarket billing and ERP software for high-volume lanes",
    metaTitle: "Supermarket POS & ERP Software — Fast Lanes, Fresh & Multi-Store",
    metaDescription: "POS and ERP for supermarkets: fast checkout lanes, weighing-scale integration, fresh and expiry control, shelf-level replenishment and multi-store operations.",
    intro: "A supermarket lives on throughput and shrink control. RetailPOS pairs barcode-first checkout lanes with expiry-aware inventory and replenishment, so fast lanes and fresh sections both stay under control.",
    problems: [
      { problem: "Peak-hour queues at checkout", solution: "Barcode-first billing with offline continuity keeps every lane moving." },
      { problem: "Wastage in fresh and dairy", solution: "Batch and expiry control with FEFO picking and expiry alerts." },
      { problem: "Thousands of SKUs to reorder", solution: "Reorder rules and AI forecasts draft daily purchase plans." },
    ],
    features: [
      { icon: "ShoppingBasket", title: "Lane-speed billing", description: "High-volume checkout with scanner and scale support." },
      { icon: "Scale", title: "Weighing integration", description: "Weighed items billed by barcode-embedded weight." },
      { icon: "Pill", title: "Expiry control", description: "Batch-wise expiry alerts across fresh categories." },
      { icon: "Network", title: "Multi-branch", description: "Central pricing and stock across branches." },
    ],
    useCases: [
      { title: "Festival rush", description: "Offline-capable lanes and cashier shift control keep billing continuous through the busiest days." },
      { title: "Daily replenishment", description: "Category-wise reorder suggestions turn into supplier POs each morning." },
    ],
    faqs: [
      { question: "Does the POS work with weighing scales?", answer: "Yes. Weighing-scale integration supports weight-embedded barcodes, so loose items bill as fast as packaged goods." },
      { question: "How does it reduce wastage in fresh categories?", answer: "Batch and expiry tracking with FEFO picking surfaces near-expiry stock daily, so it can be promoted or returned before it becomes shrink." },
      { question: "Can multiple billing counters share one stock?", answer: "Yes. All lanes bill against the same live store stock, and every sale updates it instantly." },
    ],
    related: [
      { family: "products", slug: "pos-software" },
      { family: "industries", slug: "grocery-kirana" },
      { family: "solutions", slug: "multi-store-retail" },
    ],
  },
  {
    slug: "grocery-kirana", family: "industries", name: "Grocery & Kirana",
    eyebrow: "Industry", title: "Grocery and kirana billing software with khata and quick reorder",
    metaTitle: "Grocery & Kirana Billing Software — Fast Billing, Credit Khata",
    metaDescription: "Simple, fast billing for grocery and kirana stores: barcode or quick-key billing, customer credit khata, reorder alerts and WhatsApp bill sharing.",
    intro: "A kirana counter has no time for complicated software. RetailPOS keeps billing to a scan or a quick key, tracks customer khata credit honestly, and tells you what to reorder before shelves go empty.",
    problems: [
      { problem: "Credit sales tracked in notebooks", solution: "Digital khata per customer with outstanding, history and reminders." },
      { problem: "Running out of daily essentials", solution: "Reorder alerts based on actual sales rates per item." },
    ],
    features: [
      { icon: "Zap", title: "Quick billing", description: "Barcode or shortcut keys for loose and packaged items." },
      { icon: "CreditCard", title: "Credit khata", description: "Party-wise credit with limits and gentle reminders." },
      { icon: "MessageCircle", title: "WhatsApp bills", description: "Send bills and offers on WhatsApp." },
      { icon: "PackageCheck", title: "Reorder alerts", description: "Low-stock flags from real sales velocity." },
    ],
    faqs: [
      { question: "Is it simple enough for a family-run store?", answer: "Yes. Daily billing needs only the billing screen, and item entry can start from a ready catalog with barcode lookup — most owners run it without formal training." },
      { question: "Can I track customers who buy on credit?", answer: "Yes. Each customer's khata records credit bills and payments, shows outstanding at billing time, and supports limits and reminders." },
      { question: "Does it need constant internet?", answer: "No. Billing works offline and syncs when connectivity returns, which suits areas with unstable connections." },
    ],
    related: [
      { family: "products", slug: "billing-software" },
      { family: "industries", slug: "supermarkets" },
      { family: "solutions", slug: "small-business" },
    ],
  },
  {
    slug: "fashion-apparel", family: "industries", name: "Fashion & Apparel",
    eyebrow: "Industry", title: "Fashion retail software for size, colour, season and markdown",
    metaTitle: "Fashion & Apparel Retail Software — Size-Colour Matrix & Markdowns",
    metaDescription: "Apparel retail on a size-colour matrix: variant inventory, seasons, markdown workflows, style-level analytics and multi-store stock balancing.",
    intro: "Apparel is inventory in two dimensions: every style explodes into sizes and colours, and every season ends in markdowns. RetailPOS manages the matrix natively — buying, selling and analysing at both style and SKU level.",
    problems: [
      { problem: "Broken size runs kill style sales", solution: "Matrix stock views show gaps per store; transfers rebalance sets." },
      { problem: "Season-end stock erodes margin", solution: "Ageing reports and markdown workflows move stock while it still sells." },
    ],
    features: [
      { icon: "Shirt", title: "Size-colour matrix", description: "Buy, stock and sell styles as variant grids." },
      { icon: "Tags", title: "Markdown workflow", description: "Planned markdowns with approval and effective dates." },
      { icon: "ChartColumnIncreasing", title: "Style analytics", description: "Sell-through by style, size, colour and store." },
      { icon: "ArrowLeftRight", title: "Stock balancing", description: "Inter-store transfers to complete size runs." },
    ],
    useCases: [
      { title: "Season launch", description: "Matrix purchase orders allocate size runs per store from one buy sheet." },
      { title: "End of season", description: "Ageing and sell-through reports drive a staged markdown calendar." },
    ],
    faqs: [
      { question: "Can I bill and count stock at SKU level but analyse by style?", answer: "Yes. Every variant is a distinct SKU for billing and stock, while reports roll up to style, category and season automatically." },
      { question: "How do exchanges for a different size work?", answer: "Bill-linked exchanges swap variants in one step, adjusting stock for both sizes and keeping the customer's history intact." },
      { question: "Does it support seasonal pricing?", answer: "Yes. Price lists and markdown schedules carry effective dates, so season transitions happen on time across stores." },
    ],
    related: [
      { family: "industries", slug: "footwear" },
      { family: "products", slug: "retail-crm" },
      { family: "solutions", slug: "multi-store-retail" },
    ],
  },
  {
    slug: "footwear", family: "industries", name: "Footwear",
    eyebrow: "Industry", title: "Footwear retail software built around the size run",
    metaTitle: "Footwear Retail Software — Size-Run Inventory & Exchange Workflows",
    metaDescription: "Footwear POS and inventory: size-run stock views, pair-level accuracy, exchange-heavy counter workflows and store-to-store balancing.",
    intro: "Footwear sells in runs and returns in pairs. RetailPOS keeps size-run visibility per style per store, and makes exchanges — the daily reality of shoe retail — a single counter action.",
    features: [
      { icon: "Footprints", title: "Size-run views", description: "Style-wise size grids showing gaps at a glance." },
      { icon: "Undo2", title: "Fast exchanges", description: "Size swaps as one bill-linked action." },
      { icon: "ArrowLeftRight", title: "Run balancing", description: "Transfers rebuild broken runs across stores." },
      { icon: "ChartColumnIncreasing", title: "Sell-through", description: "Size-curve analytics improve the next buy." },
    ],
    faqs: [
      { question: "Can the system suggest which sizes to buy?", answer: "Size-curve reports show how each style actually sold by size, so purchase orders reflect real demand instead of standard ratios." },
      { question: "How are exchanges handled at the counter?", answer: "An exchange references the original bill, swaps the variant, settles any price difference and corrects stock for both sizes in one step." },
      { question: "Can I check another store's stock for a missing size?", answer: "Yes. Counter staff can see network-wide availability for the style and size, and raise a transfer or reserve on the spot." },
    ],
    related: [
      { family: "industries", slug: "fashion-apparel" },
      { family: "products", slug: "inventory-management" },
      { family: "products", slug: "pos-software" },
    ],
  },
  {
    slug: "electronics", family: "industries", name: "Electronics",
    eyebrow: "Industry", title: "Electronics retail software with serial and IMEI control",
    metaTitle: "Electronics Retail Software — Serial/IMEI Tracking & Warranty",
    metaDescription: "Electronics and mobile retail: serial and IMEI tracking, warranty records, EMI sales notes, high-value stock control and service history.",
    intro: "In electronics, every unit has an identity. RetailPOS tracks serial and IMEI numbers from GRN to sale, keeps warranty records against each unit, and controls high-value stock with unit-level audits.",
    problems: [
      { problem: "Which exact unit did we sell?", solution: "Serial/IMEI captured at receiving and billing gives every unit a full history." },
      { problem: "Warranty disputes without records", solution: "Purchase date and warranty terms stored against the serial number." },
    ],
    features: [
      { icon: "Smartphone", title: "Serial/IMEI tracking", description: "Unit identity from GRN through sale and return." },
      { icon: "ShieldCheck", title: "Warranty records", description: "Terms and dates recorded per unit at billing." },
      { icon: "Lock", title: "High-value control", description: "Unit-level stock audits and movement approval." },
      { icon: "CreditCard", title: "Payment flexibility", description: "Multiple tender types recorded against each sale." },
    ],
    faqs: [
      { question: "Is scanning serial numbers mandatory at billing?", answer: "For serial-tracked categories, yes — the bill requires a valid in-stock serial, which is what makes unit history and warranty records reliable." },
      { question: "Can I find the buyer of a specific IMEI later?", answer: "Yes. Searching the serial or IMEI returns its full trail: supplier, GRN, store, bill, customer and any return or service entry." },
      { question: "How are demo units handled?", answer: "Units can be marked as demo stock, keeping them visible in inventory but excluded from saleable availability until released." },
    ],
    related: [
      { family: "products", slug: "inventory-management" },
      { family: "modules", slug: "inventory" },
      { family: "products", slug: "billing-software" },
    ],
  },
  {
    slug: "pharmacy", family: "industries", name: "Pharmacy",
    eyebrow: "Industry", title: "Pharmacy software with batch, expiry and schedule control",
    metaTitle: "Pharmacy Billing Software — Batch, Expiry & Schedule Drug Control",
    metaDescription: "Pharmacy retail: batch and expiry management, FEFO dispensing, schedule-drug controls, substitute suggestions and refill reminders.",
    intro: "Pharmacy retail is regulated inventory. RetailPOS enforces batch and expiry discipline at billing, supports schedule-drug record keeping, and helps counters suggest substitutes and remind patients about refills.",
    problems: [
      { problem: "Expired stock reaching the counter", solution: "FEFO dispensing and expiry blocks stop out-of-date batches at billing." },
      { problem: "Schedule-drug registers maintained by hand", solution: "Structured records captured at billing support register requirements." },
    ],
    features: [
      { icon: "Pill", title: "Batch & expiry", description: "FEFO picking with near-expiry alerts and billing blocks." },
      { icon: "ScrollText", title: "Schedule records", description: "Prescription details captured for regulated categories." },
      { icon: "Sparkle", title: "Substitutes", description: "Same-composition alternatives suggested when out of stock." },
      { icon: "BellRing", title: "Refill reminders", description: "Repeat-purchase reminders from sales history." },
    ],
    faqs: [
      { question: "Can billing be blocked for expired batches?", answer: "Yes. Expired batches are blocked at billing, and near-expiry stock is flagged daily so it can be returned to suppliers in time." },
      { question: "How are substitutes suggested?", answer: "Items can be grouped by composition, so when a brand is out of stock the counter sees in-stock equivalents immediately." },
      { question: "Does it help with schedule-drug compliance?", answer: "Billing captures prescription and doctor details for configured categories, keeping structured records to support your register obligations. Regulatory responsibility remains with the pharmacy." },
    ],
    related: [
      { family: "products", slug: "inventory-management" },
      { family: "products", slug: "retail-crm" },
      { family: "solutions", slug: "small-business" },
    ],
  },
  {
    slug: "restaurants", family: "industries", name: "Restaurants",
    eyebrow: "Industry", title: "Restaurant POS software for dine-in, takeaway and delivery",
    metaTitle: "Restaurant POS Software — Tables, KOT, Takeaway & Delivery",
    metaDescription: "Restaurant billing with table management, KOT/kitchen tickets, takeaway and delivery orders, recipe-based inventory and daily food-cost visibility.",
    intro: "A restaurant is retail at table speed: orders move to the kitchen, tables turn, and ingredients deplete by recipe. RetailPOS handles the order flow front-of-house and the food-cost math behind it.",
    features: [
      { icon: "UtensilsCrossed", title: "Table & KOT", description: "Table plans, kitchen tickets and course sequencing." },
      { icon: "Truck", title: "Takeaway & delivery", description: "Parcel and delivery orders alongside dine-in." },
      { icon: "Boxes", title: "Recipe inventory", description: "Sales deplete ingredients by recipe for food-cost control." },
      { icon: "Users", title: "Shift control", description: "Cashier shifts, day-close and settlement reports." },
    ],
    faqs: [
      { question: "How do orders reach the kitchen?", answer: "Items fire as kitchen tickets (KOT) by station, with modifiers and course timing, so the kitchen cooks from the same order the table placed." },
      { question: "Can inventory track ingredients rather than dishes?", answer: "Yes. Recipes map dishes to ingredients, so each sale depletes raw materials and food-cost reports compare theoretical against actual usage." },
      { question: "Does one system handle dine-in, parcel and delivery?", answer: "Yes. All order types run on the same billing engine with type-wise pricing and reporting." },
    ],
    related: [
      { family: "products", slug: "pos-software" },
      { family: "modules", slug: "inventory" },
      { family: "solutions", slug: "small-business" },
    ],
  },
  {
    slug: "jewellery", family: "industries", name: "Jewellery",
    eyebrow: "Industry", title: "Jewellery billing software for karat, weight and rate-board pricing",
    metaTitle: "Jewellery Billing Software — Karat/Weight Billing & Old-Gold Exchange",
    metaDescription: "Jewellery retail: karat and weight-based billing, daily rate boards, making charges, old-gold exchange and high-value stock audit trails.",
    intro: "Jewellery pricing is metal maths: weight × rate + making, against a rate that changes daily. RetailPOS bills by karat and weight from the day's rate board, handles old-gold exchange, and keeps unit-level custody trails on high-value stock.",
    features: [
      { icon: "Gem", title: "Karat & weight billing", description: "Gross, net and stone weights priced from the rate board." },
      { icon: "TrendingUp", title: "Daily rate board", description: "Metal rates set once, applied across counters." },
      { icon: "ArrowLeftRight", title: "Old-gold exchange", description: "Exchange valuation netted against the new purchase." },
      { icon: "Lock", title: "Custody control", description: "Piece-level tagging, movement approval and audits." },
    ],
    faqs: [
      { question: "How are making charges configured?", answer: "Making charges apply per gram, per piece or as a percentage, by category or item, and appear as distinct lines on the invoice." },
      { question: "Can old gold be exchanged against a purchase?", answer: "Yes. Old-gold valuation by weight and purity is captured on the bill and netted against the new item's value with a full record." },
      { question: "How is high-value stock audited?", answer: "Every tagged piece carries a movement trail, and physical audits reconcile piece-by-piece with variance reports before adjustments." },
    ],
    related: [
      { family: "products", slug: "billing-software" },
      { family: "products", slug: "inventory-management" },
      { family: "modules", slug: "finance" },
    ],
  },
];
