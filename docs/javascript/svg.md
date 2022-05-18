# svg

> https://www.ruanyifeng.com/blog/2018/08/svg.html

> svg 代码都放在 svg 标签中

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

可以指定 width 和 height 为 svg 画布的宽高 如果不设置 默认宽高为 300 \* 150

如果只想展示 SVG 图像的一部分，就要指定`viewBox`属性

`<viewBox>`属性的值有四个数字，分别是左上角的横坐标和纵坐标、视口的宽度和高度。

上述的代码表示从 0,0 坐标点开始 截取一个视口的大小为 50 \* 50

> 视口会放大去适配 SVG 图像的大小 因此只会看到 1 / 4 的圆 mycycle 的大小为 200 \* 200

## circle

`<circle>`标签代表圆形

`<circle>`标签的`cx`、`cy`、`r`属性分别为横坐标、纵坐标和半径，单位为像素。坐标都是相对于`<svg>`画布的左上角原点

> circle 可以指定 id 或者 class 属性值

```css
#mycircle {
  fill: red; // fill:填充色
  stroke: black; // stroke 描边色
  stroke-wdith: 3pt; //stroke-width 边框宽度
}
```

## line

`<line>`标签用来绘制直线。

`<line>`标签的`x1`属性和`y1`属性，表示线段起点的横坐标和纵坐标；`x2`属性和`y2`属性，表示线段终点的横坐标和纵坐标；`style`属性表示线段的样式

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <line x1="0" y1="0" x2="100" y2="100" style="stroke:rgb(0,0,0);stroke-width:5" />
</svg>
```

## polyline

`<polyline>`标签用于绘制一根折线

`<polyline>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <polyline points="0,0 50,50 0,100" style="fill:red;stroke:black;stroke-width:5" />
</svg>
```

## rect

`<rect>`标签用于绘制矩形

`<rect>`的`x`属性和`y`属性，指定了矩形左上角端点的横坐标和纵坐标；`width`属性和`height`属性指定了矩形的宽度和高度（单位像素）。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <rect x="0" y="0" height="50" width="50" style="fill: none;stroke:aqua;stroke-width:1" />
</svg>
```

## ellipse

`<ellipse>`标签用于绘制椭圆

`<ellipse>`的`cx`属性和`cy`属性，指定了椭圆中心的横坐标和纵坐标（单位像素）；`rx`属性和`ry`属性，指定了椭圆横向轴和纵向轴的半径（单位像素）。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <ellipse cx="60" cy="60" ry="40" rx="20" stroke="black" stroke-width="5" fill="silver" />
</svg>
```

## polygon

`<polygon>`标签用于绘制多边形。

`<polygon>`的`points`属性指定了每个端点的坐标，横坐标与纵坐标之间与逗号分隔，点与点之间用空格分隔

注意 原点（左上角才是 0,0）

```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <polygon fill="red" stroke="black" stroke-width="1" points="0,0 100,0 100,100 0,100 90,0" />
</svg>
```

## path

`<path>`标签用于制路径。

`<path>`的`d`属性表示绘制顺序，它的值是一个长字符串，每个字母表示一个绘制动作，后面跟着坐标。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <path
    d="
  M 0,0
  L 0,20
  L 20,20
  L 20,40
  Z"
    fill="none"
    stroke="red"
  />
</svg>
```

- M：移动到（moveto）
- L：画直线到（lineto）
- Z：闭合路径

## text

`<text>`标签用于绘制文本。

`<text>`的`x`属性和`y`属性，表示文本区块基线（baseline）起点的横坐标和纵坐标。文字的样式可以用`class`或`style`属性指定。(指定 id 不起作用)

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <text class="text" x="10" y="50">hello world</text>
</svg>
```

## use

`<use>`标签用于复制一个形状。

`<use>`的`href`属性指定所要复制的节点，`x`属性和`y`属性是`<use>`左上角的坐标。另外，还可以指定`width`和`height`坐标。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle id="myCircle" cx="5" cy="5" r="4" />
  <use href="#myCircle" x="30" y="30" fill="blue" />
</svg>
```

## g

`<g>`标签用于将多个形状组成一个组（group）

> 复制一个组的内容

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <g id="myCircle">
    <text x="30" y="20">圆形</text>
    <circle cx="15" cy="15" r="4" />
  </g>
  <use href="#myCircle" x="30" y="30" fill="blue" />
</svg>
```

## defs

`<defs>`标签用于自定义形状，它内部的代码不会显示，仅供引用。

```html
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <defs>
    <g id="myCircle">
      <text x="30" y="20">圆形</text>
      <circle cx="15" cy="15" r="4" />
    </g>
  </defs>
  <use href="#myCircle" x="10" y="10"></use>
</svg>
```

## pattern

`<pattern>`标签用于自定义一个形状，该形状可以被引用来平铺一个区域。

`<pattern>`标签将一个圆形定义为`dots`模式。`patternUnits="userSpaceOnUse"`表示`<pattern>`的宽度和长度是实际的像素值。然后，指定这个模式去填充下面的矩形

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
</svg>
```

## image

`<image>`标签用于插入图片文件。

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="path/to/image.jpg" width="50%" height="50%" />
</svg>
```

`<image>`的`xlink:href`属性表示图像的来源。

## animate

`<animate>`标签用于产生动画效果。

> 可以在多个属性上面定义动画

```html
<svg width="500" height="500">
  <defs>
    <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle fill="#bee9e8" cx="50" cy="50" r="35" />
    </pattern>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)">
    <animate attributeName="x" from="0" to="100%" dur="2s" repeatCount="indefinite"></animate>
    <animate attributeName="y" from="0" to="100%" dur="2s" repeatCount="indefinite"></animate>
  </rect>
</svg>
```

- attributeName：发生动画效果的属性名。
- from：单次动画的初始值。
- to：单次动画的结束值。
- dur：单次动画的持续时间。
- repeatCount：动画的循环模式。

## animateTransform

`<animate>`标签对 CSS 的`transform`属性不起作用，如果需要变形，就要使用`<animateTransform>`标签。

```html
<svg width="500px" height="500px">
  <!-- <animateTransform>的效果为旋转（rotate），
    这时from和to属性值有三个数字，第一个数字是角度值，第二个值和第三个值是旋转中心的坐标。
    from="0 200 200"表示开始时，角度为0，围绕(200, 200)开始旋转；
    to="360 400 400"表示结束时，角度为360，围绕(400, 400)旋转 -->
  <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
    <animateTransform
      attributeName="transform"
      type="rotate"
      begin="0s"
      dur="10s"
      from="0 200 200"
      to="360 400 400"
      repeatCount="indefinite"
    />
  </rect>
</svg>
```

## demo

> 创建一个矩阵

```js
const btn = document.getElementById('btn')
const svg = document.getElementById('svg')
function handleClick() {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('width', '100')
  rect.setAttribute('height', '100')
  rect.setAttribute('fill', 'red')
  rect.setAttribute('x', '0')
  rect.setAttribute('y', '0')
  g.appendChild(rect)
  svg?.appendChild(g)
}
if (btn) {
  btn.addEventListener('click', handleClick, false)
}
```
