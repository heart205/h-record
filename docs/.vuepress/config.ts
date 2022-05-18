import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { path } = require('@vuepress/utils')
export default defineUserConfig({
  // 站点配置
  lang: 'zh-CN',
  title: 'Heart',
  description: 'heart',
  // 主题和它的配置
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [path.resolve(__dirname, './lib/statistic.ts'), true],
    [
      {
        name: 'statisticString',
        clientAppSetupFiles: () => {
          return path.resolve(__dirname, './lib/useSetup.ts')
        },
      },
      true,
    ],
  ],
})
