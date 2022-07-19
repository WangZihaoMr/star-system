// 引入axios实例
import req from "@/utils/request";

/**
 *获取/查询 员工列表接口
 * */
const getStaffList = (currentPage = 1, pageSize = 2, data = {}) => {
  return req({
    url: `/staff/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data,
  });
};

/**
 * 删除单个员工接口
 * **/
const deleteStaff = (id) => {
  return req({ url: `/staff/${id}`, method: "DELETE" });
};

/**
 * 新增员工
 * **/
const addStaff = (data) => {
  return req({ url: "/staff", method: "POST", data });
};

/**
 * 查询单个员工接口     数据回显
 * **/
const backfillStaff = (id) => {
  return req({ url: `/staff/${id}`, method: "GET" });
};
/**
 * 编辑接口
 * **/
const editStaff = (id, data) => {
  return req({ url: `/staff/${id}`, method: "PUT", data });
};

export default {
  getStaffList,
  deleteStaff,
  addStaff,
  backfillStaff,
  editStaff,
};
