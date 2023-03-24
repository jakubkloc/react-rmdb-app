module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true,
      allowNamedExports: false,
    }],

  },
};
