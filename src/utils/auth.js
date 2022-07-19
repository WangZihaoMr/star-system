// 本地token字段
const TOKEN_KEY = "token";

// 本地userInfo字段
const USER_INFO_KEY = "userInfo";

// 存储token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// 获取token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// 删除token，删除用户信息
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

// 存储userInfo
export function setUserInfo(userInfo) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

// 获取userInfo
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || null);
}
