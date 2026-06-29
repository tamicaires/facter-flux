import { Config } from 'tailwindcss';

/**
 * Facter Design System - Tailwind Preset
 *
 * Uso:
 * ```ts
 * // tailwind.config.ts
 * import { facterPreset } from '@facter/ds-core/themes/tailwind-preset'
 *
 * export default {
 *   presets: [facterPreset],
 *   content: ['./src/** /*.{ts,tsx}'],
 * } satisfies Config
 * ```
 */
declare const facterPreset: Partial<Config>;

export { facterPreset as default, facterPreset };
