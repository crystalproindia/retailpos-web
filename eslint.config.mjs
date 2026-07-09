import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat ESLint config replacing the deprecated `next lint` runner.
 * Run via `npm run lint` (eslint CLI).
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: [".next/**", "node_modules/**", "out/**"] },
];

export default config;
