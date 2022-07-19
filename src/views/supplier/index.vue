<template>
  <div class="containner">
    <QueryForm
      ref="queryForm"
      :model="searchForm"
      :searchFormColumns="searchFormColumns"
      @handleAction="handleSearchFormAction"
    ></QueryForm>
    <BaseTable
      @handleGetRowChange="handleGetRowChange"
      :showPages="!isDialog"
      :tableData="supplierList"
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
      :visible="dialogFormVisible"
      :rules="rules"
      :dialogFormColumns="dialogFormColumns"
      :handleResetDialogFormClose="handleResetDialogForm"
      @handleResetDialogForm="handleResetDialogForm"
      @handleDialogFormSubmit="handleDialogFormSubmit"
    ></DialogForm>
  </div>
</template>

<script>
import Supplier from "@/api/supplier";
import BaseTable from "@/components/BaseTable";
import QueryForm from "@/components/QueryForm";
import DialogForm from "@/components/DialogForm";
export default {
  props: {
    isDialog: Boolean,
  },
  name: "",
  components: { BaseTable, QueryForm, DialogForm },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      searchForm: {
        name: "",
        linkman: "",
        mobile: "",
      },
      supplierList: [],
      tableColumns: [
        {
          type: "index",
          label: "序号",
          width: "100",
        },
        {
          label: "供应商名称",
          prop: "name",
        },
        {
          label: "联系人",
          prop: "linkman",
          width: "100",
        },
        {
          label: "联系电话",
          prop: "mobile",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "操作",
          width: "150",
          type: "action",
          buttons: [
            {
              type: "primary",
              size: "mini",
              method_name: "edit",
              text: "编辑",
            },
            {
              type: "danger",
              size: "mini",
              method_name: "delete",
              text: "删除",
            },
          ],
        },
      ],
      searchFormColumns: [
        {
          type: "input",
          prop: "name",
          placeholder: "供应商名称",
        },
        {
          type: "input",
          prop: "linkman",
          placeholder: "联系人",
        },
        {
          type: "input",
          prop: "mobile",
          placeholder: "联系电话",
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
        name: "",
        linkman: "",
        mobile: "",
        remark: "",
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" },
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
      },
      dialogFormColumns: [
        {
          type: "input",
          prop: "name",
          label: "供应商名称",
        },
        {
          type: "input",
          prop: "linkman",
          label: "联系人",
        },
        {
          type: "input",
          prop: "mobile",
          label: "联系电话",
        },
        {
          type: "textarea",
          prop: "remark",
          label: "备注",
        },
      ],
    };
  },
  created() {
    this.loadSupplierList();
    if (this.isDialog) {
      this.tableColumns.splice(3);
      this.searchFormColumns = [
        {
          type: "input",
          prop: "name",
          placeholder: "供应商名称",
        },
        {
          type: "action",
          buttons: [
            {
              type: "primary",
              text: "查询",
              action: "query",
            },
          ],
        },
      ];
    }
  },
  methods: {
    async loadSupplierList() {
      const { count, rows } = await Supplier.getSupplierList(
        this.pageNum,
        this.pageSize,
        this.searchForm
      );
      this.total = count;
      this.supplierList = rows;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadSupplierList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.loadSupplierList();
    },
    handleSearchFormAction(action) {
      if (action === "query") return this.handleSearchForm();
      if (action === "add") return this.handleOpenDialog("add");
      if (action === "reset") return this.handleResetForm();
    },
    handleTableAction({ action, row }) {
      if (action === "edit") return this.handleOpenDialog("edit", row.id);
      if (action === "delete") return this.handleDelete(row.id);
    },
    handleOpenDialog(action, id) {
      this.dialogFormVisible = true;
      this.dialogTitle = action === "add" ? "供应商新增" : "供应商编辑";
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
            await Supplier.deleteSuppliser(id);
            this.pageNum = 1;
            this.loadSupplierList();
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
    handleSearchForm() {
      this.pageNum = 1;
      this.loadSupplierList();
    },
    handleResetForm() {
      // 第一种
      this.$refs["queryForm"].$refs["queryForm"].resetFields();
      this.pageNum = 1;
      this.loadSupplierList();
    },
    // 模态框取消
    handleResetDialogForm() {
      this.dialogFormVisible = false;
      this.$refs["dialogForm"].$refs["dialogForm"].resetFields();
    },
    // 模态框确定
    handleDialogFormSubmit() {
      this.dialogTitle === "供应商新增"
        ? this.handleSubmitAdd()
        : this.handleSubmitEdit();
    },
    // 添加
    async handleSubmitAdd() {
      try {
        await Supplier.addSupplier(this.dialogForm);
        this.handleResetDialogForm();
        this.loadSupplierList();
        this.$message.success("新增成功！");
      } catch (error) {
        this.$message.error("新增失败！");
      }
    },
    // 编辑回显
    async handleBackfill(id) {
      try {
        const response = await Supplier.backfillSupplier(id);
        this.dialogForm = response;
      } catch (error) {
        this.$message.error("数据回显失败！");
      }
    },
    // 编辑
    async handleSubmitEdit() {
      try {
        await Supplier.editSupplier(this.dialogForm.id, this.dialogForm);
        this.handleResetDialogForm();
        this.loadSupplierList();
        this.$message.success("编辑成功！");
      } catch (error) {
        this.$message.error("编辑失败！");
      }
    },
    // 商品行数据
    handleGetRowChange(row) {
      this.$emit("handleGetRowChange", row);
    },
  },
};
</script>
<style scoped lang="scss"></style>
