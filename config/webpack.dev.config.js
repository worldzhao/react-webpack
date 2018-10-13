/* node处理路径的工具库 */
const path = require('path')

module.exports = {
  /* 入口文件 */
  entry: path.join(__dirname, '../src/index.js'),

  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
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

  /* 输出到dist文件夹，输出文件名称为bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
}
