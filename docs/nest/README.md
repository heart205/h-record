# nest

## 基本操作

```ts
import { Body, Controller, Get, HostParam, Ip, Next, Post, Put, Res, Session } from '@nestjs/common'
import { UserService } from './users.service'
import type { Users } from './interfaces/users'
import type { Response } from 'express'
import { UserDto } from './dto/user.dto'
/**
 * host: 根据请求的host拦截
 */
@Controller({ host: '127.0.0.1', path: 'users' })
export class UsersController {
  constructor(private readonly appService: UserService) {}

  /**
   * 使用 @Get() @post方法时 如果返回的是对象或者是一个数组 将会被自动序列化 如果返回的是一个基本类型 将不会做任何处理 只是返回
   */
  @Get()
  getProvinces(): Users.User {
    return this.appService.getProvinces()
  }

  @Post()
  postPrice(): string {
    return 'hello world'
  }

  /**
   * res 是函数签名
   * passthrough: true 设置了这个之后 请求之后会将控制权重新交给nest（nest的return就是返回值） 不会影响后续的请求队列 如果没有设置 则执行的权利将还是res的（return无效）
   */
  @Put()
  putPrice(@Res({ passthrough: true }) res: Response, @Next() next): string | void {
    // 设置请求头
    res.header('Content-Type', 'text/html')
    // next 走下一个请求的队列
    next()
    // res.send({ data: 'foo' });
    return 'hello world'
    // 由于函数默认返回void 返回了一个空
  }

  @Put()
  putPrice1(@Res() res: Response): string {
    // res.send({ data: 'foo' });
    console.log('运行了')
    // 由于没有设置 { passthrough: true } 导致return的值无效
    return 'hello world'
  }

  //TODO: 暂时未知session作用
  @Post('/session')
  testSession(@Session() session) {
    console.log(session)
  }

  @Post('/ip')
  testIp(@Ip() ip) {
    console.log('ip', ip)
    return ip
  }

  @Post('/host')
  testHost(@HostParam() host) {
    console.log('host', host)
    return host
  }
  // TODO: 待完成 自定义装饰器 UserDto 定义接收到的body带有的字段
  @Post('useDto')
  useDto(@Body() userDto: UserDto) {
    console.log(userDto.name)
    return 'ok'
  }
}
```

## 注意事项

> 注入的 service 依赖不能是接口 必须是一个类

```ts
@Controller('cats')
// 使用接口声明会找不到依赖
// @see:https://blog.csdn.net/u011607490/article/details/86577556
export class CatsControll {
  constructor(private catsService: CatsService) {}
  private age = 18
  @Get()
  getCats(): Record<string, unknown> {
    console.log(this.catsService.Cats)
    console.log(this.age)
    return { message: this.catsService.Cats }
  }

  @Post()
  setCats(@Body() cats: Cats): string {
    this.catsService.Cats = cats.name
    this.age = 22
    console.log(cats.name)
    return this.catsService.Cats
  }
}
```

## Injectable

决定依赖的声明周期

```ts
/**
 * @Injectable({scope: Scope.REQUEST | Scope.SINGLETON | Scope.TRANSIENT | Scope.DEFAULT})
 * REQUEST：  一个请求一个实例  请求（REQUEST）：
 * TRANSIENT  一个Controller 一个实例 瞬态（TRANSIENT）
 * 默认（DEFAULT）默认的时候 所有的Controller 都共用一个实例
 * 还可以拥有自定义的提供者 @see https://docs.nestjs.com/fundamentals/injection-scopes
 */

// 存在作用域链的关系 被依赖方会和依赖方同一生命周期
// 相当于Controller的实例的生命周期取决于Service的生命周期
// Injectable指定类的生命周期
@Injectable({
  scope: Scope.TRANSIENT,
})
export class CatsService {
  private scoped = 'Cats'
  // 不能有contractor
  get Cats(): string {
    return this.scoped
  }

  set Cats(str: string) {
    this.scoped = str
  }
}
```

## 中间件 middleware

​ 在 module.ts 层引入

```ts
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TestModuleController } from './modules.controller'
import { ModulesService } from './modules.service'
import { ModulesMiddleware } from './modules.middleware'
import { logger } from './logger.middleware'

@Module({
  controllers: [TestModuleController],
  providers: [ModulesService],
})
export class TestModules implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes 路由路径 或者是请求方法
    // 如果是路由路径 (路由路径需要逐级匹配)
    // get: module/modules/1  forRouter可以是 module module/modules module/modules/1 都可以进入中间件
    // consumer.apply(ModulesMiddleware).forRoutes('module');
    // 2. 另外一种写法
    // 这里的路径需要指定为详细的路径 或者为模式匹配
    consumer
      .apply(ModulesMiddleware, logger)
      // 采用一个字符串，多个字符串或一个 RouteInfo 对象来标识要排除的路由
      .exclude(
        { path: 'module/modules/1', method: RequestMethod.GET },
        { path: 'module/modules/2', method: RequestMethod.GET },
        'modules/*'
      )
      // forRoutes() 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类
      .forRoutes({ path: 'module/*', method: RequestMethod.GET })
  }
}
```

## typeorm 的使用

- [中文文档](https://typeorm.biunav.com/zh/find-options.html#%E8%BF%9B%E9%98%B6%E9%80%89%E9%A1%B9)

  > 查询所有

```ts
const d = await this.jueEntity.find({ where: { id } })
```

> 查询单条记录

```ts
const d = await this.jueEntity.findOne({ where: { id } })
```

> 保存记录

```ts
const d = await this.jueEntity.save({ aid, uuid, cookies })
```

> 删除记录

```ts
const d = await this.jueEntity.remove({ id })
```

## pm2 启动 nest 项目

1. 将项目进行 npm run build 打包
2. 之后将 dist 和根目录下的 package.json 丢到服务器的文件夹上
3. 进入目录进行 npm install
4. 运行在 pm2 上

```bash
pm2 start npm --name <name> -- run start:prod
```

相当于运行了

```bash
pm2 start npm auto_sign -- run node dist/main.js
```

### pm2 的一些基本命令

```bash
$ npm install pm2 -g     # 命令行安装 pm2
$ pm2 start app.js -i 4  # 后台运行pm2，启动4个app.js
                         # 也可以把'max' 参数传递给 start
                         # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               # 显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程

```

## cross-env 统一 node 脚本环境变量

由于在 linux 和 window 下的
[cross-env](https://www.npmjs.com/package/cross-env)

```shell
{
  "start":cross-env NODE_ENV=development nest start --watch
}
```

## typeorm 外键一对多关系

[避免创建外键约束](https://typeorm.biunav.com/zh/relations-faq.html#%E9%81%BF%E5%85%8D%E5%88%9B%E5%BB%BA%E5%A4%96%E9%94%AE%E7%BA%A6%E6%9D%9F)
[外键约束](https://typeorm.bootcss.com/many-to-one-one-to-many-relations)
[基本使用](https://111hunter.github.io/2020-04-10-typeorm/)
