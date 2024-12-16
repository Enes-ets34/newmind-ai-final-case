// server/eslint.config.js
module.exports = [
  {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
    },
  },
  {
    // ESLint: recommended configuration
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    // React Plugin: recommended configuration
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    // Prettier Plugin: recommended configuration
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'es5' }],
    },
  },
];
