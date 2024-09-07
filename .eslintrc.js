module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["./src/**/*.js"],
      extends: ["airbnb/base", "prettier"],
    },
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
