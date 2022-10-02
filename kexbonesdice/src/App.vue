<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  // 父向子组件传值 比较简单 子组件准备props就OK
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
