<template>
  <div class="containner">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      height="380px"
      @current-change="handleGetRowChange"
    >
      <template v-for="(item, index) in tableColumns">
        <el-table-column
          v-if="item.type && !item.buttons"
          v-bind="item"
          :key="index"
        ></el-table-column>
        <el-table-column
          v-else-if="!item.type && !item.buttons"
          v-bind="item"
          :key="index"
        >
        </el-table-column>
        <el-table-column v-else-if="item.buttons" v-bind="item" :key="index">
          <template slot-scope="scope">
            <div>
              <el-button
                v-for="(button, i) in item.buttons"
                v-bind="button"
                :key="i"
                @click="handleAction(button.method_name, scope.row)"
                >{{ button.text }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="showPages" v-if="showPages">
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
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 2,
    },
    total: {
      type: Number,
      default: 0,
    },
    showPages: {
      type: Boolean,
      default: true,
    },
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    handleAction(action, row) {
      this.$emit("event", { action, row });
    },
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
    handleCurrentChange(page) {
      this.$emit("handleCurrentChange", page);
    },
    // 获取当前点击行的数据
    handleGetRowChange(row) {
      this.$emit("handleGetRowChange", row);
    },
  },
};
</script>
<style scoped lang="scss"></style>
