// 引入axios实例
import req from "@/utils/request";

// 获取token
const login = (data) => {
  return req({ url: "/admin/login", method: "POST", data });
};

// 获取用户信息
const getUserInfo = () => {
  return req({ url: "/admin/getUserInfo" });
};

//退出登录
const quitLogin = () => {
  return req({ url: "/admin/logout", method: "POST" });
};

// 导出
export default {
  login,
  getUserInfo,
  quitLogin,
};
