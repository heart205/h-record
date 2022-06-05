## 内存回收

typeof 操作符可以确定值的原始类型，而 instanceof 操作符用于确保值的引用类型。

主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。

## 包装类

Boolean、Number 和 String

```
 let s1 = "some text";
    let s2 = s1.substring(2);
```

在这里，s1 是一个包含字符串的变量，它是一个原始值。第二行紧接着在 s1 上调用了 substring() 方法，并把结果保存在 s2 中。我们知道，原始值本身不是对象，因此逻辑上不应该有方法。而实际上 这个例子又确实按照预期运行了。这是因为后台进行了很多处理，从而实现了上述操作。具体来说，当 第二行访问 s1 时，是以读模式访问的，也就是要从内存中读取变量保存的值。在以读模式访问字符串 值的任何时候，后台都会执行以下 3 步:

(1) 创建一个 String 类型的实例;

(2) 调用实例上的特定方法;
(3) 销毁实例。
可以把这 3 步想象成执行了如下 3 行 ECMAScript 代码:

```
    let s1 = new String("some text");
    let s2 = s1.substring(2);
    s1 = null;
```

```
let s1 = "some text";
    s1.color = "red";
    console.log(s1.color);  // undefined
```

这里的第二行代码尝试给字符串 s1 添加了一个 color 属性。可是，第三行代码访问 color 属性时， 它却不见了。原因就是第二行代码运行时会临时创建一个 String 对象，而当第三行代码执行时，这个对 象已经被销毁了。实际上，第三行代码在这里创建了自己的 String 对象，但这个对象没有 color 属性。

在原始值包装类型的实 例上调用 typeof 会返回"object"，所有原始值包装对象都会转换为布尔值 true

> Object 构造函数作为一个工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例

> 使用 new 调用原始值包装类型的构造函数，与调用同名的转型函数并不一样
>
> ```js
> let value = '25'
> let number = Number(value)
> console.log(typeof number)
> let obj = new Number(value)
> console.log(typeof obj)
> // 转型函数 // "number" // 构造函数 // "object"
> ```

## number

toExponential()也接收一个参数，表示结果中小数的位数。

toPrecision()方法会根据情况返回最合理的输出结果，可能是固定长度，也可能是科学记数法 形式。这个方法接收一个参数

```js
let num = 99
console.log(num.toPrecision(1)) // "1e+2"
console.log(num.toPrecision(2)) // "99"
console.log(num.toPrecision(3)) // "99.0"
```

表示多少次方

```js
2的53次方 2 ** 53
```

Number.MIN_SAFE_INTEGER(253 + 1)到 Number.MAX_SAFE_INTEGER(253  1)

为了鉴别整数是否在这个范围内，可以使用 Number.isSafeInteger()

```js
console.log(Number.isSafeInteger(-1 * 2 ** 53)) // false
console.log(Number.isSafeInteger(-1 * 2 ** 53 + 1)) // true
console.log(Number.isSafeInteger(2 ** 53)) // false
console.log(Number.isSafeInteger(2 ** 53 - 1)) // true
```

## 剪头函数

1. 箭头函数没有 argument
2. 箭头函数没有 this
