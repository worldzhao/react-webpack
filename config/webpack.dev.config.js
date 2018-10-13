/* node处理路径的工具库 */
const path = require('path')

module.exports = {
  /* 入口文件 */
  entry: path.join(__dirname, '../src/index.js'),

  resolve: {
    /* 以下后缀文件在引入时可以不用补全后缀名 */
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
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
    port: 8080
  },
  /* 输出到dist文件夹，输出文件名称为bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
}
