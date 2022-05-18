<template>
  <div>
    <div class="heart-main bgc">
      <img src="../../assets/image/main.png" alt="" />
    </div>
    <div class="container">
      <div class="siderbar">
        <template v-for="(item, index) in titles" :key="index">
          <SiderBar :titles="item" />
        </template>
      </div>
      <main class="flex-1">
        <Content ref="container" />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import type { titles } from '../../types/layouts'
import SiderBar from './sidebar.vue'
type T = HTMLCollection | null
export default {
  name:'Layout',
  data() {
    const data: {
      titles: Array<titles>
    } = {
      titles: [],
    }
    return data
  },
  components: {
    SiderBar,
  },
  methods: {
    // 推测title的标题是第几标题
    // TODO: 判断数字开头的情况
    inferTitleNumber(title: string): number {
      const reg = /H([1-6])/
      if (reg.test(title)) {
        return Number.parseInt(RegExp.$1)
      }
      return NaN
    },
    // 添加标题至titles中
    addTitle(num: number, text: string) {
      const obj = {
        type: `H${num}`,
        text,
        children: null,
      }
      if (this.titles.length === 0) {
        this.titles.push(obj)
        return
      }
      let tree: titles = this.titles[this.titles.length - 1] // 最终的树
      let result: titles | null = null
      while (true) {
        const len = this.inferTitleNumber(tree.type)
        if (len >= num) {
          break
        }
        result = tree
        if (tree.children) {
          tree = tree.children[tree.children.length - 1]
        } else {
          break
        }
      }
      if (result !== null) {
        if (!result.children) result.children = []
        result.children.push(obj)
      } else {
        this.titles.push(obj)
      }
    },
  },
  mounted() {
    // 获取侧边栏状态栏
    const total = ['H1', 'H2', 'H3', 'H4', 'H5']
    let titleCollection: T =
      ((this.$refs.container as HTMLHeadElement) &&
        (this.$refs.container as HTMLHeadElement).parentNode &&
        (this.$refs.container as HTMLHeadElement).parentNode?.children) ||
      null
    // 用树的前序遍历来写到时候
    if (titleCollection) {
      for (let i in titleCollection) {
        if (titleCollection[i] instanceof HTMLHeadingElement) {
          const index = this.inferTitleNumber(titleCollection[i].nodeName)
          if (!isNaN(index)) {
            this.addTitle(index, titleCollection[i].getAttribute('id')!)
          }
        }
      }
    }
  },
}
</script>

<style scoped>
:root {
  --left-color: #e883a5;
  --right-color: #e18a4e;
}
.heart-main {
  position: relative;
  animation: color-change 8s linear infinite alternate;
  height: 100vh;
}
.img-main {
  position: absolute;
  width: 600px;
  left: 15px;
  top: 50%;
  transform: translateY(-30%);
  object-fit: contain;
}
.custom-shape-divider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider svg {
  position: relative;
  display: block;
  width: calc(131% + 1.3px);
  height: 290px;
}

.shape-fill {
  fill: #ffffff !important;
}

@keyframes color-change {
  from {
    filter: hue-rotate(36deg);
  }
}
.container {
  display: flex;
}
.siderbar {
  width: 200px;
  border-right: 1px solid var(--c-border);
  margin-right: 40px;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
}
@media screen and (max-width: 768px) {
  .siderbar {
    width: 0px;
    overflow: hidden;
  }
}
.flex-1 {
  flex: 1;
}
.bgc img {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
