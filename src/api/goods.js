// 引入axios实例
import req from "@/utils/request";

/**
 * 获取/查询 商品列表接口
 * **/
const getGoodsList = (currentPage = 1, pageSize = 5, data = {}) => {
  return req({
    url: `/goods/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data,
  });
};

/**
 * 删除单个商品接口
 * **/
const deleteGoods = (id) => {
  return req({ url: `/goods/${id}`, method: "DELETE" });
};

/**
 * 新增商品
 * **/
const addGoods = (data = {}) => {
  return req({ url: "/goods", method: "POST", data });
};

/**
 * 查询单个商品接口
 * **/
const backfillGoods = (id) => {
  return req({ url: `/goods/${id}`, method: "GET" });
};

/**
 * 编辑商品
 * **/
const editGoods = (id, data = {}) => {
  return req({ url: `/goods/{id}`, method: "PUT", data });
};

// 导出
export default {
  getGoodsList,
  deleteGoods,
  addGoods,
  backfillGoods,
  editGoods,
};
