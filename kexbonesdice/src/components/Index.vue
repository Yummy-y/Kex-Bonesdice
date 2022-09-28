<template>
  <el-container>
    <el-header>
    </el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
import Dice from './dice/diceA.vue'
export default {
  components: { Dice },
};
</script>

<style scoped lang="less">
.el-main {
  height:100vh;
}
</style>