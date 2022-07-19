import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Layout from "@/components/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login, // login页面一上来就要显示，所以不需要懒加载
  },
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/home"),
        meta: {
          title: "首页",
        },
      },
    ],
    // 最普通的写法
    /* children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "member",
        name: "member",
        component: () => import("@/views/member"),
        meta: {
          title: "会员管理",
        },
      },
      {
        path: "supplier",
        name: "supplier",
        component: () => import("@/views/supplier"),
        meta: {
          title: "供应商管理",
        },
      },
      {
        path: "goods",
        name: "goods",
        component: () => import("@/views/goods"),
        meta: {
          title: "商品管理",
        },
      },
      {
        path: "staff",
        name: "staff",
        component: () => import("@/views/staff"),
        meta: {
          title: "员工管理",
        },
      },
    ], */
  },

  // 第二种写法
  {
    path: "/member",
    component: Layout,
    children: [
      {
        path: "/",
        name: "member",
        component: () => import("../views/member"),
        meta: {
          title: "会员管理",
        },
      },
    ],
  },
  {
    path: "/supplier",
    component: Layout,
    children: [
      {
        path: "/",
        name: "supplier",
        component: () => import("../views/supplier"),
        meta: {
          title: "供应商管理",
        },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    children: [
      {
        path: "/",
        name: "goods",
        component: () => import("../views/goods"),
        meta: {
          title: "商品管理",
        },
      },
    ],
  },
  {
    path: "/staff",
    component: Layout,
    children: [
      {
        path: "/",
        name: "staff",
        component: () => import("../views/staff"),
        meta: {
          title: "员工管理",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
