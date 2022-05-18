# ci

> [github ts-jest 实现 ci](https://juejin.cn/post/7087061029812699173#heading-0)

> [ci cd 自动化部署](https://juejin.cn/post/6924552945069457421)

> [阮一峰老师 github action 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

待完成的 ci：

```yml
name: heart blog
on:
  push:
    branches:
      - master
jobs:
  blog-deploy:
    name: blog deploy job
    runs-on: ubuntu-18.04
    steps:
      - name: checkout
        uses: actions/checkout@v3

      - name: Build and Deploy
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: build
          BUILD_SCRIPT: npm install && npm run build
```
