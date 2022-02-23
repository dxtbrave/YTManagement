const path = require('path')

module.exports = {
    outputDir: './build',
    devServer: {
        proxy: {
            '^/api': {
                target:'http://152.136.185.210:4000',
                pathRewrite:{
                    '^/api':''
                },
                changeOrigin:true
            }
        }
    },
    // configureWebpack: {
    //   resolve: {
    //     alias: {
    //       views: '@/views'
    //     }
    //   }
    // }
    // configureWebpack: (config) => {
    //   config.resolve.alias = {
    //     '@': path.resolve(__dirname, 'src'),
    //     views: '@/views'
    //   }
    // },
    // publicPath:'./',
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'))
            .set('views', '@/views')
            .set('components', '@/components')
    }
}