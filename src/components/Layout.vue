<template>
  <div class="containner">
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 侧边栏 -->
    <app-aside></app-aside>
    <!-- 主体 -->
    <app-main></app-main>
  </div>
</template>

<script>
import appHeader from "@/components/AppHeader";
import appAside from "@/components/AppAside";
import appMain from "@/components/AppMain";
export default {
  name: "",
  components: {
    appHeader,
    appAside,
    appMain,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.containner {
  width: 100%;
  height: 100%;
  .header {
    padding: 0 20px;
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #2d3a4b;
  }
  .aside {
    position: absolute;
    width: 230px;
    left: 0;
    top: 50px;
    bottom: 0;
    background-color: #545c64;
    overflow: auto;
  }
  .main {
    position: absolute;
    left: 230px;
    top: 50px;
    right: 0;
    bottom: 0;
    // background-color: pink;
    overflow: auto;
    padding: 20px;
  }
}
</style>
