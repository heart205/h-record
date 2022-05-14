module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prefer-rest-params': 0, // 关闭使用 rest 参数
    '@typescript-eslint/consistent-type-imports': 'error', // 当只引用类型时，自动加上 type 操作符
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': 'error', // 被prettier标记的地方抛出错误
    '@typescript-eslint/no-var-requires': 'off', // 关闭对文件导入方式的检查
  },
}
