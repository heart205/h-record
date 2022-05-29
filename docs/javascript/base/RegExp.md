# RegExp

g:全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。  i:不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
m:多行模式，表示查找到一行文本末尾时会继续查找。
y:粘附模式，表示只查找从 lastIndex 开始及之后的字符串。

u:Unicode 模式，启用 Unicode 匹配。

s:dotAll 模式，表示元字符.匹配任何字符(包括\n 或\r)。

Exec replace 如果设置了`g` 则每次 lastIndex 都会变化

> 无论正则表达式是怎么创建的，继承的方法 toLocaleString()和 toString()都返回正则表达 式的字面量表示 正则表达式的 valueOf()方法返回正则表达式本身。

input $\_ 最后搜索的字符串（非标准特性）

lastMatch $& 最后匹配的文本

lastParen $+ 最后匹配的捕获组（非标准特性）

leftContext $` input 字符串中出现在 LastMatch 前面的文本

rightContext $' input 字符串中出现在 lastMatch 后面的文本
