<template>
  <div class="header">
    <div class="left">
      <img
        src="http://vue.mengxuegu.com/img/logo.7156be27.png"
        width="25"
        height="25"
      />
      <h3>星空后台管理系统</h3>
    </div>
    <!-- 下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ getUsername() }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="change_password">修改密码</el-dropdown-item>
        <el-dropdown-item command="user_loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    // 下拉菜单
    handleCommand(command) {
      switch (command) {
        case "change_password":
          this.handleChangePassword();
          break;
        case "user_loginout":
          this.handleLoginOut();
          break;
        default:
          break;
      }
    },
    // 修改密码事件
    handleChangePassword() {
      console.log("修改密码");
    },
    // 退出登录
    async handleLoginOut() {
      const logout = await this.$store.dispatch("quitLogin");
      this.$message.success(logout);
      this.$router.push("/login");
    },
    // 获取store里面的username
    getUsername() {
      return store.state.userInfo ? store.state.userInfo.username : "";
    },
  },
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: white;
}
.left {
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;
  img {
    margin-right: 10px;
  }
}
.el-dropdown-link {
  color: white;
}
</style>
