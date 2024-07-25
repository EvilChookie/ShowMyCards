/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  semi: false,
  bracketSameLine: true,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
