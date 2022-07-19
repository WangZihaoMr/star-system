<template>
  <div class="containner">
    <!-- 表单 -->
    <QueryForm
      ref="queryForm"
      :model="searchForm"
      :searchFormColumns="searchFormColumns"
      @handleAction="handleQueryFormAction"
    ></QueryForm>
    <!-- 会员表格 -->
    <BaseTable
      :tableData="memberList"
      :tableColumns="tableColumns"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      :showPages="showPages"
      @event="handleTableAction"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></BaseTable>
    <!-- 模态框 :model="dialogForm" -->
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
import Member from "@/api/member";
import Format from "@/utils/format";
import payType from "@/enumeration/enumeration";
import BaseTable from "@/components/BaseTable";
import QueryForm from "@/components/QueryForm";
import DialogForm from "@/components/DialogForm";
export default {
  name: "",
  components: { BaseTable, QueryForm, DialogForm },
  data() {
    const validateCardNum = (rule, value, callback) => {
      const validateStatus = /\d/g.test(value);
      if (!validateStatus) return callback(new Error("卡号必须是数字！"));
    };
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      searchForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      memberList: [],
      payType,
      tableColumns: [
        {
          label: "序号",
          type: "index",
          width: "60",
        },
        {
          prop: "cardNum",
          label: "会员卡号",
        },
        {
          prop: "name",
          label: "会员姓名",
        },
        {
          prop: "birthday",
          label: "会员生日",
          formatter: (row, column, cellValue, index) => {
            return Format(cellValue);
          },
        },
        {
          prop: "phone",
          label: "手机号码",
          width: "110",
        },
        {
          prop: "integral",
          label: "可用积分",
        },
        {
          prop: "money",
          label: "开卡金额",
        },
        {
          prop: "payType",
          label: "支付类型",
          formatter: (row, column, type, index) => {
            const obj = payType.find((item) => item.type === type);
            return obj ? obj.payment : null;
          },
        },
        {
          prop: "address",
          label: "会员地址",
        },
        {
          label: "操作",
          width: "150",
          buttons: [
            {
              text: "编辑",
              type: "default",
              size: "mini",
              method_name: "edit",
            },
            {
              text: "删除",
              type: "danger",
              size: "mini",
              method_name: "delete",
            },
          ],
        },
      ],
      searchFormColumns: [
        {
          type: "input",
          prop: "cardNum",
          placeholder: "会员卡号",
        },
        {
          type: "input",
          prop: "name",
          placeholder: "会员姓名",
        },
        {
          type: "select",
          prop: "payType",
          placeholder: "支付类型",
          style: "width:110px",
          payType,
        },
        {
          type: "date",
          prop: "birthday",
          placeholder: "选择日期",
          value_format: "yyyy-MM-dd",
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
      showPages: true,
      dialogTitle: "",
      dialogFormVisible: false,
      dialogForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
        phone: "",
        integral: "0",
        money: "0",
        address: "",
      },
      rules: {
        cardNum: [
          { required: true, message: "卡号不能为空", trigger: "blur" },
          { validator: validateCardNum, trigger: "blur" },
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "blur" },
        ],
      },
      dialogFormColumns: [
        {
          type: "input",
          prop: "cardNum",
          label: "会员卡号",
        },
        {
          type: "input",
          prop: "name",
          label: "会员姓名",
        },
        {
          type: "date",
          prop: "birthday",
          label: "会员生日",
          value_format: "yyyy-MM-dd",
          placeholder: "选择日期",
        },
        {
          type: "input",
          prop: "phone",
          label: "手机号码",
        },
        {
          type: "input",
          prop: "money",
          label: "开卡金额",
        },
        {
          type: "input",
          prop: "integral",
          label: "可用积分",
        },
        {
          type: "select",
          prop: "payType",
          label: "支付类型",
          style: "width:110px",
          placeholder: "支付类型",
          payType,
        },
        {
          type: "textarea",
          prop: "address",
          label: "会员地址",
        },
      ],
    };
  },
  created() {
    this.loadMemberList();
  },
  methods: {
    // 获取member数据
    async loadMemberList() {
      const { count, rows } = await Member.getMemberList(
        this.pageNum,
        this.pageSize,
        this.searchForm
      );
      this.memberList = rows;
      this.total = count;
    },
    // 页面数量发生改变
    handleSizeChange(size) {
      this.pageSize = size;
      this.loadMemberList();
    },
    // 页码发生改变
    handleCurrentChange(page) {
      this.pageNum = page;
      this.loadMemberList();
    },
    // 查询member功能
    handleSearchForm() {
      this.pageNum = 1;
      this.loadMemberList();
    },
    // 重置searchForm功能
    handleResetForm() {
      // console.log(this.$refs["queryForm"]);
      this.$refs["queryForm"].handleReset();
      // this.$refs["queryForm"].$refs["queryForm"].resetFields();
      this.loadMemberList();
    },
    // 表单事件
    handleQueryFormAction(action) {
      if (action === "query") return this.handleSearchForm();
      if (action === "add") return this.handleOpenDialog("add");
      if (action === "reset") return this.handleResetForm();
    },
    // 表格抽离操作
    handleTableAction({ action, row }) {
      if (action === "edit") return this.handleOpenDialog("edit", row.id);
      if (action === "delete") return this.handleDelete(row.id);
    },
    // 删除功能
    handleDelete(id) {
      this.$confirm("亲，您真的狠心删除这条数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await Member.deleteMember(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loadMemberList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 对话框
    handleOpenDialog(action, id) {
      this.dialogFormVisible = true;
      if (action === "add") this.dialogTitle = "新增会员";
      if (action === "edit") this.dialogTitle = "编辑会员";
      if (action === "edit") return this.handleBackfill(id);
    },
    // 取消
    handleResetDialogForm() {
      this.dialogFormVisible = false;
      this.$refs["dialogForm"].$refs["dialogForm"].resetFields();
    },
    // 确定
    handleDialogFormSubmit() {
      this.dialogFormVisible = false;
      // console.log(this.dialogForm);
      if (this.dialogTitle === "编辑会员") {
        this.handleSubmitEdit();
      } else {
        this.handleSubmitAdd();
      }
    },
    // 编辑回显
    async handleBackfill(id) {
      try {
        const response = await Member.backfillMember(id);
        this.dialogForm = response;
      } catch (error) {
        this.$message.error("数据回显失败！");
      }
    },
    // 编辑
    async handleSubmitEdit() {
      try {
        await Member.editMember(this.dialogForm.id, this.dialogForm);
        this.loadMemberList();
        this.handleResetDialogForm();
        this.$message.success("编辑成功！");
      } catch (error) {
        this.$message.success("编辑失败！");
      }
    },
    // 添加
    async handleSubmitAdd() {
      try {
        await Member.addMember(this.dialogForm);
        this.loadMemberList();
        this.handleResetDialogForm();
        this.$message.success("新增成功！");
      } catch (error) {
        this.$message.success("新增失败！");
      }
    },
  },
  filters: {
    /* formatBrithdayFilter(time) {
      return Format(time);
    }, */
    /* formatPayTypeFilter(type) {
      const obj = paytype.find((item) => item.type === type);
      return obj ? obj.payment : null;
    }, */
  },
};
</script>
<style scoped lang="scss">
.selectPayment {
  width: 120px;
}
.search-item {
  width: 160px;
}
</style>

<!-- <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日">
        <template slot-scope="scope">
          <div>
            {{ scope.row.birthday | formatBrithdayFilter }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">
          <div>{{ scope.row.payType | formatPayTypeFilter }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="default" size="mini">编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->

<!-- <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model.trim="dialogForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model.trim="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model.trim="dialogForm.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.trim="dialogForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model.trim="dialogForm.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model.trim="dialogForm.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="dialogForm.payType"
            placeholder="支付类型"
            style="width: 110px"
          >
            <el-option
              v-for="(item, index) in payType"
              :key="index"
              :label="item.payment"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            type="textarea"
            v-model.trim="dialogForm.address"
          ></el-input>
        </el-form-item> -->
