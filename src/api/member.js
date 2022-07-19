// 引入axios实例
import req from "@/utils/request";

/***
 * 1.会员管理列表
 * 2.分页数据
 * 3.查询数据
 *  */
const getMemberList = (currentPage, pageSize, data = {}) => {
  // path传参 ：  /member/list/search/{currentPage}/{pageSize}
  // url传参 ：/member/list/search?currentPage=${currentPage}
  return req({
    url: `/member/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data,
  });
};

/**
 * 删除会员
 * **/
const deleteMember = (id) => {
  return req({ url: `/member/${id}`, method: "DELETE" });
};

/**
 * 新增接口
 * **/
const addMember = (data) => {
  return req({ url: "/member", method: "POST", data });
};

/**
 * 编辑查询回显
 * **/
const backfillMember = (id) => {
  return req({ url: `/member/${id}`, method: "GET" });
};

/**
 * 编辑更改接口
 * **/
const editMember = (id, data) => {
  console.log(id, data);
  return req({ url: `/member/${id}`, method: "PUT", data });
};

export default {
  getMemberList,
  deleteMember,
  addMember,
  backfillMember,
  editMember,
};
