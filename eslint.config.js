import js from "@eslint/js"
import globals from "globals"
import pluginReact from "eslint-plugin-react"
import eslintConfigPrettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
])
