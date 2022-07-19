<template>
  <div class="">
    <!-- 会员查询 -->
    <el-form
      ref="queryForm"
      :inline="true"
      :model="model"
      class="demo-form-inline"
    >
      <template v-for="(item, index) in searchFormColumns">
        <el-form-item v-if="item.type === 'input'" v-bind="item" :key="index">
          <el-input v-model.trim="model[item.prop]" v-bind="item"></el-input>
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'select'"
          v-bind="item"
          :key="index"
        >
          <el-select v-bind="item" v-model.trim="model[item.prop]">
            <el-option
              v-for="(ele, i) in item.payType"
              :key="i"
              :label="ele.payment"
              :value="ele.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'date'"
          v-bind="item"
          :key="index"
          :value-format="item.value_format"
        >
          <el-date-picker
            class="search-item"
            v-model.trim="model[item.prop]"
            v-bind="item"
          >
          </el-date-picker>
        </el-form-item>
        <template v-if="item.type === 'action'">
          <el-form-item :key="index">
            <el-button
              v-for="(ele, i) in item.buttons"
              :key="i"
              v-bind="ele"
              @click="throttle(ele.action)"
              >{{ ele.text }}</el-button
            >
          </el-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
// import { throttle } from "@/utils/utils";

export default {
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    searchFormColumns: {
      type: Array,
      default: () => [],
    },
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    throttle: _.throttle(
      function (action) {
        this.handleAction(action);
      },
      1000,
      {
        leading: true, // 指定调用在节流开始前
        trailing: false, // 指定调用在节流结束后
      }
    ),
    handleAction(action) {
      this.$emit("handleAction", action);
    },
    handleReset() {
      this.$refs["queryForm"].resetFields();
    },
  },
};
</script>
<style scoped lang="scss"></style>

<!-- <el-form-item class="search-item" prop="cardNum">
        <el-input
          v-model.trim="model.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item class="search-item" prop="name">
        <el-input v-model.trim="model.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item class="selectPayment" prop="payType">
        <el-select v-model.trim="model.payTypeList" placeholder="支付类型">
          <el-option
            v-for="item in payTypeList"
            :key="item.type"
            :label="item.payment"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          class="search-item"
          v-model.trim="model.birthday"
          type="date"
          placeholder="选择日期"

        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchForm">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="default" @click="handleResetForm">重置</el-button>
      </el-form-item> -->
