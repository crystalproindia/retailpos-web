/**
 * Operational coverage facts — verified product capabilities only.
 * Replaces the earlier illustrative statistics (40%/3sec/99.9%/1day),
 * which were removed because they were not customer-verified figures.
 */
export interface CoverageFact {
  label: string;
  detail: string;
}

export const coverageFacts: CoverageFact[] = [
  { label: "POS + ERP", detail: "one platform" },
  { label: "Multi-store", detail: "operations & franchise" },
  { label: "Offline-capable", detail: "billing architecture" },
  { label: "Role-based", detail: "workflows & approvals" },
  { label: "Audit trail", detail: "on every transaction" },
  { label: "Omnichannel", detail: "inventory pool" },
  { label: "AI-assisted", detail: "recommendations" },
  { label: "API-ready", detail: "integration architecture" },
];
