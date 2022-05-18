# emmet 语法

1. ul>li>a 快速生成标签嵌套

```html
<ul>
  <li><a href=""></a></li>
</ul>
```

2. `ul>li>a[href="javascript:;"]`

```html
<ul>
  <li><a href="javascript:;"></a></li>
</ul>
```

## 批量生成

`ul>li*3>a[href="#"] `或者 `ul>(li>a[href="#"])*3`

> ()表示数量

多层嵌套：

`ul>li*5>a[href="#"]>img[src=""]`

## 兄弟关系

使用`+`号连接可生成多个平级标签

`a+p+span`

```html
<a href=""></a>
<p></p>
<span></span>
```

嵌套加平级

`div>a[href="#"]+p+span`

```html
<div>
  <a href="#"></a>
  <p></p>
  <span></span>
</div>
```

## 含类名标签自然数

`.module$*3`

```html
<div class="module1"></div>
<div class="module2"></div>
<div class="module3"></div>
```

`.module$*3>ul>li.item$*2>a[href="#"]`

```html
<div class="module1">
  <ul>
    <li class="item1"><a href="#"></a></li>
    <li class="item2"><a href="#"></a></li>
  </ul>
</div>
<div class="module2">
  <ul>
    <li class="item1"><a href="#"></a></li>
    <li class="item2"><a href="#"></a></li>
  </ul>
</div>
<div class="module3">
  <ul>
    <li class="item1"><a href="#"></a></li>
    <li class="item2"><a href="#"></a></li>
  </ul>
</div>
```
