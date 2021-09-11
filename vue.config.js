
module.exports = {
  devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      https: false,
      //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: {//配置跨域
          '/api': {
              // target: 'http://ttapi.research.itcast.cn/',//开发环境
              target: 'http://toutiao-app.itheima.net',//测试环境
              ws: true,
              changOrigin: true,//允许跨域
              pathRewrite: {
                  '^/api': ''//请求的时候使用这个api就可以
              }
          }
          
      }
  },

  publicPath: './'
}
