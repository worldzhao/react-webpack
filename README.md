# react-webpack

从零搭建 react 工程项目

## [babel](https://babeljs.io/)

```
原始代码 --> [Babel Plugin] --> 转换后的代码
```

### 转译

安装以下依赖：

1.  `@babel/core`调用 Babel 的 API 进行转码
2.  `babel-loader`[webpack 的 loader]（https://github.com/babel/babel-loader)
3.  `@babel/preset-env` 在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者 babel-preset-es2015，babel-preset-es2016 和 babel-preset-es2017 一起）的行为完全相同。
4.  ~~`@babel/preset-stage-0`稻草人提案(babel7 已移除)~~通过 npx babel-upgrade --write 升级
5.  `@babel/preset-react`react 语法转译
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

注：方案 1 中的@babel/runtime + @babel/plugin-transform-runtime 在 babel7 下只包含 helpers，如果想实现 polyfill ，需要使用@babel/runtime-corejs2，[升级详情](https://babel.docschina.org/docs/en/v7-migration#babel-runtime-babel-plugin-transform-runtime)

```
["@babel/plugin-transform-runtime", {
    "corejs": 2
}],
```

### [Babel 正在向每个文件中注入 help 并使代码膨胀](https://github.com/babel/babel-loader)

解决方案：[@babel/runtime + @babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

```
{
  "plugins": [
      "@babel/plugin-transform-runtime",
  ]
}
```

配置详情参见: /.babelrc 以及/config/webpack.dev.config.js

### 总结

1.  转译方案: @babel/preset-env + @babel/preset-react + 通过命令行升级的 stage-0
2.  polyfill 方案: @babel/polyfill + @babel/preset-env[useBuiltIns:"entry"]
3.  helpers 重复注入解决: @babel/runtime + @babel/plugin-transform-runtime

推荐阅读:

- [babel](https://babeljs.io/)
- [babel/babel-loader](https://github.com/babel/babel-loader)
- [大前端的自动化工厂— babel](https://zhuanlan.zhihu.com/p/44174870)
- [babel 7 教程](https://blog.zfanw.com/babel-js/)
- [升级至 babel 7](https://babel.docschina.org/docs/en/v7-migration)
- [再见，babel-preset-2015](https://zhuanlan.zhihu.com/p/29506685)
- [你真的会用 babel 吗？ ](https://github.com/sunyongjian/blog/issues/30)
- [21 分钟精通前端 Polyfill 方案](https://zhuanlan.zhihu.com/p/27777995)
- [babel-polyfill VS babel-runtime VS babel-preset-env](https://juejin.im/post/5aefe0a6f265da0b9e64fa54)

## [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver)

Use webpack with a development server that provides live reloading. This should be used for development only

提供热更新的开发服务器，仅仅用于开发环境。

当 webpack-dev-server 版本为 3 的时候，需要与 webpack4 搭配使用，与 webpack3 同时使用则会提示安装 webpack-cli

由于本项目使用的是 webpack3，所以安装 webpack-dev-server 的版本为 2

### 热更新

1.  CLI 方式

```
"scripts": {
    "start": "webpack-dev-server --config ./config/webpack.dev.config.js --color --progress --hot"
  },
```

2.  Node.js api 方式

```js
const webpack = require('webpack')

module.exports = {
  // ...
  /* webpack-dev-server配置*/
  devServer: {
    /* 服务根目录 默认指向项目根目录 */
    contentBase: path.join(__dirname, '../dist'),
    /* 所有404 定位到根路径 */
    historyApiFallback: true,
    /* 服务端口 */
    port: 8080,
    /* 热更新 */
    hot: true
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
  //...
}
```

配置了这些，每次修改了 js 依旧会自动刷新页面，而非热更新。

还需在 index.js 中进行配置

```js
if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(<App />, document.getElementById('app'))
  })
}

ReactDom.render(<App />, document.getElementById('app'))
```

### 使用[react-hot-loader](https://github.com/gaearon/react-hot-loader) 维持组件状态

虽然上面实现了 js 修改不刷新页面更新视图的效果，但是组件的 state 状态却被丢失了，可以通过配合 react-hot-loader 插件维持 state 状态

- react-hot-loader v4 配置方式

  1.  安装 react-hot-loader

  ```
  npm i react-hot-loader@next -D
  ```

  2.  配置 babel

  ```
   "plugins": ["react-hot-loader/babel"]
  ```

  3.  修改根组件

  ```
  import { hot } from 'react-hot-loader'

  export default hot(module)(App)
  ```

- react-hot-loader v3 配置方式

  1.  安装 react-hot-loader
  2.  配置 babel
  3.  修改根组件
  4.  webpack 配置文件入口修改

### 总结

有效的开发时热更新增加了`⌘+R`的寿命，也极大提高了我们的开发体验。
这一部分碰到较多的是版本问题，一定要多看第三方库的 github

## 配置 resolve 优化 import 路径

### resolve.extensions

如果引入的文件是`.js`后缀结尾，引入时可以不用加上后缀，但是如果是`.jsx`后缀结尾，要想不加上后缀，则要进行一下配置，否则会找不到模块。

`/config/webpack.dev.config.js`配置

```js
module.exports = {
  // ...
  resolve: {
    /* 以下后缀文件在引入时可以不用补全后缀名 */
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  }
  // ...
}
```

优化前:

```js
import Home from '../views/Home/index.jsx'
```

优化后:

```js
import Home from '../views/Home/index'
```

如果引入的文件名是 `index` 也可以简写成

```js
import Home from '../views/Home'
```

### resolve.alias

`/config/webpack.dev.config.js`配置

```js
module.exports = {
  // ...
  resolve: {
    /* 以下后缀文件在引入时可以不用补全后缀名 */
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      views: path.join(__dirname, '../src/views'),
      components: path.join(__dirname, '../src/components'),
      router: path.join(__dirname, '../src/router')
    }
  }
  // ...
}
```

优化前:

```js
import Home from '../views/Home'
```

优化后:

```js
import Home from 'views/Home/index'
```

## 编译 css(预处理器)

### 编译 css

```
npm i css-loader style-loader -D
```

[css-loader](https://github.com/webpack-contrib/css-loader): The css-loader interprets @import and url() like import/require() and will resolve them.

css-loader 像处理`import`和`require()`一样去处理`@import` 和 `url()`

[style-loader](https://github.com/webpack-contrib/style-loader):Adds CSS to the DOM by injecting a `<style>` tag

style-loader 通过添加`<style>`标签的方式将 css 加入 dom

webpack 通过使用二者将 css 导入到 js 中，最终通过 js 生 style 标签插入页面

`/config/webpack.dev.config.js`配置

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  }
  // ...
}
```

注意：loader 的处理顺序是从后往前的，即 css 文件首先经过 css-loader 处理再经过 style-loader 处理

### 编译 less/sass/stylus

首先安装 less 以及 less-loader

```
npm i less less-loader -D
```

[less-loader](https://github.com/webpack-contrib/less-loader):A Less loader for webpack. Compiles Less to CSS.

将 less 编译成 css

`/config/webpack.dev.config.js`配置

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
  // ...
}
```

### CSS Modules(模块化)

[官方教程](https://github.com/webpack-contrib/css-loader#modules)
[CSS Modules 详解及 React 中实践](https://github.com/camsong/blog/issues/5)
[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

留坑待填

### 集成 PostCSS

[官方教程](https://github.com/postcss/postcss/blob/master/README-cn.md)

留坑待填
