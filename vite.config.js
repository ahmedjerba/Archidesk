import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const compatPath = `${rootDir}node_modules/preact/compat/dist/compat.mjs`
const jsxRuntimePath = `${rootDir}node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs`

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({ reactAliasesEnabled: false })],
  resolve: {
    alias: {
      react: compatPath,
      'preact/compat': compatPath,
      'react-dom': compatPath,
      'react/jsx-runtime': jsxRuntimePath,
    },
  },
})
