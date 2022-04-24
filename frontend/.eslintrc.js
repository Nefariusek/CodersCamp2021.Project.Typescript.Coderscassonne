module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/*.config.js', '**/*.js'],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: true,
        natural: false,
        minKeys: 2,
      },
    ],
    semi: ['error', 'always'],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'max-len': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: 'true' }],
  },
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).ts?(x)', 'jest.config.ts', 'setupTests.ts'],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react', 'plugin:jest-formatting/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
};
