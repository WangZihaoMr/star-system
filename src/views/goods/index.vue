<template>
  <div class="containner">
    <!-- 表单查询 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchForm"
      label-width="80px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="searchForm.name"
          placeholder="商品名称"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="searchForm.code"
          placeholder="商品编号"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          readonly
          v-model="searchForm.supplierName"
          placeholder="选择供应商"
          @click.native="handleOpenDialog"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuerySearchForm"
          >查询</el-button
        >
        <el-button type="primary" @click="handleAddGoods">新增</el-button>
        <el-button @click="handleResetSearchForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="goodsList" border style="width: 100%; height: 380px">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column prop="spec" label="商品规格"> </el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            @click="handleEditGoods(scope.row)"
            type="primary"
            size="mini"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDeleteGoods(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <el-dialog
      title="选择供应商"
      :visible.sync="dialogTableVisible"
      width="500px"
    >
      <Supplier
        @handleGetRowChange="handleGetRowChange"
        :isDialog="true"
        :showPages="showPages"
      ></Supplier>
    </el-dialog>
    <!-- 新增，编辑模态框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        label-width="80px"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="dialogForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="dialogForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="dialogForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="dialogForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="dialogForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input
            readonly
            v-model="dialogForm.supplierName"
            @click.native="handleShowSupplierTable"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      class="dialog"
      :visible="dialogSupplierVisible"
      title="选择供应商"
    >
      <Supplier></Supplier>
    </el-dialog>
  </div>
</template>

<script>
import Goods from "@/api/goods";
import Supplier from "../supplier";
import DialogForm from "@/components/DialogForm";
export default {
  name: "",
  components: { Supplier, DialogForm },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      goodsList: [],
      searchForm: {
        name: "",
        code: "",
        supplierName: "",
      },
      dialogTableVisible: false,
      dialogTitle: "",
      dialogForm: {
        name: "",
        code: "",
        spec: "",
        retailPrice: "0",
        purchasePrice: "0",
        storageNum: "0",
        supplierName: "",
        supplierId: "",
      },
      dialogFormVisible: false,
      dialogFormColumns: [
        {
          type: "input",
          prop: "name",
          label: "商品名称",
        },
        {
          type: "input",
          prop: "code",
          label: "商品编码",
        },
        {
          type: "input",
          prop: "spec",
          label: "商品规格",
        },
        {
          type: "input",
          prop: "retailPrice",
          label: "零售价",
        },
        {
          type: "input",
          prop: "purchasePrice",
          label: "进货价",
        },
        {
          type: "input",
          prop: "storageNum",
          label: "库存数量",
        },
        {
          type: "readonly",
          prop: "supplierName",
          label: "供应商",
          readonly: "readonly",
          placehodler: "选择供应商",
        },
      ],
      rules: {
        name: [{ required: true, message: "商品名称不能为空！" }],
        code: [{ required: true, message: "商品编码不能为空！" }],
        retailPrice: [{ required: true, message: "零售价不能为空！" }],
      },
      dialogSupplierVisible: false,
    };
  },
  created() {
    this.loadGoodsList();
  },
  methods: {
    // 获取商品列表数据
    async loadGoodsList() {
      try {
        const { count, rows } = await Goods.getGoodsList(
          this.pageNum,
          this.pageSize,
          this.searchForm
        );
        this.goodsList = rows;
        this.total = count;
        console.log(this.goodsList);
      } catch (error) {
        this.$message.error("商品数据获取失败！");
      }
    },
    // 条数改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadGoodsList();
    },
    // 页码改变
    handleCurrentChange(page) {
      this.pageNum = page;
      this.loadGoodsList();
    },
    // 删除
    handleDeleteGoods(row) {
      try {
        this.$confirm("确认删除这条记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await Goods.deleteGoods(row.id);
            this.pageNum = 1;
            this.loadGoodsList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } catch (error) {
        this.$message.error("删除失败！");
      }
    },
    // 打开模态框
    handleOpenDialog() {
      this.dialogTableVisible = true;
    },
    // 获取当前点击行的数据
    handleGetRowChange(row) {
      this.searchForm.supplierName = row.name;
    },
    // 查询
    handleQuerySearchForm() {
      this.pageNum = 1;
      this.loadGoodsList();
    },
    // 重置
    handleResetSearchForm() {
      this.$refs["searchForm"].resetFields();
      this.handleQuerySearchForm();
    },
    // 显示supplier表格
    handleShowSupplierTable() {
      this.dialogSupplierVisible = !this.dialogSupplierVisible;
      console.log(this.dialogSupplierVisible);
    },
    // 编辑
    handleEditGoods() {
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑商品";
    },
    // 新增
    handleAddGoods() {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增商品";
    },
  },
};
</script>
<style scoped lang="scss"></style>
