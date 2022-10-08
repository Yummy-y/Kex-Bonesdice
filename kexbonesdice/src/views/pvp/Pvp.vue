<template>
  <div class="gameContainer">
    <el-button @click="test">test</el-button>
    <el-button @click="startGame">开始游戏</el-button>
    <div class="playerADice">
      <dice-a></dice-a>
    </div>
    <div class="playerBDice">
      <dice-b></dice-b>
    </div>
    <div class="gameArea">
      <div class="playerAArea">
        <div class="rowK Arow" v-show="updata" @click="pushAK">
          <div
            v-for="(item, index) in AImg.K"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowE Arow" v-show="updata" @click="pushAE">
          <div
            v-for="(item, index) in AImg.E"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowX Arow" v-show="updata" @click="pushAX">
          <div
            v-for="(item, index) in AImg.X"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
      </div>
      <div class="playerBArea">
        <div class="rowK Brow" v-show="updata" @click="pushBK">
          <div
            v-for="(item, index) in BImg.K"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowE Brow" v-show="updata" @click="pushBE">
          <div
            v-for="(item, index) in BImg.E"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowX Brow" v-show="updata" @click="pushBX">
          <div
            v-for="(item, index) in BImg.X"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiceA from "../../components/dice/diceA.vue";
import DiceB from "../../components/dice/diceB.vue";
export default {
  components: { DiceA, DiceB },
  data() {
    return {
      //间接控制九宫格点数显示的对象 掷骰子的点数会被push到对象数组里
      //ifarray:改成[[],[],[]] 数组不支持命名索引哦
      playerAData: {
        K: [],
        E: [],
        X: [],
      },
      playerBData: {
        K: [],
        E: [],
        X: [],
      },
      //直接控制九宫格点数显示的背景图片对象 未放置点数或点数被消除显示默认图片
      AImg: {
        K: [
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
        ],
        E: [
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
        ],
        X: [
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
          require("../../assets/diceImg/pikachu.jpeg"),
        ],
      },
      BImg: {
        K: [
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
        ],
        E: [
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
        ],
        X: [
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
          require("../../assets/diceImg/godzilla.jpeg"),
        ],
      },
      //控制操作流程的对象
      control: {},
      //用于页面点数和分数显示的对象
      showData: {
        randa: null,
        randb: null,
      },
      //选择的行
      changeRow: "",
      isOver: false,
      //用于通过v-show实现v-for数据更新的变量
      updata: true,
    };
  },
  created() {},
  methods: {
    test() {
      this.ToImg(this.playerAData, this.AImg, this.changeRow);
      console.log("randa : " + this.$store.state.randA);
      console.log("randb : " + this.$store.state.randB);
    },
    startGame() {
      console.log('开始游戏');
      this.$store.commit("updataIsAShake", true);
      
    },
    //点数转换为图片
    ToImg(playerData, imgData, changeRow) {
      this.updata = false;
      if (changeRow == "K") {
        for (let i = 0; i < 3; i++) {
          console.log(changeRow + " " + i + " " + playerData.K[i]);
          if (playerData.K[i] != null) {
            var num = playerData.K[i];
            var str = "dice_" + num + ".gif";
            imgData.K[i] = require("../../assets/diceImg/" + str);
          } else imgData.K[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      } else if (changeRow == "E") {
        for (let i = 0; i < 3; i++) {
          if (playerData.E[i] != null) {
            var num = playerData.E[i];
            var str = "dice_" + num + ".gif";
            imgData.E[i] = require("../../assets/diceImg/" + str);
          } else imgData.E[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (playerData.X[i] != null) {
            var num = playerData.X[i];
            var str = "dice_" + num + ".gif";
            imgData.X[i] = require("../../assets/diceImg/" + str);
          } else imgData.X[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      }

      this.updata = true;
    },

    //方法！
    //Arow
    pushAK() {
      if (this.$store.state.isChangeARow) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData.K.push(this.randa);
        this.changeRow = "K";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    pushAE() {
      if (this.$store.state.isChangeARow) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData.E.push(this.randa);
        this.changeRow = "E";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    pushAX() {
      if (this.$store.state.isChangeARow) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData.X.push(this.randa);
        this.changeRow = "X";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    //Brow
    pushBK() {
      if (this.$store.state.isChangeBRow) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData.K.push(this.randb);
        this.changeRow = "K";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    pushBE() {
      if (this.$store.state.isChangeBRow) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData.E.push(this.randb);
        this.changeRow = "E";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    pushBX() {
      if (this.$store.state.isChangeBRow) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData.X.push(this.randb);
        this.changeRow = "X";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    //消除
    removeA() {
      var row = this.changeRow;
      //console.log('A ' + row + ' first is ' + this.playerAData[row][0])
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
        }
      }
      //再次强行除bug 在十四宫格里依旧出现同样bug
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
        }
      }
      //强行除bug 可能有更好的算法但是我暂时没想到
      // if (this.playerAData[row][0] == this.randb) {
      //   var removedagain = this.playerAData[row].splice(0, 1);
      //   console.log("remove the " + removedagain + "!");
      // }
      this.ToImg(this.playerAData, this.AImg, this.changeRow);
    },
    removeB() {
      var row = this.changeRow;
      for (let i = 0; i < this.playerBData[row].length; i++) {
        if (this.playerBData[row][i] == this.randa) {
          var removed = this.playerBData[row].splice(i, 1);
          //this.$message("remove the " + removed + "!");
          console.log("remove the " + removed + "!");
        }
      }
      //再次强行除bug 在十四宫格里依旧出现同样bug
      for (let i = 0; i < this.playerBData[row].length; i++) {
        if (this.playerBData[row][i] == this.randa) {
          var removed = this.playerBData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
        }
      }
      //强行除bug 可能有更好的算法但是我暂时没想到
      // if (this.playerBData[row][0] == this.randa) {
      //   var removedagain = this.playerBData[row].splice(0, 1);
      //   //this.$message("remove the " + removedagain + "!");
      //   console.log("remove the " + removedagain + "!");
      // }
      this.ToImg(this.playerBData, this.BImg, this.changeRow);
    },
    //结算
    calculate(sudoku) {
      var array = [0, 0, 0, 0, 0, 0, 0];
      var sum = 0;
      //K
      for (let i = 0; i < sudoku["K"].length; i++) {
        array[sudoku["K"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array = [0, 0, 0, 0, 0, 0, 0];
      //E
      for (let i = 0; i < sudoku["E"].length; i++) {
        array[sudoku["E"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array = [0, 0, 0, 0, 0, 0, 0];
      //X
      for (let i = 0; i < sudoku["X"].length; i++) {
        array[sudoku["X"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array = [0, 0, 0, 0, 0, 0, 0];
      //
      console.log(sum);
      return sum;
    },
  },
  watch: {
    playerAData: {
      handler(newval, oldval) {
        //console.log(this.playerAData.E.length);
        if (
          this.playerAData.K.length == 3 &&
          this.playerAData.E.length == 3 &&
          this.playerAData.X.length == 3
        ) {
          this.isOver = true;
          this.$message.success("游戏结束！");
          this.calculate(this.playerAData);
          console.log(
            this.playerAData.K.length,
            this.playerAData.E.length,
            this.playerAData.X.length
          );
        }
      },
      deep: true,
    },
    playerBData: {
      handler() {
        if (
          this.playerBData.K.length == 3 &&
          this.playerBData.E.length == 3 &&
          this.playerBData.X.length == 3
        ) {
          this.isOver = true;
          this.$message.success("游戏结束！");
          this.calculate(this.playerBData);
          console.log(
            this.playerBData.K.length,
            this.playerBData.E.length,
            this.playerBData.X.length
          );
        }
      },
      deep: true,
    },
    isOver: {
      handler() {
        let scoreA = this.calculate(this.playerAData);
        let scoreB = this.calculate(this.playerBData);
        if (scoreA > scoreB) alert("A:" + scoreA + "B:" + scoreB + " A win !");
        else alert("A:" + scoreA + "B:" + scoreB + " B win !");
      },
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
    cursor: pointer;
  }
  .Arow:hover {
    transform: scale(1.05, 1.05);
    transition: 0.5s;
  }
  .Brow {
    cursor: pointer;
  }
  .Brow:hover {
    transform: scale(1.05, 1.05);
    transition: 0.5s;
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