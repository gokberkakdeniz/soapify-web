module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["react", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    JSX: "readonly",
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-underscore-dangle": ["off"],
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    "func-names": ["error", "always", { generators: "never" }],
    "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "default-param-last": "off",
    "no-restricted-exports": "off",
    quotes: ["error", "double"],
    semi: "off",
    camelcase: "off",
    "prettier/prettier": "error",
    "arrow-body-style": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
