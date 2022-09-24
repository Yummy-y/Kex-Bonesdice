<template>
  <div class="container">
    <div class="title"><h1>逍 遥 骰</h1></div>
    <div class="words"><span>拂 去 尘 烟 , 一 念 逍 遥 。</span></div>
    <div class="menu">
      <div class="menuItem"><router-link to="/pvp">龙争虎斗</router-link></div>
      <div class="menuItem"><router-link to="/pvp">投石拔距</router-link></div>
      <div class="menuItem"><router-link to="/pvp">人外有人</router-link></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/img/welcomeBgImg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  //background-attachment: fixed;
  a:hover {
    color: rgb(0, 0, 0);
  }
  .title {
    font-size: 60px;
    color: white;
    font-family: STKaiti;
  }
  .words {
    font-weight: bold;
    color: rgb(255, 255, 255);
    margin: 40px 0;
    font-family: 楷体;
    font-size: 16px;
  }
  .menu {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: LiSu;
    //background-color: blue;
    .menuItem {
      width: 150px;
      height: 50px;
      font-size: 18px;
      line-height: 55px;
      margin: 8px 0;
      //background-color: pink;
      background-image: url("../../assets/img/menuBgImg.png");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
      image-rendering: -moz-crisp-edges;
    }
    .menuItem:hover {
      transform: scale(1.1, 1.1);
      transition: 0.5s;
    }
  }
}
</style>