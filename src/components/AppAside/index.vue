<template>
  <div class="aside">
    <el-menu
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.path_Name"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.auth_Name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      menuList: [
        {
          id: 1,
          icon: "el-icon-s-home",
          path_Name: "/home",
          auth_Name: "首页",
        },
        {
          id: 2,
          icon: "el-icon-s-custom",
          path_Name: "/member",
          auth_Name: "会员管理",
        },
        {
          id: 3,
          icon: "el-icon-s-cooperation",
          path_Name: "/supplier",
          auth_Name: "供应商管理",
        },
        {
          id: 4,
          icon: "el-icon-s-goods",
          path_Name: "/goods",
          auth_Name: "商品管理",
        },
        {
          id: 5,
          icon: "el-icon-user",
          path_Name: "/staff",
          auth_Name: "员工管理",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
