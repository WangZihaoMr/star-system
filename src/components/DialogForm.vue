<template>
  <div class="">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="450px"
      :before-close="beforeClose"
    >
      <el-form
        ref="dialogForm"
        :model="value"
        :rules="rules"
        label-width="110px"
        style="width: '350px'"
      >
        <template v-for="(item, index) in dialogFormColumns">
          <el-form-item v-if="item.type === 'input'" v-bind="item" :key="index">
            <el-input v-model.trim="value[item.prop]"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type === 'date'" v-bind="item" :key="index">
            <el-date-picker v-model.trim="value[item.prop]" v-bind="item">
            </el-date-picker>
          </el-form-item>
          <el-form-item
            v-if="item.type === 'select'"
            v-bind="item"
            :key="index"
          >
            <el-select v-model="value[item.prop]" v-bind="item">
              <el-option
                v-for="(ele, index) in item.payType"
                :key="index"
                :value="ele.type"
                :label="ele.payment"
                :placeholder="item.placeholder"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="item.type === 'textarea'"
            v-bind="item"
            :key="index"
          >
            <el-input
              :type="item.type"
              v-model.trim="value[item.prop]"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetDialogForm">取 消</el-button>
        <el-button type="primary" @click="handleDialogFormSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Object,
      default: () => {},
    },
    /* model: {
      type: Object,
      default: () => {},
    }, */
    visible: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    dialogFormColumns: {
      type: Array,
      default: () => [],
    },
    handleResetDialogFormClose: {
      type: Function,
    },
    handleOpenDialog: {
      type: Function,
    },
  },
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    handleResetDialogForm() {
      this.$emit("handleResetDialogForm");
    },
    handleDialogFormSubmit() {
      this.$emit("handleDialogFormSubmit");
    },
    beforeClose() {
      this.handleResetDialogFormClose();
    },
  },
};
</script>
<style scoped lang="scss"></style>
