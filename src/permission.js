// 引入vue-router
import router from "@/router";
// 引入store
import store from "@/store";

router.beforeEach(async (to, from, next) => {
  const token = store.state.token;
  // console.log(token);
  if (!token) {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  } else {
    if (to.path === "/login") {
      next(from.path);
    } else {
      const userInfo = store.state.userInfo;
      // console.log(userInfo);
      if (userInfo) {
        next();
      } else {
        await store.dispatch("getUserInfo", token);
        next("/login");
      }
    }
  }
});
