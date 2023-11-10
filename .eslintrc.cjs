module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': 0,
    semi: [2, 'never'],
    'no-unused-vars': 1,
    quotes: 0,
    'comma-dangle': [2, 'never'],
    'no-unused-expressions': [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ]
  }
}
