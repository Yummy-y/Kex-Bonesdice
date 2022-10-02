<template>
  <div
    class="gameContainer"
    :style="{ backgroundImage: 'url(' + gameBgImg + ')' }"
  >
  <!-- 音效 -->
    <audio
      controls
      src="../../assets/music/击剑.mp3"
      ref="audio"
      hidden
    ></audio>
    <!-- 背景音乐 -->
    <audio
      controls
      src="../../assets/music/击剑.mp3"
      ref="bgm"
      hidden
      loop
    ></audio>
    <div class="settings">
      <div class="settingItem" @click="playBgm">
        <el-tooltip
          class="item"
          effect="dark"
          content="奏曲/停奏"
          placement="bottom"
        >
          <i class="el-icon-service"></i>
        </el-tooltip>
      </div>
      <div class="settingItem" @click="changeBgImge">
        <el-tooltip
          class="item"
          effect="dark"
          content="改头换面"
          placement="bottom"
        >
          <i class="el-icon-picture"></i>
        </el-tooltip>
      </div>
      <div class="settingItem">
        <el-tooltip
          class="item"
          effect="dark"
          content="返回主页"
          placement="bottom"
        >
          <router-link to="/welcome"
            ><i class="el-icon-d-arrow-left"></i
          ></router-link>
        </el-tooltip>
      </div>
    </div>
    <!-- <el-button @click="test">test</el-button>
    <el-button @click="tests">test</el-button> -->
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

    <transition-group name="lyric">
      <div class="tips" v-if="wordsShow" :key="1">
        <div
          class="wordsCon"
          :style="{ backgroundImage: 'url(' + wordsImg + ')' }"
        ></div>
      </div>
    </transition-group>

    <!-- <el-button @click="showWords" class="btn">点击</el-button> -->
    <el-button @click="test" class="btn">点击</el-button>
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
      playerAData: [[], [], []],
      playerBData: [[], [], []],
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
      //ifarray：补充表示行的变量0K1E2X
      changeRow: "",
      isOver: false,
      //用于通过v-show实现v-for数据更新的变量
      updata: true,
      //字动画
      wordsShow: false,
      //消除个数
      removeNum: 0,
      //重复点数
      pushNum: 0,
      //动画图片
      wordsImg: null,
      //背景
      gameBgImg: this.$store.state.gameBgImg,
      //控制音乐播放
      musicFlag: false,
    };
  },
  created() {},
  methods: {
    test() {
      // this.ToImg(this.playerAData, this.AImg, this.changeRow);
      // console.log("randa : " + this.$store.state.randA);
      // console.log("randb : " + this.$store.state.randB);
      this.pushShow(this.playerAData, 0);
      this.pushShow(this.pushNum);
    },
    tests() {
      console.log(this.playerAData);
      console.log(this.playerBData);
      console.log(this.$store.state.isChangeARow);
      //this.ToImg(this.playerAData,this.AImg)
    },
    //音效与动画
    pushShow(sudoku, row) {
      for (let i = sudoku[row].length; i > 0; i--) {
        //let flag=false;
        if (sudoku[row][sudoku[row].length - 1] == sudoku[row][i - 2]) {
          this.pushNum++;
        }
        //console.log("num=" + num);
      }
      if (this.pushNum == 1) {
        this.wordsImg = require("../../assets/wordsImg/来也.png");
        this.showWords();
        //console.log("来也" + num);
      } else if (this.pushNum == 2) {
        this.wordsImg = require("../../assets/wordsImg/无双.png");
        this.showWords();
        //console.log("无双" + num);
      }
      this.pushNum = 0;
    },
    removeshow() {
      if (this.removeNum == 1) {
        this.wordsImg = require("../../assets/wordsImg/接招.png");
        this.showWords();
      } else if (this.removeNum == 2) {
        this.wordsImg = require("../../assets/wordsImg/断.png");
        this.showWords();
      } else if (this.removeNum == 3) {
        this.wordsImg = require("../../assets/wordsImg/看破.png");
        this.showWords();
      }
      this.removeNum = 0;
    },
    playWordsMusic() {
      this.$refs.audio.currentTime = 0; //从头开始播放
      this.$refs.audio.play(); //播放
      // setTimeout(() => {
      //   this.$refs.audio.pause(); //停止
      // }, 80000);
    },
    playBgm() {
      this.musicFlag=!this.musicFlag
      if(this.musicFlag==true)
      this.$refs.bgm.play(); //播放
      else this.$refs.bgm.pause();
    },
    showWords() {
      this.wordsShow = true;
      this.playWordsMusic();
      setTimeout(() => {
        this.wordsShow = false; //停止
      }, 650);
    },
    //切换背景图
    changeBgImge() {
      var num = this.methods.rand(1, 7);
      var str = "welcomeBgImg_" + num + ".jpg";
      this.$store.commit("changeGameBgImg", str);
    },
    //点数转换为图片
    //ifarray：K0 E1 X2
    ToImg(playerData, imgData, changeRow) {
      this.updata = false;
      if (changeRow == "K") {
        for (let i = 0; i < 3; i++) {
          console.log(changeRow + " " + i + " " + playerData[0][i]);
          if (playerData[0][i] != null) {
            var num = playerData[0][i];
            var str = "dice_" + num + ".gif";
            imgData.K[i] = require("../../assets/diceImg/" + str);
          } else imgData.K[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      } else if (changeRow == "E") {
        for (let i = 0; i < 3; i++) {
          if (playerData[1][i] != null) {
            var num = playerData[1][i];
            var str = "dice_" + num + ".gif";
            imgData.E[i] = require("../../assets/diceImg/" + str);
          } else imgData.E[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (playerData[2][i] != null) {
            var num = playerData[2][i];
            var str = "dice_" + num + ".gif";
            imgData.X[i] = require("../../assets/diceImg/" + str);
          } else imgData.X[i] = require("../../assets/diceImg/pikachu.jpeg");
        }
      }

      this.updata = true;
    },

    //方法！
    //Arow
    //ifarray：K0 E1 X2
    pushAK() {
      if (this.$store.state.isChangeARow && this.playerAData[0].length < 3) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData[0].push(this.randa);
        this.changeRow = "K";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.pushShow(this.playerAData, 0);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    pushAE() {
      if (this.$store.state.isChangeARow && this.playerAData[1].length < 3) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData[1].push(this.randa);
        this.changeRow = "E";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.pushShow(this.playerAData, 1);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    pushAX() {
      if (this.$store.state.isChangeARow && this.playerAData[2].length < 3) {
        this.$store.commit("updataIsBShake", true);
        this.randa = this.$store.state.randA;
        this.playerAData[2].push(this.randa);
        this.changeRow = "X";
        this.ToImg(this.playerAData, this.AImg, this.changeRow);
        this.pushShow(this.playerAData, 2);
        this.removeB();
        this.$store.commit("updataIsChangeARow", false);
      }
    },
    //Brow
    pushBK() {
      if (this.$store.state.isChangeBRow && this.playerBData[0].length < 3) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData[0].push(this.randb);
        this.changeRow = "K";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.pushShow(this.playerBData, 0);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    pushBE() {
      if (this.$store.state.isChangeBRow && this.playerBData[1].length < 3) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData[1].push(this.randb);
        this.changeRow = "E";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.pushShow(this.playerBData, 1);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    pushBX() {
      if (this.$store.state.isChangeBRow && this.playerBData[2].length < 3) {
        this.$store.commit("updataIsAShake", true);
        this.randb = this.$store.state.randB;
        this.playerBData[2].push(this.randb);
        this.changeRow = "X";
        this.ToImg(this.playerBData, this.BImg, this.changeRow);
        this.pushShow(this.playerBData, 2);
        this.removeA();
        this.$store.commit("updataIsChangeBRow", false);
      }
    },
    //消除
    //ifarray：K得到row 定义rownum 用ifelse来给rownum赋值
    removeA() {
      var rowstr = this.changeRow;
      var row;
      if (rowstr == "K") row = 0;
      else if (rowstr == "E") row = 1;
      else row = 2;
      //console.log('A ' + row + ' first is ' + this.playerAData[row][0])
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
          this.removeNum++;
        }
      }
      //再次强行除bug 在十四宫格里依旧出现同样bug
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
          this.removeNum++;
        }
      }
      this.ToImg(this.playerAData, this.AImg, this.changeRow);
      this.removeshow();
    },
    removeB() {
      var rowstr = this.changeRow;
      var row;
      if (rowstr == "K") row = 0;
      else if (rowstr == "E") row = 1;
      else row = 2;
      for (let i = 0; i < this.playerBData[row].length; i++) {
        if (this.playerBData[row][i] == this.randa) {
          var removed = this.playerBData[row].splice(i, 1);
          //this.$message("remove the " + removed + "!");
          console.log("remove the " + removed + "!");
          this.removeNum++;
        }
      }
      //再次强行除bug 在十四宫格里依旧出现同样bug
      for (let i = 0; i < this.playerBData[row].length; i++) {
        if (this.playerBData[row][i] == this.randa) {
          var removed = this.playerBData[row].splice(i, 1);
          console.log("remove the " + removed + "!");
          this.removeNum++;
        }
      }
      this.ToImg(this.playerBData, this.BImg, this.changeRow);
      this.removeshow();
    },
    //结算
    //ifarray：K0 E1 X2
    calculate(sudoku) {
      var array = [0, 0, 0, 0, 0, 0, 0];
      var sum = 0;
      //K
      for (let i = 0; i < sudoku[0].length; i++) {
        array[sudoku[0][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array = [0, 0, 0, 0, 0, 0, 0];
      //E
      for (let i = 0; i < sudoku[1].length; i++) {
        array[sudoku[1][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array = [0, 0, 0, 0, 0, 0, 0];
      //X
      for (let i = 0; i < sudoku[2].length; i++) {
        array[sudoku[2][i]]++;
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
    //ifarray：K0 E1 X2
    playerAData: {
      handler(newval, oldval) {
        //console.log(this.playerAData[0].length);
        if (
          this.playerAData[0].length == 3 &&
          this.playerAData[1].length == 3 &&
          this.playerAData[2].length == 3
        ) {
          this.isOver = true;
          this.$message.success("游戏结束！");
          this.calculate(this.playerAData);
          console.log(
            this.playerAData[0].length,
            this.playerAData[1].length,
            this.playerAData[2].length
          );
        }
      },
      deep: true,
    },
    playerBData: {
      handler() {
        if (
          this.playerBData[0].length == 3 &&
          this.playerBData[1].length == 3 &&
          this.playerBData[2].length == 3
        ) {
          this.isOver = true;
          this.$message.success("游戏结束！");
          this.calculate(this.playerBData);
          console.log(
            this.playerBData[0].length,
            this.playerBData[1].length,
            this.playerBData[2].length
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
    "$store.state.gameBgImg"() {
      this.gameBgImg = this.$store.state.gameBgImg;
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
.settings {
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 20px;
  color: white;
  .settingItem {
    padding: 5px;
    cursor: pointer;
  }
  a {
    color: white;
  }
}

//
.lyric-enter,
.lyric-leave-to {
  opacity: 0;
  //transform: translateY(30px);
  transform: scale(2, 2);
}
.lyric-enter-to,
.lyric-leave {
  opacity: 1;
}
.lyric-enter-active,
.lyric-leave-active {
  transition: all 0.2s;
}
.tips {
  //display: flex;
  position: absolute;
  //right: 600px;
  top: 40%;
  left: 40%;
  //transform: translate(-50%,-50%);元素设置了transform属性动画中的transform就不生效了
  justify-content: center;
  align-items: center;
  z-index: 3000;
  .wordsCon {
    height: 150px;
    width: 320px;
    //background-image: url("../../assets/wordsImg/拔剑.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.btn {
  position: absolute;
  top: 200px;
}
</style>