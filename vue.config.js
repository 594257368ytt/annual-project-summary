const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const CopyPlugin = require('copy-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

let copy = []
if (process.env.ENV_TYPE && process.env.ENV_TYPE === 'local') {
  copy = [
    {
      from: resolve(`env/env_${process.env.APP_ENV}.js`),
      to: resolve('dist/env_config.js'),
    },
  ]
} else {
  copy = [
    {
      from: resolve('env'),
      to: resolve('dist/env'),
    },
  ]
}

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: './',
  outputDir: process.env.outputDir,
  lintOnSave: false,
  productionSourceMap: false,
  transpileDependencies: ['js-base64'],
  devServer: {
    host: '0.0.0.0',
    port: 18080,
    open: true,
    // proxy: {
    //   // 这里的'/api'指向了127.0.0.1:3000
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     // secure: false,  // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/api': '/' // 重写接口
    //     }
    //   }
    // }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_ass', resolve('src/assets'))
      .set('_img', resolve('src/assets/images'))
      .set('_api', resolve('src/api'))
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },

  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
      let optimization = {
        minimizer: [],
      }
      Object.assign(config, {
        optimization,
      })
    } else {
      config.devtool = 'source-map'
    }
    config.plugins.push(new CopyPlugin(copy))
    // 优化，采用外部cdn
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      echarts: 'echarts',
      moment: 'moment',
      'element-ui': 'ELEMENT',
      vant: 'vant',
    }
  },
  css:{"loaderOptions":{"less":{"lessOptions":{"modifyVars":{"primaryColor":"#0780ED","tint0":"7,128,237","tint1":"#208def","tint2":"#3999f1","tint3":"#51a6f2","tint4":"#6ab3f4","tint5":"#83c0f6","tint6":"#9cccf8","tint7":"#b5d9fa","tint8":"#cde6fb","tint9":"#e6f2fd","shade":"#673d5"},"javascriptEnabled":true}}}}
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/css/font.less')],
    })
}
