<!--
 * @Author: WangZihao 2597160811@qq.com
 * @Date: 2022-05-26 21:17:09
 * @LastEditors: WangZihao 2597160811@qq.com
 * @LastEditTime: 2022-07-12 21:08:42
 * @FilePath: \mypro\src\views\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="containner">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="50px"
      class="demo-ruleForm"
    >
      <h3 class="loginTitle">星空会员管理系统</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLoginForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleLoginForm(loginForm) {
      this.$refs["loginForm"].validate(async (valid) => {
        if (!valid) return;
        const response = await this.$store.dispatch(
          "handleSetToken",
          this.loginForm
        );
        if (!response) return;
        const userInfo = await this.$store.dispatch("getUserInfo");
        if (!userInfo) return;
        this.$message.success("登陆成功");
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped lang="scss">
.containner {
  width: 100%;
  height: 100%;
  background: url("http://vue.mengxuegu.com/img/login.b665435f.jpg") no-repeat;
  .demo-ruleForm {
    width: 350px;
    padding: 28px;
    margin: auto;
    background: rgb(255, 255, 255, 0.8);
    position: absolute;
    left: 50%;
    top: 160px;
    margin-left: -175px;
    border-radius: 20px;
    .loginTitle {
      text-align: center;
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 40px;
    }
  }
}
</style>
