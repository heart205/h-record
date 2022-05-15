## CSS 多行文本溢出省略显示

> 回顾单行文本溢出省略
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

### 在WebKit内核浏览器中解决文本多行溢出的显示问题：

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
webkit-box-orient: vertical;
```

> `-webkit-line-clamp`是用来限制在一个块元素显示的文本的行数
> **display: -webkit-box** 将对象作为弹性伸缩盒子模型显示
>
> **-webkit-box-orient** 设置或检索伸缩盒对象的子元素的排列方式

### 其他浏览器的解决方案：

> 利用相对定位 + 伪元素 在最后面加上一个省略号 需要控制块元素的行高

