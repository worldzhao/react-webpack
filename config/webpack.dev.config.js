const webpack = require('webpack')
/* 打包分析工具 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
/* 自动生成html文件并且导入打包后的 js 的工具 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* node处理路径的工具库 */
const path = require('path')
/* 数据mock工具 */
const apiMocker = require('webpack-api-mocker')
/* Mock数据源路径 */
const mockDataPath = '../mock/index.js'

module.exports = {
  /* 入口文件 */
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  /* 输出到dist文件夹，输出文件名称为bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
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
  module: {
    rules: [
      /* 使用babel-loader编译js相关文件 */
      {
        test: /\.(js|jsx|mjs)?$/,
        loader: 'babel-loader',
        options: {
          /*cacheDirectory是用来缓存编译结果，下次编译加速*/
          cacheDirectory: true
        },
        /* 指定src文件下的内容 */
        include: path.join(__dirname, '../src')
      },
      /* 处理css */
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      /* 处理less */
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      /* 处理图片 */
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          /* 小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。 */
          limit: 8192
        }
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
    open: true,
    /* 数据Mock */
    before(app) {
      apiMocker(app, path.resolve(__dirname, mockDataPath), {})
    },
    proxy: {
      '/api': {
        target: 'http://119.29.241.71:3000/',
        pathRewrite: {
          '^/api': ''
        },
        /* 支持https */
        secure: false
      }
    }
  },
  /* webpack 热更新 插件*/
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'common-in-lazy',
      minChunks: ({ resource } = {}) =>
        resource && resource.includes('node_modules') && /axios/.test(resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => count >= 2
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
}
