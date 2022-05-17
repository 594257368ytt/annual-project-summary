<template>
  <div class="form">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
  </div>
</template>

<script>
export default {
  name: 'triangle',
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang="less">
.form {
  height: 100%;
  width: 100%;
  display: flex;
  .div1 {
    margin-top: 50px;
    margin-left: 100px;
    width: 30px;
    height: 30px;
    background-color: rgb(187, 23, 53);
    border-top: 100px solid rgb(209, 122, 82);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgb(112, 155, 144);
    border-right: 100px solid rgb(123, 148, 177);
  }
  .div2 {
    margin-top: 50px;
    margin-left: 100px;
    width: 0px;
    height: 0px;
    background-color: rgb(187, 23, 53);
    border-top: 100px solid rgb(209, 122, 82);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgb(112, 155, 144);
    border-right: 100px solid rgb(123, 148, 177);
  }
  .div3 {
    margin-top: 50px;
    margin-left: 100px;
    width: 0px;
    height: 0px;
    border-top: 100px solid rgba(0, 0, 0, 0);
    border-bottom: 100px solid rgb(223, 208, 79);
    border-left: 100px solid rgba(0, 0, 0, 0);
    border-right: 100px solid rgba(0, 0, 0, 0);
  }
}
</style>
