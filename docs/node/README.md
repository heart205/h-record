# node

##

执行 shell 命令

```js
import { exec } from 'child_process'
// 创建文件夹
exec('mkdir sign')

// 查看当前的文件夹

exec('ls', (err, stdout) => {
  // 获取当前所有的文件 以及文件夹
  console.log(stdout)
})

// 监听并且在控制台输出
const cp = exec('ping www.baidu.com')

cp.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)
})
```
