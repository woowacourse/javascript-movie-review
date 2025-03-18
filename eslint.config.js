import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "max-depth": ["error", 1],
      "max-params": ["error", 3],
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
      ],
    },
  },
];
