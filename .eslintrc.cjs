module.exports = {
  env: {
    // 环境，针对哪些环境的语法
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 集成了哪些规则，别人写好的规则直接拿来用
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended", // typescript 规则
    "@vue/prettier",
    "./.eslintrc-auto-import.json"
  ],
  overrides: [],
  // parser: "@typescript-eslint/parser",
  parser: "vue-eslint-parser", //解析.vue文件
  parserOptions: {
    parser: "@typescript-eslint/parser", // 解析.ts文件
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // 我们自定义的规则写在这里
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, // 使用单引号
        semi: true, // 末尾添加分号
        tabWidth: 2,
        trailingComma: "none",
        useTabs: false,
        endOfLine: "auto"
      }
    ]
  },
  globals: {
    defineOptions: "readonly"
  }
};
