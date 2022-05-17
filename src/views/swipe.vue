<template>
  <div class="swipe">
    <h3>当按钮在轮播图外面将不会引起同步轮播</h3>
    <div v-for="i in 3" :key="i">
      <el-button @click="changePage(i)">向右</el-button>
      <van-swipe @change="getIndex" :ref="`swipe${i - 1}`">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ nowIndex }}页</div>
        </template>
      </van-swipe>
      <div class="my-indicator-group">
        <div
          class="my-indicator"
          :class="{ indicatorActive: nowIndex === 0 }"
        ></div>
        <div
          class="my-indicator"
          :class="{ indicatorActive: nowIndex === 1 }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swipe',
  components: {},
  data() {
    return {
      active: 1,
      total: 4,
      nowIndex: 0,
    }
  },
  methods: {
    getIndex(index) {
      this.nowIndex = index
      console.log('this.nowIndex :>> ', this.nowIndex)
    },
    changePage(index) {
      console.log('this.ref :>> ', this.$refs.swipe0[0])
      // this.ref
      this.$refs[`swipe${index - 1}`][0] &&
        this.$refs[`swipe${index - 1}`][0].next()
    },
  },
}
</script>
<style scoped lang="less">
.swipe {
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
}
.van-swipe {
  width: 500px;
  margin-top: 10px;
}
.el-button {
  width: 100px;
}
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 500px;
  height: 100px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 50px;
  background: rgba(0, 0, 0, 0.1);
}
.my-indicator-group {
  display: flex;
  margin-top: 10px;
  .my-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #39a9ed;
  }
}
.my-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #39a9ed;
  margin-left: 10px;
  margin-top: 10px;
}
.indicatorActive {
  background-color: red !important;
}
.custom-indicator {
  height: 10px;
  width: 10px;
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
