import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入重置样式表
import "@/style/reset.css";

// 引入element-ui
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 引入页面鉴权
import "./permission";

// 引入lodash
import _ from "lodash";
Vue.prototype._ = _;

// vue提供的一种方法router.getRoutes()：获取路由表
// console.log(router.getRoutes());

// 演示
/* 
import dayjs from "dayjs";
const time = dayjs("2022-05-25T00:00:00.000Z").format("YYYY-MM-DD");
console.log(time); */

// 格式日期挂载到原型 ---  不成熟   无法使用
/* import format from "./utils/format"
Vue.prototype.$format = format;
console.log(format); */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
