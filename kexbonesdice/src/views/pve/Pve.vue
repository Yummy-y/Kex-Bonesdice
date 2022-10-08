<template>
  <div>
    <audio controls src="../../assets/music/击剑.mp3" ref="audio"></audio>
    <h1>pve页面暂时作为测试页面</h1>
    <div class="game">{{ playerAData }}</div>
    <div class="game">{{ playerBData }}</div>
    <br />
    <div>
      <el-button type="primary" @click="randA">get A rand</el-button>
      {{ randa }}
      <br /><br />
      <el-button type="primary" @click="pushAK">push A K</el-button>
      <el-button type="primary" @click="pushAE">push A E</el-button>
      <el-button type="primary" @click="pushAX">push A X</el-button>
    </div>
    <br />
    <div>
      <el-button type="primary" @click="randB">get B rand</el-button>
      {{ randb }}
      <br /><br />
      <el-button type="primary" @click="pushBK">push B K</el-button>
      <el-button type="primary" @click="pushBE">push B E</el-button>
      <el-button type="primary" @click="pushBX">push B X</el-button>
      <el-button type="primary" @click="test">test</el-button>
    </div>

    <transition-group name="lyric">
      <div class="tips" v-show="wordsShow" :key="1">
        <div
          class="wordsCon"
          :style="{ backgroundImage: 'url(' + wordsImg + ')' }"
        ></div>
      </div>
    </transition-group>

    <el-button @click="showWords" class="btn">点击</el-button>

    <!-- 呼吸效果 -->
    <div class="root" :style="{ opacity ,height:brht+'px',width:brht+'px'}">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      //临时变量
      arrayofArray: [
        //K行
        [1, 2, 3],
        //E行
        [1, 3, 4],
        //X行
        [6, 6, 6],
      ],
      testobject: {
        A: { a: "zsy" },
        B: { b: "ym" },
        C: { c: "hiahia" },
        U: [],
      },
      wordsImg: null,
      wordsShow: false,
      randa: null,
      randb: null,
      isOver: false,
      //检索行 K E X string
      changeRow: "",
      //呼吸灯
      opacity: 1,
      brht: 120
    };
  },
  created() {},
  methods: {
    //呼吸灯
    change() {
      setInterval(() => {
        this.opacity -= 0.01; //透明度减0.01
        this.brht +=0.05;
        if (this.opacity <= 0.1 ) {this.opacity = 1,this.brht = 120}; //当透明度为0就重新设为1
      }, 10);
    },
    pushShow(sudoku) {
      let num = 0;
      for (let i = sudoku.K.length; i > 0; i--) {
        //let flag=false;
        if (sudoku.K[sudoku.K.length - 1] == sudoku.K[i - 2]) {
          num++;
        }
        //console.log("num=" + num);
      }
      if (num == 1) {
        this.wordsImg = require("../../assets/wordsImg/来也.png");
        this.showWords();
        console.log("来也" + num);
      } else if (num == 2) {
        this.wordsImg = require("../../assets/wordsImg/无双.png");
        this.showWords();
        console.log("无双" + num);
      }
    },
    playMusic() {
      this.$refs.audio.currentTime = 0; //从头开始播放
      this.$refs.audio.play(); //播放
      setTimeout(() => {
        this.$refs.audio.pause(); //停止
      }, 80000);
    },
    showWords() {
      this.wordsShow = true;
      this.playMusic();
      setTimeout(() => {
        this.wordsShow = false; //停止
      }, 650);
    },
    test() {
      //console.log(typeof this.calculate(this.playerBData));
      // this.calculate(this.playerBData);
    },
    //A九宫格 补充骰子和九宫格的禁用和满格判断（其实也算禁用
    randA() {
      this.randa = this.methods.rand(1, 6);
    },
    pushAK() {
      this.playerAData.K.push(this.randa);
      this.changeRow = "K";
      // if (this.playerAData.K.toString() === [6, 6, 6].toString())
      //   this.showWords();
      this.pushShow(this.playerAData);
      this.removeB();
    },
    pushAE() {
      this.playerAData.E.push(this.randa);
      this.changeRow = "E";
      this.removeB();
    },
    pushAX() {
      this.playerAData.X.push(this.randa);
      this.changeRow = "X";
      this.removeB();
    },
    //B九宫格
    randB() {
      this.randb = this.methods.rand(1, 6);
    },
    pushBK() {
      this.playerBData.K.push(this.randb);
      this.changeRow = "K";
      this.removeA();
    },
    pushBE() {
      this.playerBData.E.push(this.randb);
      this.changeRow = "E";
      this.removeA();
    },
    pushBX() {
      this.playerBData.X.push(this.randb);
      this.changeRow = "X";
      this.removeA();
    },
    //消除
    removeA() {
      var row = this.changeRow;
      var num = 0; //统计消除数量 播放动画
      //console.log('A ' + row + ' first is ' + this.playerAData[row][0])
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          //console.log("remove!",this.playerAData[row][i])
          //this.$message("remove the " + removed + "!");
          num++;
          console.log("num++");

          console.log("remove the " + removed + "!");
        }
      }
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          //console.log("remove!",this.playerAData[row][i])
          //this.$message("remove the " + removed + "!");
          console.log("remove the " + removed + "!");
          num++;
          console.log("num++");
        }
      }
      //强行除bug 可能有更好的算法但是我暂时没想到
      // if (this.playerAData[row][0] == this.randb) {
      //   var removedagain = this.playerAData[row].splice(0, 1);
      //   //console.log("remove!",this.playerAData[row][i])
      //   //this.$message("remove the " + removed + "!");
      //   console.log("remove the " + removedagain + "!");
      // }
      if (num == 1) {
        this.wordsImg = require("../../assets/wordsImg/接招.png");
        this.showWords();
      } else if (num == 2) {
        this.wordsImg = require("../../assets/wordsImg/断.png");
        this.showWords();
      } else if (num == 3) {
        this.wordsImg = require("../../assets/wordsImg/看破.png");
        this.showWords();
      }
      num = 0;
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
      for (let i = 0; i < this.playerBData[row].length; i++) {
        if (this.playerBData[row][i] == this.randa) {
          var removed = this.playerBData[row].splice(i, 1);
          //this.$message("remove the " + removed + "!");
          console.log("remove the " + removed + "!");
        }
      }
      //强行除bug 可能有更好的算法但是我暂时没想到
      // if (this.playerBData[row][0] == this.randa) {
      //   var removedagain = this.playerBData[row].splice(0, 1);
      //   //this.$message("remove the " + removedagain + "!");
      //   console.log("remove the " + removedagain + "!");
      // }
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
  mounted() {
    this.change();
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

<style scoped lang="less">
.game {
  font-size: 20px;
}
.xxx {
  font-size: 45px;
  font-family: 楷体;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
}
.lyric-enter,
.lyric-leave-to {
  opacity: 0;
  //transform: translateY(30px);
  transform: scale(3, 3);
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
  display: flex;
  justify-content: center;
  align-items: center;
  .wordsCon {
    height: 150px;
    width: 320px;
    // background-image: url("../../assets/wordsImg/无双.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.btn {
  position: absolute;
  top: 600px;
}
.root {
  //background-color: rgb(35, 190, 221);
  border-radius: 50%;
  border:3px solid yellow;

}
</style>