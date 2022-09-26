<template>
  <div>
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
      randa: null,
      randb: null,
      isOver: false,
      //检索行 K E X string
      changeRow: "",
    };
  },
  created() {},
  methods: {
    test() {
      console.log(typeof this.calculate(this.playerBData))
      // this.calculate(this.playerBData);
    },
    //A九宫格 补充骰子和九宫格的禁用和满格判断（其实也算禁用
    randA() {
      this.randa = this.methods.rand(1, 6);
    },
    pushAK() {
      this.playerAData.K.push(this.randa);
      this.changeRow = "K";
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
      //console.log('A ' + row + ' first is ' + this.playerAData[row][0])
      for (let i = 0; i < this.playerAData[row].length; i++) {
        if (this.playerAData[row][i] == this.randb) {
          var removed = this.playerAData[row].splice(i, 1);
          //console.log("remove!",this.playerAData[row][i])
          //this.$message("remove the " + removed + "!");
          console.log("remove the " + removed + "!");
        }
      }
      //强行除bug 可能有更好的算法但是我暂时没想到
      if (this.playerAData[row][0] == this.randb) {
        var removedagain = this.playerAData[row].splice(0, 1);
        //console.log("remove!",this.playerAData[row][i])
        //this.$message("remove the " + removed + "!");
        console.log("remove the " + removedagain + "!");
      }
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
      //强行除bug 可能有更好的算法但是我暂时没想到
      if (this.playerBData[row][0] == this.randa) {
        var removedagain = this.playerBData[row].splice(0, 1);
        //this.$message("remove the " + removedagain + "!");
        console.log("remove the " + removedagain + "!");
      }
    },
    //结算
    calculate(sudoku) {
      var array=[0,0,0,0,0,0,0]
      var sum = 0;
      //K
      for (let i = 0; i < sudoku["K"].length; i++) {
        array[sudoku["K"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array=[0,0,0,0,0,0,0]
      //E
      for (let i = 0; i < sudoku["E"].length; i++) {
        array[sudoku["E"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array=[0,0,0,0,0,0,0]
      //X
      for (let i = 0; i < sudoku["X"].length; i++) {
        array[sudoku["X"][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        sum += Math.pow(array[i], 2) * i;
      }
      array=[0,0,0,0,0,0,0]
      //
      console.log(sum);
      return sum
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

<style scoped lang="less">
.game {
  font-size: 20px;
}
</style>