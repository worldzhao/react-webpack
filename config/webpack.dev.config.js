const webpack = require('webpack')
/* node处理路径的工具库 */
const path = require('path')

module.exports = {
  /* 入口文件 */
  entry: path.join(__dirname, '../src/index.js'),
  /* 开启source-map */
  devtool: 'cheap-module-source-map',
  resolve: {
    /* 以下后缀文件在引入时可以不用补全后缀名 */
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      views: path.join(__dirname, '../src/views'),
      components: path.join(__dirname, '../src/components'),
      router: path.join(__dirname, '../src/router')
    }
  },
  /*src文件夹下面的以.js(x)结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  /* webpack-dev-server配置*/
  devServer: {
    /* 服务根目录 默认指向项目根目录 */
    contentBase: path.join(__dirname, '../dist'),
    /* 所有404 定位到根路径 */
    historyApiFallback: true,
    /* 服务端口 */
    port: 8080,
    /* 热更新 */
    hot: true,
    /* 自动打开页面 */
    open: true
  },
  /* webpack 热更新 插件*/
  plugins: [new webpack.HotModuleReplacementPlugin()],
  /* 输出到dist文件夹，输出文件名称为bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
}
