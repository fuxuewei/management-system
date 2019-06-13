module.exports = {
    lintOnSave: true,
   
    devServer: {
      proxy: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://apps.dev.colyst.cn',   //代理接口
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/mgmt-center/login',    //代理的路径
          }
        },
        '/i2connect': {  
          target: 'http://i2co3.dev.colyst.cn',
          changeOrigin: true
        }
      }
    }

  }