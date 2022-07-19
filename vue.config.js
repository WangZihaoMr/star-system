const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "element-ui": "ELEMENT",
      // lodash: "Lodash",
      // dayjs: "dayjs",
    },
    plugins: [new BundleAnalyzerPlugin()],
  },
  // 解决打包过后首屏白屏的问题
  publicPath: "./",
  // 配置服务器
  devServer: {
    // 配置端口号
    port: 8080,
    // 配置主机名
    host: "localhost",
    // 配置是否打开浏览器
    open: false,
    // 配置是否开启https协议
    https: false,
    // 配置代理
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_SERVER_URL, // 要跨域的地址
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          // 路径重写
          ["^" + process.env.VUE_APP_BASE_URL]: "",
        },
      },
    },
  },
  // 关闭eslint语法检测
  lintOnSave: false,
  // 打包时不会生成 .map 文件，加快打包速度
  productionSourceMap: false,
};
