## 查看进程

> https://cloud.tencent.com/developer/article/1711858

```shell
ps aux
```

## 查看端口占用情况

```shell
lsof -i:端口号
```

> https://www.runoob.com/w3cnote/linux-check-port-usage.html

## kill 进程

在查到端口占用的进程后，如果你要杀掉对应的进程可以使用 kill 命令：

```shell
kill -9 PID
```
