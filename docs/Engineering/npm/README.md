# npm 中文文档

> [中文文档](https://www.npmjs.cn/)

[npm 包 原理分析](https://cloud.tencent.com/developer/article/1555982)

# 发布包

```shell
npm publish --access public
```

## 设置代理

设置淘宝镜像代理：

```shell
npm config set registry=https://registry.npm.taobao.org
```

设置回 npm 域

```shell
npm config set https://registry.npmjs.org/
```

## 查看全局安装的包

```shell
npm list -g --depth 0
```
