## Mac vscode 打开文件或文件夹的快速操作

1. 首先启动应用程序 自动操作(Automator)

2. 运行 shell 脚本 拖到工作流窗口

3. 填写 shell 脚本

   ```shell
   for f in "$@"
   do
   	echo "$f"
   	cd "$f"		# 切到文件目录
   	# 可以用which vscode 查看路径
   	/usr/local/bin/code .	# vscode应用的命令行就是code
   done
   ```

4. 保存并命名即可完成一个快捷操作

## tree 工具

在 mac 中生成项目目录结构

常用的一些命令：

`tree -help`

`tree` 生成全部的项目层级结构

`tree -L 2` 只输出 2 级目录

`tree -I node_modules` 自定义忽略的目录

`tree > README.md` 自定义输出的文件名

### 可能遇到的问题

```
The 'brew link' step did not complete successfully

// 则继续 brew link tree
```

目录权限问题

```shell
Error: Could not symlink .
/usr/local/opt is not writable.
```

没有给当前账户赋予修改提示的目录的权限。 如果提示没有相关目录，则先创建目录，再重新执行权限命令。

> 可以灵活使用 `brew doctor` 命令来帮助我们找到解决方案

```shell
sudo mkdir /usr/local/opt // 如果提示没有目录的话先执行本行，
sudo chown -R $(whoami) /usr/local/opt
```

- [mac 破解小网站](https://www.macwk.com/soft/all/s-Charles/p1)
