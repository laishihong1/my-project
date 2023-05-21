const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
   devServer:{
    proxy: {
      '/api': {
          target: 'http://localhost:8080', //接口域名
          changeOrigin: true,             //是否跨域
         // ws: true,        
          pathRewrite: {                  //路径重置
              '^/api': ''
          }
      }
  }
      
   }
})



