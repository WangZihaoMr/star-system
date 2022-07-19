<template>
  <div class="containner">
    <QueryForm
      ref="queryForm"
      :model="searchForm"
      :searchFormColumns="searchFormColumns"
      @handleAction="handleQueryFormAction"
    ></QueryForm>
    <BaseTable
      :tableData="staffList"
      :tableColumns="tableColumns"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @event="handleTableAction"
    ></BaseTable>
    <DialogForm
      ref="dialogForm"
      :title="dialogTitle"
      v-model="dialogForm"
      :visible="dialogVisible"
      :rules="rules"
      :dialogFormColumns="dialogFormColumns"
      :handleResetDialogFormClose="handleResetDialogForm"
      @handleResetDialogForm="handleResetDialogForm"
      @handleDialogFormSubmit="handleDialogFormSubmit"
    ></DialogForm>
  </div>
</template>

<script>
import Staff from "@/api/staff";
import QueryForm from "@/components/QueryForm";
import BaseTable from "@/components/BaseTable";
import DialogForm from "@/components/DialogForm";
import format from "@/utils/format";
export default {
  name: "",
  components: { QueryForm, BaseTable, DialogForm },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      searchForm: {
        username: "",
        name: "",
      },
      staffList: [],
      tableColumns: [
        {
          label: "序号",
          type: "index",
          width: "60",
        },
        {
          label: "账号",
          prop: "username",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "电话",
          prop: "mobile",
        },
        {
          label: "薪酬",
          prop: "salary",
        },
        {
          label: "入职时间",
          prop: "createdAt",
          formatter: (row, column, cellValue, index) => {
            return format(cellValue);
          },
        },
        {
          label: "操作",
          width: "150",
          type: "action",
          buttons: [
            {
              type: "primary",
              size: "mini",
              text: "编辑",
              method_name: "edit",
            },
            {
              type: "danger",
              size: "mini",
              text: "删除",
              method_name: "delete",
            },
          ],
        },
      ],
      searchFormColumns: [
        {
          type: "input",
          prop: "username",
          placeholder: "账号",
        },
        {
          type: "input",
          prop: "name",
          placeholder: "姓名",
        },
        {
          type: "action",
          buttons: [
            {
              type: "primary",
              text: "查询",
              action: "query",
            },
            {
              type: "primary",
              text: "新增",
              action: "add",
            },
            {
              type: "default",
              text: "重置",
              action: "reset",
            },
          ],
        },
      ],
      dialogTitle: "",
      dialogForm: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "0",
        entryDate: "",
      },
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
      dialogFormColumns: [
        {
          type: "input",
          prop: "username",
          label: "账号",
        },
        {
          type: "input",
          prop: "name",
          label: "姓名",
        },
        {
          type: "input",
          prop: "age",
          label: "年龄",
        },
        {
          type: "input",
          prop: "mobile",
          label: "电话",
        },
        {
          type: "input",
          prop: "salary",
          label: "薪酬",
        },
        {
          type: "date",
          prop: "entryDate",
          label: "入职时间",
          value_format: "yyyy-MM-dd",
        },
      ],
    };
  },
  created() {
    this.loadStaffList();
  },
  methods: {
    async loadStaffList() {
      const { count, rows } = await Staff.getStaffList(
        this.pageNum,
        this.pageSize,
        this.searchForm
      );
      this.total = count;
      this.staffList = rows;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadStaffList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.loadStaffList();
    },
    // 表格button方法
    handleTableAction({ action, row }) {
      if (action === "edit") return this.handleOpenDialog("edit", row.id);
      if (action === "delete") return this.handleDelete(row.id);
    },
    handleOpenDialog(action, id) {
      this.dialogVisible = true;
      this.dialogTitle = action === "edit" ? "员工编辑" : "员工新增";
      if (action === "edit") return this.handleBackfill(id);
    },
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await Staff.deleteStaff(id);
            this.pageNum = 1;
            this.loadStaffList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } catch (error) {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleQueryFormAction(action) {
      if (action === "query") return this.handleSearchForm();
      if (action === "add") return this.handleOpenDialog("add");
      if (action === "reset") return this.handleResetForm();
    },
    // 查询member功能
    handleSearchForm() {
      this.pageNum = 1;
      this.loadStaffList();
    },
    // 重置searchForm功能
    handleResetForm() {
      // console.log(this.$refs["queryForm"]);
      this.$refs["queryForm"].handleReset();
      // this.$refs["queryForm"].$refs["queryForm"].resetFields();
      this.loadStaffList();
    },
    // 模态框取消
    handleResetDialogForm() {
      this.dialogVisible = false;
      this.$refs["dialogForm"].$refs["dialogForm"].resetFields();
    },
    // 模态框确定
    handleDialogFormSubmit() {
      this.dialogTitle === "员工新增"
        ? this.handleStaffAdd()
        : this.handleStaffEdit();
    },
    // 员工新增
    async handleStaffAdd() {
      try {
        await Staff.addStaff(this.dialogForm);
        this.loadStaffList();
        this.handleResetDialogForm();
        this.$message.success("新增成功！");
      } catch (error) {
        this.$message.error("新增失败！");
      }
    },
    // 员工信息回填
    async handleBackfill(id) {
      try {
        const response = await Staff.backfillStaff(id);
        this.dialogForm = response;
      } catch (error) {
        this.$message.error("数据回显失败！");
      }
    },
    // 员工编辑
    async handleStaffEdit() {
      try {
        await Staff.editStaff(this.dialogForm.id, this.dialogForm);
        this.loadStaffList();
        this.handleResetDialogForm();
        this.$message.success("编辑成功！");
      } catch (error) {
        this.$message.error("编辑失败！");
      }
    },
  },
};
</script>
<style scoped lang="scss"></style>
