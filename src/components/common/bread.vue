<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="line">{{
      $route.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.line {
  border-left: 3px solid rgb(115, 191, 0);
  padding-left: 12px;
}
</style>
