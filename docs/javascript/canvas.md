# canvas

## canvas 背景颜色

canvas 的背景颜色本身就是透明颜色

可以通过修改 canvas 的 style 的`backgroundColor`属性修改 canvas 的背景颜色

```js
const canvas = document.querySelector('canvas')
c.style.backgroundColor = 'transparent'
```

> 如果是 webGL 则设置一个透明的颜色就行
>
> ```js
> gl.clearColor(0, 0, 0, 0)
> ```

## canvas 清除画布

```js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, c.width, c.height)
```

## canvas 转 DataURL

```js
canvas.toDataURL('image/png')
```

## canvas 转 Blob 对象

```js
canvas.toBlob((blob) => {
  if (blob) {
    const file = new window.File([blob], `sign_${new Date().getTime()}.png`, {
      type: 'image/png',
    })
    // 加入Form表单
    const formData = new FormData()
    formData.append('file', file)
    // 请求接口 上传图片
  }
})
```
