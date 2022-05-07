<template>
  <div class="base-form">
    <el-form ref="form" :model="form" label-width="80px">
      <template v-for="(item, index) in formProps">
        <el-form-item v-if="item" :label="`${item.label}`" :key="index">
          <span v-if="item.type === 'text'">{{ item.text }}</span>
          <el-input v-model="form.name" v-if="item.type === 'input'"></el-input>
          <el-radio-group v-model="form.resource" v-if="item.type === 'radio'">
            <template v-for="(valueItem, valueIndex) in item.value">
              <el-radio :label="valueItem" :key="valueIndex"></el-radio>
            </template>
          </el-radio-group>
          <slot v-if="item.type === 'slot'" :name="`${item.slotName}`" />
          <el-upload
            v-if="item.type === 'upload'"
            class="upload-demo"
            :action="item.url"
            :before-upload="item.beforeUpload"
            :on-remove="item.handleRemove"
            multiple
            :limit="3"
            :file-list="item.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'baseForm',
  components: {},
  props: {
    formProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    }
  },
  methods: {},
}
</script>

<style scoped lang="less">
.base-form {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .el-form {
    .el-form-item {
      width: 300px;
    }
  }
}
</style>
