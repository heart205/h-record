# script 标签中 defer 和 async 的区别

- script ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
- async script ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
- defer script：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。

> async 是不可控的，因为执行时间不确定，你如果在异步 JS 脚本中获取某个 DOM 元素，有可能获取到也有可能获取不到。而且如果存在多个 async 的时候，它们之间的执行顺序也不确定，完全依赖于网络传输结果，谁先到执行谁

-[原文链接](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
