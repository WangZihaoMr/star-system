// 引入axios
import axios from "axios";
// 引入store
import store from "@/store/index";
// 引入router
import router from "@/router";

// 引入Message消息提示组件
import { Message } from "element-ui";

// 引入本地清除方法
import { removeToken } from "./auth";

// 引入Loading
import { Loading } from "element-ui";

// js单例设计模式： 
/* 保证一个类只有一个实例，
并且有一个接口供全局访问。
它的作用就是防止频繁创建实例，
防止浪费不必要的内存空间和资源消耗，
实用场景：我们在页面中有一个点击跳出一个弹窗操作，
弹窗应该是唯一的，无论点击多少次它都应该被构建一次，
那么这个弹窗就适合用单例模式来创建。 */
const loading = {
  loadingInstance: null,
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: ".main",
        text: "拼命加载中...",
        background: "rgba(0,0,0,0.8)",
      });
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  },
};

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    loading.open();
    // 获取token
    const token = store.state.token;
    token ? (config.headers.authorization = "Bearer " + token) : "";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    loading.close();
    // 请求成功
    if (response.data.code === 1) {
      return response.data.data;
    }
    // 请求成功 （我们返回的成功的字段不一样）
    if (response.data.error_code === 0) {
      return response.data.msg;
    }

    // 过期token处理
    if (response.data.code === -1) {
      /*  清空vuex的token
      清空vuex的userInfo
      清除本地token
      清除本地userInfo
      回到登录页 */

      // store.dispatch("quitLogin"); // 不推荐

      store.commit("removeUserToken", "");
      store.commit("removeUserInfo", "");
      removeToken();
      router.push("/login");
    }

    // 请求失败
    _showErrorMessage(response.data.message);
    loading.close();
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 对失败信息进行高内聚，低耦合优化
function _showErrorMessage(msg) {
  const message = msg || "发生未知错误";
  Message({ type: "error", message: message, duration: 1000 });
}

// 处理get请求方式的参数问题
function req(options) {
  // 如果存在请求方式，就赋值，否则默认get请求方式
  options.method = options.method || "GET";
  // 不管你是get还是post传参我们都以一种方式去传参
  if (options.method.toLocaleUpperCase() === "GET") {
    options.params = options.data;
  }
  return instance(options);
}

// 导出axios实例
export default req;
