import prettierRecommended from 'eslint-plugin-prettier/recommended'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['.output/**', '.nuxt/**', 'coverage/**']
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/no-mutating-props': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/no-v-html': 'error'
    }
  },
  prettierRecommended
)
