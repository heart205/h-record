# shell 脚本执行权限设置

先创建一个脚本

名为: one.command

```shell
#! /bin/bash
echo 'hello world'
```

此时的脚本是没有权限区执行的 会提示权限不够

此时可以用命令`chmod`给文件提权

> 文件/目录权限设置命令：chmod
>
> Chmod [who] [opt] [mode] 文件/目录名

who:

- u：表示文件所有者
- g：表示同组用户
- o：表示其它用户
- a：表示所有用户

opt:

- +：添加某个权限
- -：取消某个权限
- =：赋予给定的权限，并取消原有的权限

mode:

- r：可读
- w：可写
- x：可执行

因此给当前的脚本可以赋值的权限为:

```shell
chmod g+rwx one.command
```

## 数字设定

可以使用数字去设定文件的权限

```shell
chmod [mode] 文件名
```

```shell
chmod 664 one.command
// 如果想让文件的权限变为:（竖着看）
用户  自己 同组用户 其他用户
可读   是			是 		是
可写   是			是
可执行
则变成权限串为 rw-rw-r 二进制就是110 110 100 十进制就是664
```
