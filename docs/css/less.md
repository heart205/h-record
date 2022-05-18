## less 用法：

循环写法:

```less
.circleFor(@i) when(@i < 16) {
  &:nth-child(@{i}) {
    width: 170px - @c-w * (@i - 12);
    height: 170px - @c-w * (@i - 12);
  }
  .circleFor(@i + 1);
}
```

## less 中 calc 使用

> 这里的百分比是相对于父元素的百分比 `height` 相对于父元素的`height` > `width` `margin` `padding` 都是相对父元素的 `width` > [code](https://codepen.io/hearto_o/pen/MWrdeOB)

```less
@postHeight: 100px;
margin-bottom: calc(~'100% - @{postHeight}');
```
