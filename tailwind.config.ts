import type { Config } from 'tailwindcss'
import { facterPreset } from '@facter/ds-core/themes/tailwind-preset'

const config: Config = {
  presets: [facterPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@facter/ds-core/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
