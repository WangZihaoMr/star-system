import Vue from "vue";
import Vuex from "vuex";
// 引入本地方法
import {
  setToken,
  getToken,
  setUserInfo,
  getUserInfo,
  removeToken,
} from "@/utils/auth";
// 引入token请求
import User from "@/api/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() || "",
    userInfo: getUserInfo() || null,
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setUserInfo(userInfo);
    },
    removeUserToken(state) {
      state.token = "";
    },
    removeUserInfo(state) {
      state.userInfo = null;
    },
  },
  actions: {
    async handleSetToken({ commit }, layload) {
      const response = await User.login(layload);
      if (response) {
        commit("setToken", response.token);
      }
      return response;
    },
    async getUserInfo({ commit }) {
      const userInfo = await User.getUserInfo();
      commit("setUserInfo", userInfo);
      // console.log(userInfo);
      return userInfo;
    },
    async quitLogin({ commit }) {
      const logout = await User.quitLogin();
      commit("removeUserToken");
      commit("removeUserInfo");
      removeToken();
      // console.log(logout);
      return logout;
    },
  },
  modules: {},
});
