/* node处理路径的工具库 */
const path = require('path')

module.exports = {
  /* 入口文件 */
  entry: path.join(__dirname, '../src/index.js'),

  /* 输出到dist文件夹，输出文件名称为bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
}
