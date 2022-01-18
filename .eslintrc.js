module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  parserOptions: {
    ecmaVersion: 2021
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    'vue/max-attributes-per-line': [2, {
      singleline: 20,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],

  globals: {
    defineProps: 'readonly',
    withDefaults: 'readonly',
    defineEmits: 'readonly',
  }
}
