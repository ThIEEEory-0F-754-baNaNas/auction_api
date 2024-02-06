module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^type$' }],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': 'error',
    'func-call-spacing': 'error',
    'rest-spread-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'new-parens': 'error',
    'quotes': ['error', 'single'],
    'space-before-blocks': 'error',
    'space-in-parens': 'error',
    'eqeqeq': ['error', 'smart']
  },
};
