import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/**
 * Flat ESLint config replacing the deprecated `next lint` runner.
 * Run via `npm run lint` (eslint CLI).
 */
const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "out/**"] },
];

export default config;
