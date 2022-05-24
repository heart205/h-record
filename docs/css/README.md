# CSS

### 外边距合并和内边距塌陷

> BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实 现更健壮、更智能的自适应布局。

1. 触发 BFC 规则

```css
overflow：hidden
display:inline-block | inline-block | table-cell
position:fixed ｜ absolute (不为relative或者static)
position:absolute
float 的值不为 none;
```

2. 父元素添加边框
3. 父元素给 padding

# css 变量

css 变量的取值操作是根据作用域取值 当前作用域没有 会向上级逐层查找

```css
:root {
  --color: pink;
}
.app {
  --color: red;
  width: 100px;
  height: 100px;
  background-color: var(--color);
}
```

## 变量用于属性值

```css
.foo {
  --side: margin-top;
  var(--side): 20px;
}
```

## css 伪元素

### lang 伪元素

选择 lang 属性的元素

```css
p:lang(en) {
  background-color: red;
}
```

```html
<!-- 由于默认的html就是带有en的 所以:lang(en) 能选择到p标签 -->
<div>
  <p>1</p>
  <p>2</p>
  <p lang="zh">3</p>
</div>
```

[codepen](https://codepen.io/hearto_o/pen/eYyyOXq)

## 变量默认值

如果没有--color 变量 则会使用 blue 替代

```css
background-color: var(--color, blue);
```

> [CSS Custom Properties for Cascading Variables Module Level 1](https://www.w3.org/TR/css-variables-1/#custom-property)

## 移动端布局

### 设备像素 DP(device pixels)

DP(device pixels) 称为设备像素 物理像素

> (设备像素 物理像素)代表屏幕上有多少个点，比如 1080x2340 表示屏幕一排包含 1080 个物理像素点

### 逻辑像素

逻辑像素表示屏幕展示物体的视觉尺寸是多少，逻辑像素也称作设备独立像素 与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念，包括了 CSS 像素

### 设备像素比 DPR(device pixels ratio)

设备像素比（dpr 描述的是未缩放状态下，物理像素和设备独立像素的初始比例关系，计算方法如下图。
DPR = 物理像素 / 设备独立像素

> 在理想视口下 一个 css 像素等于一个设备独立像素
> web 端开发的时候 当页面缩放比例为 100%时，一个 CSS 像素等于一个设备独立像素。

> 由于移动端的屏幕比例不一致 因此后面引入了像素比的概念 为了适配各种屏幕，我们写代码时一般使用设备独立像素来对页面进行布局 但是一般的设计稿都是
> 设备像素比大于 1 的屏幕上，我们写的 1px 实际上是被多个物理像素渲染，这就会出现 1px 在有些屏幕上看起来很粗的现象 （相当于 1px 的 css 像素显示到屏幕的物理像素会是多 px）

当设备像素比为 1:1 时，使用 1（1×1）个设备像素显示 1 个 CSS 像素；

当设备像素比为 2:1 时，使用 4（2×2）个设备像素显示 1 个 CSS 像素；

当设备像素比为 3:1 时，使用 9（3×3）个设备像素显示 1 个 CSS 像素。

因此在移动端开发的时候不仅要关注设备像素比 还需要关注设备的尺寸

> 以媒体查询为例子：

```css
@media screen and (min-width: 375px) {
  .app {
    width: 375px;
  }
}
@media screen and (min-width: 414px) {
  .app {
    width: 414px;
  }
}
```

> [像素比查询网站](https://screensiz.es/)
>
> [iPhone Resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
>
> [CSS 像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://github.com/jawil/blog/issues/21)

## 多倍图

> 放大几倍就是几倍图
>
> 图片缩小不会模糊 (既然缩小不会模糊，那为什么不全部使用 3x 图片？)
>
> 提高性能, 如果图片全部使用 3x 图, 提高了手机流量的消耗, 而且页面加载速度也会大打折扣
>
> 不全部用多倍图的原因:[博客链接](https://ogliu.com/2020/11/26/2x3x/)
>
> b 站视频剪辑的图片:
> <img src="/images/css/image@2x.jpg">

## border

### border-image

#### border-image-source

> border-image-source 用于声明元素的边框图片（border-image）的资源

```css
border-image-source: url('https://interactive-examples.mdn.mozilla.net/media/examples/border-diamonds.png');
```

> [mdn border-image-source](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-source)

#### border-image-slice

> border-image-slice 属性会将图片分割为 9 个区域：四个角，四个边（edges）以及中心区域。<br />
> 百分比是相对于图片的大小
> `fill` 设置此关键字 则图片的中心区域会显示

切割后的四周的八个切片，四个角根据 border 设置的大小全尺寸自动缩放显示到 border 对应的四个角
除四个角外的其他中间切片（上中，右中间，下中，左中间），可以根据设置做拉伸或重复的设置操作显示到对应的 border 位置。

```css
/* 所有的边 */
border-image-slice: 30%;

/* 垂直方向 | 水平方向 */
border-image-slice: 10% 30%;

/* 顶部 | 水平方向 | 底部 */
border-image-slice: 30 30% 45;

/* 上 右 下 左 */
border-image-slice: 7 12 14 5;

/* 使用fill（fill可以放在任意位置） */
border-image-slice: 10% fill 7 12;

/* Global values */
border-image-slice: inherit;
border-image-slice: initial;
border-image-slice: unset;
```

> [裁剪图例](https://www.runoob.com/cssref/css3-pr-border-image-slice.html)<br />

> [border-image-slice](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-slice)

#### border-image-width

> 百分比是相较于水平（垂直）方向上的边框图像区域高度（宽度）的偏移量 如果是数值类型 则是`border-width`的相应倍数

```css
/* 关键字 */
/*
 *将等同于内部对应的 border-image-slice 的宽或高（可用的话）。
 *如果图像没有需要的相应的属性，将相对于 border-width 进行指定。
 */
border-image-width: auto;

/* 长度 */
border-image-width: 1rem;

/* 百分比 */
border-image-width: 25%;

/* 数值 */
border-image-width: 3;

/* 垂直 | 水平 */
border-image-width: 2em 3em;

/* 上 | 横向 | 下 */
border-image-width: 5% 15% 10%;

/* 上 | 右 | 下 | 左 */
border-image-width: 5% 2em 10% auto;

/* 全局值 */
border-image-width: inherit;
border-image-width: initial;
border-image-width: unset;
```

#### border-image-outset

> border-image-outset 属性定义边框图像可超出边框盒的大小。(超出的部分不会影响其他盒子布局)

```css
border-image-outset: 10px;
```

#### border-image-repeat

> 定义图片如何填充边框
> 单个值，设置所有的边框
> 两个值，分别设置水平与垂直的边框。

1.  `stretch` 拉伸图片以填充边框
2.  `repeat` 平铺图片以填充边框。
3.  `round` 平铺图像。当不能整数次平铺时，根据情况放大或缩小图像
4.  `space` 平铺图像 。当不能整数次平铺时，会用空白间隙填充在图像周围（不会放大或缩小图像）

```css
border-image-repeat: stretch repeat;
```

#### border-image

正式的语法：

```css
<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>
```

> 1.<b>border-image-outset 参数一定要在 border-image-width 之后，假设 border-image-width 缺省，仍然需要在原来 border-image-width 写上 `/`</b><br /> 2.<b>如果有 border-image-width/ border-image-outset 属性值，border-image-slice 必须指定数值，否则不合语法</b>

```css
/*合法*/
border-image: url('https://mdn.mozillademos.org/files/4127/border.png') 30;

/*10px这里作为border-image-width*/
border-image: url('https://mdn.mozillademos.org/files/4127/border.png') 30 / 10px;
/*10px 这里作为border-image-outset*/
border-image: url('https://mdn.mozillademos.org/files/4127/border.png') 30 / /10px;

/*正确写法：*/
border-image: url(http://7xv39r.com1.z0.glb.clouddn.com/box.png) 30 / 10px / 10px;

/*错误写法：*/
border-image: url(http://7xv39r.com1.z0.glb.clouddn.com/box.png) / 10px / 10px;
```

> [border-image 的正确用法](https://blog.csdn.net/qq_41903941/article/details/90259306)<br /> > [mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)

```css
.app {
  width: 100px;
  height: 100px;
  border: 30px solid;
  border-image: url('https://mdn.mozillademos.org/files/4127/border.png') 33% 33% fill repeat;
}

.app {
  width: 100px;
  height: 100px;
  border: 30px solid;
  /*50% 50% 切的四个角都会有颜色 但是 中间切片都为0所以为白色*/
  border-image: url('https://mdn.mozillademos.org/files/4127/border.png') 50% 50%;
}
```

```html
<div class="app"></div>
```

[codepen - 渐变色边框](https://codepen.io/hearto_o/pen/wvpppNW)

## mask

> 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域
> 只能是 transparent 到另外一种颜色的渐变 transparent 为关键 #415eff 为任何值都可以

```css
.mask {
  width: 100px;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: #415eff;
  mask: linear-gradient(to right, transparent, #415eff, transparent);
  -webkit-mask: linear-gradient(to right, transparent, #415eff, transparent);
}
```

> [mdn-mask](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)

### css 层叠性

> 1. 当元素的层叠水平一致、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。
> 2. 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文。

#### z-index 的层叠性质：

> 其 z-index 值不是 auto 的时候，会创建层叠上下文
> opacity 不是 1 的时候 也会创建层级上下文
> [层叠上下文解释](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

### flex

- `flex-grow` 属性定义项目的放大比例 默认为 0
- `flex-shrink` 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

### counter-increment

css 计数器 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment)

```css
counter-increment: counter-name;
```

```css
.sa::after {
  /* 0 */
  content: counter(box);
}

.box {
  /* 调用一次 counter-increment: box; box的计数就会加1*/
  counter-increment: box;
}

.box::after {
  /* counter引用计数 */
  content: counter(box);
}

.box:nth-child(2) {
  counter-increment: none;
}

.box:nth-child(2)::after {
  content: '';
}

.span {
  counter-increment: box;
}

.span::after {
  content: counter(box);
}
```

```html
<!-- 0 1 2 3  -->
<div class="sa"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>
<div class="span"></div>
```

### nth-of-type 与 nth-child

> nth-child 表示当前选择的子元素(可以是 class 选择)是父元素的第几个子元素
>
> nth-of-type 选择的是兄弟元素 选择当前的元素的标签（例如 div 标签） 是父元素的第几个

```html
<style>
  .container:nth-child(4) {
    background-color: red;
  }

  .c:nth-of-type(2) {
    background-color: skyblue;
  }
</style>
<div class="app">
  <div>111</div>
  <p class="c">开头</p>
  <div class="c">class c</div>
  // skyblue 第二个div元素
  <div class="container">1</div>
  // red
  <div class="container">2</div>
  <div class="container">3</div>
  <div class="container">4</div>
  <div class="c">5</div>
  <div class="c">6</div>
  <p class="c">c1</p>
  // 第二个p元素
  <p class="contain">末尾</p>
</div>
```

[知乎文章](https://zhuanlan.zhihu.com/p/126681521)

## 平滑滚动 css

[scroll-behavior](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)
body 元素使用此属性无效

```css
scroll-behavior: smooth;
```

**用户体验**及**可访问性**方面的一些做法：

```css
html:focus-within {
  scroll-behavior: smooth;
}
```

设置了 `html:focus-within` 伪类，而不是直接给 `html` 赋予平滑滚动，这样做的目的是只对使用键盘 `tab` 键切换焦点页面时，让页面进行平滑滚动切换，带来更好的使用体验。

[focus-within 伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)

## 元素层级 遮挡解决方案

元素遮挡（层级/定位等等）导致无法点击下层元素解决方案

> MDN 解释: CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。
>
> 则设置成 none 的话 当前的元素将不会被鼠标事件的 target 则不会被选中
>
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

```css
pointer-events: none;
```

可以使用这个特性 制作 canvas 水印的时候 让水印在最高层级 但是不会被选中

```css
cnavas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
}
```

## line-height

如果是个数值类型 则根据当前字体大小计算

```css
line-height: 1.5 // 会根据当前的字体大小 * 1.5 则是行高;;
```

## 右边距失效问题:

1. 默认状态下的块级元素右边距是无效的
2. 当父元素的宽度小于子元素的宽度时，子元素的右边距无效。

> 设置 float（除了 none 以外的值）、display (inline-block，inline-flex，inline-grid，inline-table，inline-box，table)、position（absolute，fixed）之后会生效。

用 scrollWidth 取到的值也是不包括右边距的 (通过设置 display（inline-block，inline-flex，inline-grid，inline-table）可以让右边距生效)

```css
.a {
  display: inline-flex; /* 通过设置inline-flex 使得右边距生效*/
  flex-direction: column;
}

.b {
  display: flex;
}

.e {
  flex-shrink: 0;
  margin: 100px 100px;
  width: 200px;
  height: 200px;
  background: crimson;
}
```

```html
<div class="a">
  <div class="b">
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
  </div>
  <div class="b">
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
    <div class="e"></div>
  </div>
</div>
```
