module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    camelcase: 'off',
  }
}
