<template>
  <div class="gameContainer">
    <el-button @click="test">test</el-button>
    <div class="playerADice">
      <dice></dice>
    </div>
    <div class="playerBDice">
      <dice></dice>
    </div>
    <div class="gameArea">
      <div class="playerAArea">
        <div class="rowK Arow">
          <div :style="{'backgroundImage': 'url(' + diceImg + ')'}" ref="test" >1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div class="rowE Arow">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="rowX Arow">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="playerBArea">
        <div class="rowK Brow">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div class="rowE Brow">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="rowX Brow">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from "../../components/dice/dice.vue";
export default {
  components: { Dice },
  data() {
    return {
      playerAData: {
        K: [1, 2, 3],
        E: [],
        X: [],
      },
      playerBData: {
        K: [],
        E: [],
        X: [],
      },
      diceImg:'',
    };
  },
  created() {},
  methods: {
    test() {
      console.log(this.playerAData.K)
      console.log(this.$refs.test)
      this.diceImg=require('../../assets/img/pvpBgImg.jpg');
    },
  },
};
</script>

<style lang="less" scoped>
.gameContainer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/img/pvpBgImg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .playerADice,
  .playerBDice {
    display: flex;
    position: absolute;
    //width: 200px;
  }
  .rowK,
  .rowE,
  .rowX {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    width: 350px;
    background-color: pink;
    div {
      height: 110px;
      width: 110px;
      //background-color: #fff;
      background-image: url("../../assets/img/pvpBgImg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
    }
  }
  .Arow {
    flex-direction: row-reverse;
  }
  .Brow {
    //flex-direction: row-reverse;
  }
  .playerADice {
    bottom: 15px;
    left: 15px;
  }
  .playerBDice {
    top: 15px;
    right: 15px;
  }
  .gameArea {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    height: 450px;
    width: 900px;
    background-color: #fff;
    margin: 0 auto;
    .playerAArea,
    .playerBArea {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 400px;
      width: 400px;
      background-color: rgb(234, 215, 215);
    }
  }
}
.test {
  background-image: url("../../assets/img/pvpBgImg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>