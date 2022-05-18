import { defineClientConfig } from '@vuepress/client'
// @ts-ignore
import Layout from './theme/layouts/Layout.vue'
// 指定客户端布局
export default defineClientConfig({
  enhance({ app }) {
    app.component('CustomLayout', Layout)
  },
})
