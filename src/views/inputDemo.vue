<template>
  <div class="form">
    <el-input
      placeholder="请输入内容"
      v-model="input"
      clearable
      @blur="onClick"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'inputDemo',
  components: {},
  data() {
    return {
      input: '',
    }
  },
  methods: {
    onClick() {
      console.log('111 :>> ', 111)
      debugger
    },
  },
}
</script>
<style scoped lang="less">
.form {
  height: 100%;
  width: 100%;
}
</style>
