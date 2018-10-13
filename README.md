# react-webpack

从零搭建 react 工程项目

## babel 部分

```
原始代码 --> [Babel Plugin] --> 转换后的代码
```

### 转译

安装以下依赖：

1.  `@babel/core`调用 Babel 的 API 进行转码
2.  `babel-loader`[webpack 的 loader]（https://github.com/babel/babel-loader)
3.  `@babel/preset-env` 在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者 babel-preset-es2015，babel-preset-es2016 和 babel-preset-es2017 一起）的行为完全相同。 4.~~`@babel/preset-stage-0`稻草人提案(babel7 已移除)~~通过 npx babel-upgrade --write 升级
4.  `@babel/preset-react`react 语法转译
    preset 即 plugin 的套餐，无需针对一个个语法规则去安装 plugin

注：[plugin 分为转译 plugin/语法 plugin/混合 plugin](https://babel.docschina.org/docs/en/6.26.3/plugins#es2015)

```
env = es2015 + es2016 + es2017
stage-0 = stage-1 + stage-2 + stage-3
```

通过配置 targets 可以避免浏览器已经支持的特性被转译，如果同时设置"IE >= 9"与 "chrome >= 66"，以 "IE >= 9" 为准进行转译

### polyfill

| 方案                                                    | 优点                                                    | 缺点                                   | 推荐使用环境       |
| ------------------------------------------------------- | ------------------------------------------------------- | -------------------------------------- | ------------------ |
| @babel/runtime + @babel/plugin-transform-runtime        | 按需引入，打包体积小，移除冗余工具函数(helper function) | 不模拟实例方法                         | 开发库、工具中使用 |
| @babel/polyfill                                         | 完整模拟 ES2015+环境                                    | 体积过大，污染全局对象和内置的对象原型 | 应用中使用         |
| @babel/preset-env[useBuiltIns:"entry"] + babel-polyfill | 按需引入,以 target 最低要求为准                         | 可配置性高                             | -                  |

### [Babel 正在向每个文件中注入 help 并使代码膨胀](https://github.com/babel/babel-loade)

解决方案：[@babel/runtime + @babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

```
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false, // 假设polyfill由其他方案提供
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

配置详情参见: /.babelrc 以及/config/webpack.dev.config.js

- [babel](https://babeljs.io/)
- [babel/babel-loader](https://github.com/babel/babel-loader)
- [大前端的自动化工厂— babel](https://zhuanlan.zhihu.com/p/44174870)
- [babel 7 教程](https://blog.zfanw.com/babel-js/)
- [再见，babel-preset-2015](https://zhuanlan.zhihu.com/p/29506685)
- [你真的会用 babel 吗？ ](https://github.com/sunyongjian/blog/issues/30)
- [21 分钟精通前端 Polyfill 方案](https://zhuanlan.zhihu.com/p/27777995)
- [babel-polyfill VS babel-runtime VS babel-preset-env](https://juejin.im/post/5aefe0a6f265da0b9e64fa54)
