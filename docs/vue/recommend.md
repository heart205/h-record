# 推荐轮子 文章

## 文件预览

|      文档格式      |         老的开源组件         |             替代开源组件             |
| :----------------: | :--------------------------: | :----------------------------------: |
|    word（docx）    |           mammoth            |          docx-preview(npm)           |
| powerpoint（pptx） |            pptxjs            |           pptxjs 改造开发            |
|   excel（xlsx）    |    sheetjs、handsontable     | exceljs(npm)、handsontable(npm)(npm) |
|     pdf（pdf）     |            pdfjs             |              pdfjs(npm)              |
|        图片        | jquery.verySimpleImageViewer |            v-viewer(npm)             |

## canvas 思考

用 v3 写了一个 canvas 画笔功能

```vue
<template>
  <div>
    <canvas ref="canvas" @mousedown="mouseDown" @mouseup="mouseUp"></canvas>
    <div class="canvas-btn">
      <button @click="handleClearCanvas">Clear</button>
      <button @click="handleSubmitCanvas">Save</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'
export default {
  setup() {
    const canvas = ref(null)
    const options = reactive({
      lineWidth: 5,
      ctx: '',
      width: 300,
      height: 150,
      isWindowListener: false,
    })
    function mouseMove(event) {
      options.ctx.restore()
      options.ctx.lineTo(event.offsetX, event.offsetY)
      options.ctx.stroke()
      options.ctx.save()
      event.stopPropagation()
      return false
    }
    function addEventListener(canvas, options, event) {
      const { offsetX, offsetY } = event
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          options.ctx = ctx
          options.ctx.beginPath()
          options.ctx.moveTo(offsetX, offsetY)
          canvas.addEventListener('mousemove', mouseMove, false)
        }
      }
    }
    function removeEventListener(canvas, options) {
      if (options.ctx) {
        options.ctx.closePath()
      }
      canvas && canvas.removeEventListener('mousemove', mouseMove, false)
    }
    function mouseDown(event) {
      const canvas = event.target
      addEventListener(canvas, options, event)
    }
    function AddEventRemoveCanvasMouseMoving() {
      if (canvas && canvas.value) {
        removeEventListener(canvas.value, options)
      }
    }
    function mouseUp(event) {
      const canvas = event.target
      removeEventListener(canvas, options)
    }
    // 初始化配置
    function init() {
      const c = canvas.value
      if (c) {
        // width height 决定了多少像素可以显示在画布上
        c.width = options.width * window.devicePixelRatio
        c.height = options.height * window.devicePixelRatio
        // 这里的 宽 高 还是300 150 相当于画布被缩放
        c.style.width = options.width + 'px'
        c.style.height = options.height + 'px'
        const ctx = c.getContext('2d')
        ctx.lineWidth = options.lineWidth
        // 因此这里要放大
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }
    function handleClearCanvas() {
      if (canvas && canvas.value) {
        const c = canvas.value
        if (c) {
          const ctx = c.getContext('2d')
          ctx.clearRect(0, 0, c.width, c.height)
        }
      }
    }
    function handleSubmitCanvas() {
      if (canvas && canvas.value) {
        const c = canvas.value
        c.toBlob(
          (blob) => {
            // 'sign' + new Data().getTime() + '.png'
            // 生成的文件的名字和类型
            const file = window.File([blob], `sign${new Date().getTime()}.png`, {
              type: 'image/png',
            })
          },
          'image/jpeg',
          1
        )
      }
    }
    onMounted(() => {
      init()
      // TODO: 不需要移出就停止 则 关闭这个
      if (options.isWindowListener) {
        window.addEventListener('mousemove', AddEventRemoveCanvasMouseMoving, false)
      }
    })

    return {
      canvas,
      mouseDown,
      mouseMove,
      mouseUp,
      handleClearCanvas,
      handleSubmitCanvas,
    }
  },
}
</script>

<style>
canvas {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

button {
  font-weight: 400;
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
button:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.canvas-btn button {
  margin: 10px;
}
</style>
```

