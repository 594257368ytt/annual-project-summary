<template>
  <div class="form">
    <baseForm :formProps="formProps">
      <template v-slot:slotNamePar
        >具名插槽添加任意内容
        <el-button type="primary">插入按钮</el-button>
        <br />
        <i class="el-icon-edit"> 插入图标</i>
      </template>
    </baseForm>
  </div>
</template>

<script>
import baseForm from './components/baseForm.vue'

export default {
  name: 'form',
  components: { baseForm },
  data() {
    return {
      formProps: [
        {
          label: 'input框',
          type: 'input',
        },
        { label: '单选框', type: 'radio', value: ['标签1', '标签2'] },
        { label: '文字标签', type: 'text', text: '文字内容' },
        { type: 'slot', label: 'slot', slotName: 'slotNamePar' },
        {
          label: '上传文件',
          type: 'upload',
          url: 'https://jsonplaceholder.typicode.com/posts/',
          fileList: [],
          handleRemove: () => {
            console.log(1111)
          },
          beforeUpload: () => {
            console.log(2222)
          },
        },
      ],
    }
  },
  methods: {},
}
</script>
<style scoped lang="less">
.form {
  height: 100%;
  width: 100%;
}
</style>
