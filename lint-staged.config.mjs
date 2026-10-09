export default {
  '*.{js,mjs,cjs,ts,mts,cts,tsx,jsx,vue}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{json,jsonc,css,scss,html,md,yaml,yml}': 'prettier --write'
}