> canvas 的 width 和 height 属性 决定了多少 css 像素可以显示在画布上
>
> canvas.style.width 和 canvas.style.height 决定了画布的显示尺寸
>
> 这里将 canvas width height 放大了设备像素比 style.width/height 没有变 相当于画布被缩放了 因此` ctx.scale(window.devicePixelRatio, window.devicePixelRatio)` 要放大(这个只是放大局部区域)
>
> 以 300 150 window.devicePixelRatio = 2 为例子
>
> 相当于原来(300 _ 150) 的图片要放大成 (600 _ 300) 有些地方就会有锯齿
>
> 如果将 css 像素放大两倍(`canvas.width = canvas.width * window.devicePixelRatio`) 此时对应的像素比就是 1 : 1 因此不会模糊
>
> 这里只是将 css 像素放大了一倍 因此导致视觉上会被缩小(此时的像素比是 1 : 1 了) 因此使用 scale 局部放大(像素比没有变化 因此 还是清晰)

## canvas 实现水印功能

> 变量命名不规范 可以用 reactive 替代 ref 的方式 将会更好
>
> 这里限制了盒子的大小 盒子过大或者过小 页面会出现假死状态 因此这里去值 50 - 1000 之间的数字

```vue
<template>
  <div>
    <h1>盒子范围：50 - 1000</h1>
    <canvas ref="canvas" class="canvas"></canvas>
    <textarea type="text" placeholder="水印文字" :value="text" @input="changeCanvas($event, 'text')" />
    <br />
    <input type="number" placeholder="盒子宽" :value="width" @input="changeCanvas($event, 'width')" />
    <br />
    <input type="number" placeholder="盒子高" :value="height" @input="changeCanvas($event, 'height')" />
    <br />
    <input type="number" placeholder="字体大小" :value="fontSize" @input="changeCanvas($event, 'fontSize')" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const canvas = ref(null)
    const text = ref(`heart\nthis is waterMark`)
    const width = ref(180) //水印盒子的宽度
    const height = ref(90) // 水印盒子的高度
    const fontSize = ref(20)
    const rotate = ref(-30)
    function init() {
      const c = canvas.value
      c.width = window.innerWidth
      c.height = window.innerHeight
      // 将屏幕切割
      if (c) {
        const ctx = c.getContext('2d')
        ctx.font = fontSize.value + 'px' + ' Arial'
        ctx.fillStyle = 'rgba(51,51,51,.1)'
        ctx.textAlign = 'center'
        for (let i = 0; i < c.width + width.value; i = i + (Number.parseInt(width.value) || 10)) {
          for (let j = 0; j < c.height + height.value; j = j + (Number.parseInt(height.value) || 10)) {
            ctx.save()
            ctx.translate(i + (Number.parseInt(width.value) || 10) / 2, j + (Number.parseInt(height.value) || 10) / 2)
            ctx.rotate((-1 * rotate * Math.PI) / 180)
            for (let k = 0; k < text.value.split('\n').length; k++) {
              // k * fontSize.value 则是在第几个
              ctx.fillText(text.value.split('\n')[k], 0, k * fontSize.value)
            }
            ctx.restore()
          }
        }
        ctx.stroke()
      }
    }
    function changeCanvas(e, field) {
      changeCanvas.timer && clearTimeout(changeCanvas.timer)
      switch (field) {
        case 'fontSize':
        case 'text': {
          text.value = e.target.value
          break
        }
        case 'width': {
          width.value = e.target.value && e.target.value > 50 ? (e.target.value < 1000 ? e.target.value : 1000) : 50
          break
        }
        case 'height': {
          height.value = e.target.value && e.target.value > 50 ? (e.target.value < 1000 ? e.target.value : 1000) : 50
          break
        }
      }
      changeCanvas.timer = setTimeout(() => {
        init()
      }, 500)
    }
    onMounted(() => {
      init()
      window.addEventListener('resize', init, false)
    })
    return {
      canvas,
      text,
      changeCanvas,
      width,
      height,
      fontSize,
    }
  },
}
</script>

<style scoped>
.canvas {
  position: absolute;
  box-shadow: none;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
```
