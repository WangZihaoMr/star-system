// 引入axios实例
import req from "@/utils/request";

/**
 * 获取/查询 供应商列表接口
 * **/
const getSupplierList = (currentPage = 1, pageSize = 2, data = {}) => {
  return req({
    url: `/supplier/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data,
  });
};
/**
 * 删除单个供应商接口
 * **/
const deleteSuppliser = (id) => {
  return req({ url: `/supplier/${id}`, method: "DELETE" });
};

/**
 * 新增接口
 * **/
const addSupplier = (data) => {
  console.log("我是添加的表单数据", data);
  return req({ url: "/supplier/", method: "POST", data });
};

/**
 * 查询单个接口    数据回显
 * **/
const backfillSupplier = (id) => {
  return req({ url: `/supplier/${id}`, method: "GET" });
};

/**
 * 编辑接口
 * **/
const editSupplier = (id, data) => {
  console.log("编辑坎坎坷坷", id, data);
  return req({ url: `/supplier/${id}`, method: "PUT", data });
};

export default {
  getSupplierList,
  deleteSuppliser,
  addSupplier,
  backfillSupplier,
  editSupplier,
};
