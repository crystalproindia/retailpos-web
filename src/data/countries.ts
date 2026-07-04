/**
 * Sales-market countries with dial codes — powers the demo form country
 * selector and future international phone input. Extend via admin panel.
 */
export interface CountryOption {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dialCode: string;
}

export const countryOptions: CountryOption[] = [
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Singapore", code: "SG", dialCode: "+65" },
  { name: "Malaysia", code: "MY", dialCode: "+60" },
  { name: "Bahrain", code: "BH", dialCode: "+973" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "Other", code: "XX", dialCode: "" },
];
