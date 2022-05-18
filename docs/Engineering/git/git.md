# Git

## 查看全局配置

```shel
git config --global --list
```

## 查看本地配置

```shel
git config --local --list
```

## 修改当前项目的用户名和邮箱

修改用户名:

```shell
git config  user.name <heart>
```

修改邮箱:

```shell
git config  --global user.email <heart@163.com>
```

## 修改全局用户名和邮箱

全局修改用户名:

> heart 为用户名 可以任意填写

```shell
git config  --global user.name <heart>
```

全局修改邮箱:

```shell
git config  --global user.email <heart@163.com>
```

## .gitconfig

修改.gitconfig 文件中的内容也可以修改用户名和邮箱

```shell
vi ~/.gitconfig

// 之后直接修改即可
```

## 查看本地仓库的属性

```shell
git config --local --list
```

## 分支操作

新建分支

```shell
git branch <分支名>
```

查看本地分支

```shell
git branch
```

查看所有的分支 红色的为远程分支 绿色的为本地分支

```shell
git branch -a
```

查看本地远程的对应分支

```shell
git branch -vv
```

删除本地分支

```shell
git branch - d <分支名>
```

创建本地分支与远程分支关联

> 远程分支一定要存在 否则会失败

```shell
git checkout -b <本地分支名> origin/<远程分支名>
```

将已有的本地分支与远程分支创建关联

```shell
git branch --set-upstream-to origin/<远程分支名>  <本地分支名>
```

### 远程分支

新建远程分支

```shell
git checkout -b dev //新建dev本地分支
git push origin dev //将dev分支推送到远程
git branch --set-upstream-to=origin/dev //分支关联
git branch -a // 查看分支
```

查看远程分支

```shell
git branch -r
```

查看远程分支地址

```shell
git remote -v
```

设置新的远程路径

```shell
git remote set-url origin git@xxx.git
```

拉取远程仓库代码

> main 为远程仓库名字

```shell
git fetch origin <main>
```

添加远程仓库

> master 为分支名 url 为远程分支地址

```shell
git remote add <master> <url>
```

删除远程仓库

```shell
git remote rm <master>
```

删除远程分支

> 推送一个空分支到远程分支，其实就相当于删除远程分支

```shell
git push origin :dev_tmp
// 也可以使用
git push origin --delete dev_tmp
```

### 切换分支

```shell
git checkout <分支名>
```

### 合并分支

将分支内容合并到 main 分支中

```shell
git merge main
```

### 清除本地修改

```shell
git checkout . && git clean -xdf
```

### git stash

将工作现场存储起来 等以后恢复现场继续工作

> 当前分支已修改了代码 但是需要切换到其他分支 则可以使用 git stash 存储工作内容 （存储之后代码会被保存起来 本地代码将会暂时消失）
>
> 之后便可以切换分支

多次`git stash` 可以用`git stash list`查看 然后恢复制定的 stash

```shell
git stash apply stash@{0}
```

```shell
git stash list // 查看存储的工作内容列表
```

恢复存储内容：

```shell
git stash apply // 恢复存储的工作内容 但是stach的存储不会被删除 需要用git stach drop 删除
```

```shell
git stash pop // 恢复的同时把stash内容也删了
```

git stash pop 出的 stash 是可以找回的，因为每次 git stash 都会生成一个新的 commit，只要知道 commitID, 通过 git stash apply commitID 就可以应用之前的 stash

```shell
git fsck --lost-found //会打印出所有dangling commitID
```

大概有三种类型的内容，blob、tree 和 commit
显示每次 commit 的详细内容:

```shell
git show commitId
```

找到 commitID 之后就去执行 git stash apply commitID 可以恢复工作区

### cherry-pick

能复制一个特定的提交到当前分支

> 通常用于 bug 修复 例如:在 master 分支上修复的 bug，想要合并到当前 dev 分支，可以用`git cherry-pick <commit>`命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。

```shell
git cherry-pick 593f63c60472ed5a5ab00d31f94fbadcdcd5f97d
```

## git 设置别名

```shell
git config --global alias.ck checkout // 这样git ck 就有git checkout的功能了
```

```shell
git config --global alias.brc "branch -a --contains" //查看某一个commit 存在于哪些分支
```

```shell
git config --global alias.tagc "tag --contains"  // 查看某一个commit 存在于哪些tag
```

## 解决 Git 中 fatal: refusing to merge unrelated histories

两个分支没有任何的关系 则合并失败 可以添加 `--allow-unrelated-histories`解决

```shell
git merge master --allow-unrelated-histories
```

如果是`git pull`或者`git push`报`fatal: refusing to merge unrelated histories`

```shell
git pull origin master --allow-unrelated-histories
```
