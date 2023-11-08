export default {
  extends: ['./index.js', 'plugin:vue/vue3-recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
