<template>
  <div class="home">
    <div style="margin-top: 100px">
      <input
        type="text"
        style="margin-top: 50px"
        @blur="showa = false"
        @focus="showa = true"
      />
      <div class="aaa" :class="showa === false ? 'no-showa' : ''">display</div>
    </div>
    <div>
      <input
        type="text"
        style="margin-top: 50px"
        @blur="showb = false"
        @focus="showb = true"
      />
      <div class="bbb" v-if="showb === true">v-if</div>
    </div>
    <div>
      <input
        type="text"
        style="margin-top: 50px"
        @blur="showd = false"
        @focus="showd = true"
      />
      <div class="bbb" v-show="showd === true">v-show</div>
    </div>
    <div ref="showcdiv">
      <input
        type="text"
        style="margin-top: 50px"
        @blur="showcFun(1)"
        @focus="showcFun(2)"
      />
      <!-- <div class="ccc" ref="showc">js操作</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {
      showa: true,
      showb: true,
      showd: true,
    }
  },
  methods: {
    showcFun(index) {
      if (index === 1) {
        console.log('this.$refs.showc :>> ', this.$refs.showc)
        let node = document.getElementsByClassName('ccc')[0]
        this.$refs.showcdiv.removeChild(node)
      } else {
        console.log('this.$refs.showc222 :>> ', this.$refs.showc)
        let node = document.createElement('div')
        console.log('node.style :>> ', node.style)
        node.style.height = '50px'
        node.style.width = '500px'
        node.style.background = '#ed6482'
        node.ref = 'showc'
        node.className = 'ccc'
        console.log('node :>> ', node.ref, node.className)
        this.$refs.showcdiv.appendChild(node)
      }
    },
  },
}
</script>
<style scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.aaa,
.bbb,
.ccc {
  height: 50px;
  width: 500px;
  overflow: auto;
}
.aaa:focus,
.bbb:focus,
.ccc:focus {
  border-color: rgb(56, 201, 68);
  background: red !important;
}
.no-showa {
  display: none;
}
.aaa {
  background-color: #6495ed;
}
.bbb {
  background-color: #ccc232;
}
.ccc {
  background-color: #ed6482;
}
</style>
