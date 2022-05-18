# mockJs

```js
import * as mock from 'mockjs'
// https://segmentfault.com/q/1010000041671063/a-1020000041671133
const a = window.XMLHttpRequest

mock.mock()

console.log(window.XMLHttpRequest === a) //    if (XHR) window.XMLHttpRequest = XHR 源码中这样替换原声的XMLHttpRequest
```
