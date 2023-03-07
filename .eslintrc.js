module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/vue3-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:security/recommended',
    // 'eslint:recommended',
    '@antfu',
    // './.eslintrc-auto-import.json',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'id-length': [2, { exceptions: ['i', 'j', '_', 'h'] }],
  },
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
