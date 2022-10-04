import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import StylelintPlugin from 'vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    eslint(),
    StylelintPlugin({}),
  ],
});