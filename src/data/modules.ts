import type { ErpModule } from "@/types/content";

export const erpModules: ErpModule[] = [
  { slug: "procurement", name: "Procurement", icon: "ShoppingCart", description: "Purchase orders, supplier management, GRN and landed cost tracking." },
  { slug: "inventory", name: "Inventory", icon: "Boxes", description: "Multi-location stock, batches, serials, expiry and cycle counts." },
  { slug: "sales", name: "Sales", icon: "BadgePercent", description: "Counter sales, B2B orders, quotations, pricing and promotions." },
  { slug: "finance", name: "Finance", icon: "Landmark", description: "Cash flow, banking, budgets and financial controls." },
  { slug: "accounting", name: "Accounting", icon: "Calculator", description: "Automated ledgers, GST filings support and reconciliation." },
  { slug: "crm", name: "CRM", icon: "HeartHandshake", description: "Customer records, segments, campaigns and service follow-ups." },
  { slug: "customer-loyalty", name: "Customer Loyalty", icon: "Gift", description: "Points, tiers, vouchers and referral programs across channels." },
  { slug: "warehouse-management", name: "Warehouse Management", icon: "Warehouse", description: "Bin locations, picking, packing, transfers and dispatch." },
  { slug: "multi-store-management", name: "Multi-Store Management", icon: "Network", description: "Central control of pricing, stock and reporting across outlets." },
  { slug: "franchise-management", name: "Franchise Management", icon: "GitBranch", description: "Franchisee billing, royalty, replenishment and performance." },
  { slug: "hr-payroll", name: "HR & Payroll", icon: "Users", description: "Attendance, shifts, incentives and payroll for store teams." },
  { slug: "business-intelligence", name: "Business Intelligence", icon: "ChartPie", description: "Cross-module dashboards, KPIs and scheduled insights." },
];
