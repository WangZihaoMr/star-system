<template>
  <div class="main">
    <bread v-show="$route.path !== '/home'"></bread>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import bread from "@/components/common/bread";
export default {
  name: "",
  components: {
    bread,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.el-breadcrumb {
  padding: 20px 20px;
  font-size: 18px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

</style>
