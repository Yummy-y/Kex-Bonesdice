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
    <audio
      controls
      src="../../assets/music/击剑二.mp3"
      ref="music"
      hidden
    ></audio>
    <!-- 背景音乐 -->
    <audio
      controls
      src="../../assets/music/采风乐坊 - 蓄势 ~GEAR UP~.mp3"
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
    <div class="playerADice">
      <dice-a></dice-a>
    </div>
    <div class="playerBDice">
      <dice-b></dice-b>
    </div>
    <!-- <el-button @click="test">test</el-button> -->
    <div
      class="gameArea"
      :style="{ backgroundImage: 'url(' + gameBgImg + ')' }"
    >
      <!-- A计分板 -->
      <div class="calculateA">
        <div>{{ scoreak }}</div>
        <div>{{ scoreae }}</div>
        <div>{{ scoreax }}</div>
      </div>
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
      <!-- B计分板 -->
      <div class="calculateB">
        <div>{{ scorebk }}</div>
        <div>{{ scorebe }}</div>
        <div>{{ scorebx }}</div>
      </div>
      <div class="playerBArea">
        <div class="rowK Brow" v-show="updata">
          <div
            v-for="(item, index) in BImg.K"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowE Brow" v-show="updata">
          <div
            v-for="(item, index) in BImg.E"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
        <div class="rowX Brow" v-show="updata">
          <div
            v-for="(item, index) in BImg.X"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="playerA"
      :style="{
        border: lenA + 'px' + ' ' + 'solid rgba(255,255,0,' + opacityA + ')',
      }"
    >
      <div class="headA">
        <img src="../../assets/headImg/hA.jpeg" alt="" />
      </div>
    </div>
    <div
      class="playerB"
      :style="{
        border: lenB + 'px' + ' ' + 'solid rgba(255,0,0,' + opacityB + ')',
      }"
    >
      <div class="headB">
        <img src="..//../assets/headImg/hB.jpeg" alt="" />
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
    <div @click="startGame" class="startGameBtn" v-if="!gameing">开始对战</div>
    <div @click="stopGame" class="startGameBtn" v-if="gameing">结束对战</div>
    <!-- <el-button @click="test">666</el-button> -->
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
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        E: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        X: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
      },
      BImg: {
        K: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        E: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        X: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
      },
      //控制操作流程的对象
      control: {},
      //用于页面点数和分数显示的对象
      randa: null,
      randb: null,

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
      //游戏进行与否 控制游戏开始和重新开始按钮的显示
      gameing: false,
      //控制呼吸灯动画变量
      lenA: 2,
      lenB: 2,
      opacityA: 1,
      opacityB: 1,
      //每一行的分数显示
      score: {
        scoreAK: 0,
        scoreAE: 0,
        scoreAX: 0,
        scoreBK: 0,
        scoreBE: 0,
        scoreBX: 0,
      },
      //AIRow
      AIRow: null,
    };
  },
  created() {},
  methods: {
    //游戏开始与结束方法
    startGame() {
      this.$store.commit("updataIsAShake", true);
      this.gameing = true;
      this.wordsImg = require("../../assets/wordsImg/拔剑.png");
      this.showWords();
    },
    stopGame() {
      this.$message("游戏结束中~");
      const that = this;
      setTimeout(function () {
        that.gameing = false;
        that.$store.commit("updataIsAShake", false);
        that.$store.commit("updataIsBShake", false);
        that.$store.commit("updataIsChangeARow", false);
        that.$store.commit("updataIsChangeBRow", false);
        that.reset();
        that.$message.success("游戏结束!");
      }, 3000);
    },
    //重置页面数据
    reset() {
      this.playerAData = [[], [], []];
      this.playerBData = [[], [], []];
      this.AImg = {
        K: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        E: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        X: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
      };
      this.BImg = {
        K: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        E: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
        X: [
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
          require("../../assets/diceImg/base.png"),
        ],
      };
      this.updata = false;
      this.updata = true;
    },
    //test
    test() {
      console.log(this.AIRow);
      this.getBChangeRow().then((ret) => {
        console.log(ret);
      });
    },
    //音效与动画
    pushShow(sudoku, row) {
      for (let i = sudoku[row].length; i > 0; i--) {
        //let flag=false;
        if (sudoku[row][sudoku[row].length - 1] == sudoku[row][i - 2]) {
          this.pushNum++;
        }
      }
      if (this.pushNum == 1) {
        this.wordsImg = require("../../assets/wordsImg/来也.png");
        this.showWords();
      } else if (this.pushNum == 2) {
        this.wordsImg = require("../../assets/wordsImg/无双.png");
        this.showWords();
      } else this.playDiceMusic();
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
    },
    playDiceMusic() {
      this.$refs.music.currentTime = 0; //从头开始播放
      this.$refs.music.play(); //播放
    },
    playBgm() {
      this.musicFlag = !this.musicFlag;
      this.$refs.bgm.volume = 0.2;
      if (this.musicFlag == true) this.$refs.bgm.play();
      //播放
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
          //console.log(changeRow + " " + i + " " + playerData[0][i]);
          if (playerData[0][i] != null) {
            var num = playerData[0][i];
            var str = "dice_" + num + ".png";
            imgData.K[i] = require("../../assets/gameDiceImg/" + str);
          } else imgData.K[i] = require("../../assets/diceImg/base.png");
        }
      } else if (changeRow == "E") {
        for (let i = 0; i < 3; i++) {
          if (playerData[1][i] != null) {
            var num = playerData[1][i];
            var str = "dice_" + num + ".png";
            imgData.E[i] = require("../../assets/gameDiceImg/" + str);
          } else imgData.E[i] = require("../../assets/diceImg/base.png");
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (playerData[2][i] != null) {
            var num = playerData[2][i];
            var str = "dice_" + num + ".png";
            imgData.X[i] = require("../../assets/gameDiceImg/" + str);
          } else imgData.X[i] = require("../../assets/diceImg/base.png");
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
    //api
    async getBChangeRow() {
      const { data: res } = await this.$axios({
        method: "post",
        url: "/hhh",
        data: {
          dataA: this.playerBData,
          dataB: this.playerAData,
          point: this.randb,
        },
        header: {
          "Content-Type": "application/json", //如果写成contentType会报错
        },
      });
      // if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      //console.log(res);
      //console.log(typeof res.next_step);
      this.AIRow = res.next_step;
      return res.next_step;
    },
  },
  mounted() {},
  //计算属性统计得分
  computed: {
    scoreak: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreAK
      this.score.scoreAK = 0;
      for (let i = 0; i < this.playerAData[0].length; i++) {
        array[this.playerAData[0][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreAK += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreAK);
    },
    scoreae: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreAK
      this.score.scoreAE = 0;
      for (let i = 0; i < this.playerAData[1].length; i++) {
        array[this.playerAData[1][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreAE += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreAE);
    },
    scoreax: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreAK
      this.score.scoreAX = 0;
      for (let i = 0; i < this.playerAData[2].length; i++) {
        array[this.playerAData[2][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreAX += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreAX);
    },
    scorebk: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreAK
      this.score.scoreBK = 0;
      for (let i = 0; i < this.playerBData[0].length; i++) {
        array[this.playerBData[0][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreBK += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreBK);
    },
    scorebe: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreAK
      this.score.scoreBE = 0;
      for (let i = 0; i < this.playerBData[1].length; i++) {
        array[this.playerBData[1][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreBE += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreBE);
    },
    scorebx: function () {
      var array = [0, 0, 0, 0, 0, 0, 0];
      //scoreBX
      this.score.scoreBX = 0;
      for (let i = 0; i < this.playerBData[2].length; i++) {
        array[this.playerBData[2][i]]++;
      }
      for (let i = 1; i < array.length; i++) {
        this.score.scoreBX += Math.pow(array[i], 2) * i;
      }
      return this.methods.intToChinese(this.score.scoreBX);
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
          this.calculate(this.playerAData);
          console.log(
            this.playerAData[0].length,
            this.playerAData[1].length,
            this.playerAData[2].length
          );
          let scoreA = this.calculate(this.playerAData);
          let scoreB = this.calculate(this.playerBData);
          if (scoreA > scoreB)
            this.$message.success("A:" + scoreA + "B:" + scoreB + " A win !");
          else if (scoreA < scoreB)
            this.$message.success("A:" + scoreA + "B:" + scoreB + " B win !");
          else this.$message.success("A:" + scoreA + "B:" + scoreB + " 平局！");
          //游戏结束 功能禁用
          this.$store.commit("updataIsAShake", false);
          this.$store.commit("updataIsBShake", false);
          this.$store.commit("updataIsChangeARow", false);
          this.$store.commit("updataIsChangeBRow", false);
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
          this.calculate(this.playerBData);
          // console.log(
          //   this.playerBData[0].length,
          //   this.playerBData[1].length,
          //   this.playerBData[2].length
          // );
          let scoreA = this.calculate(this.playerAData);
          let scoreB = this.calculate(this.playerBData);
          if (scoreA > scoreB)
            this.$message.success("A:" + scoreA + "B:" + scoreB + " A win !");
          else if (scoreA < scoreB)
            this.$message.success("A:" + scoreA + "B:" + scoreB + " B win !");
          else this.$message.success("A:" + scoreA + "B:" + scoreB + " 平局！");
          //游戏结束 功能禁用
          this.$store.commit("updataIsAShake", false);
          this.$store.commit("updataIsBShake", false);
          this.$store.commit("updataIsChangeARow", false);
          this.$store.commit("updataIsChangeBRow", false);
        }
      },
      deep: true,
    },
    "$store.state.gameBgImg"() {
      this.gameBgImg = this.$store.state.gameBgImg;
    },
    "$store.state.isChangeARow"() {
      let interval = setInterval(() => {
        if (this.$store.state.isChangeARow == true) {
          this.opacityA -= 0.01; //透明度减0.01
          this.lenA += 0.1;
          if (this.lenA >= 5) {
            this.opacityA = 1;
            this.lenA = 0;
          }
        } else {
          clearInterval(interval);
        }
      }, 12);
    },
    "$store.state.isChangeBRow"() {
      let interval = setInterval(() => {
        if (this.$store.state.isChangeBRow == true) {
          this.opacityB -= 0.01; //透明度减0.01
          this.lenB += 0.1;
          if (this.lenB >= 5) {
            this.opacityB = 1;
            this.lenB = 0;
          }
        } else {
          clearInterval(interval);
        }
      }, 12);
      if (this.$store.state.isChangeBRow == true) {
        if (typeof this.getBChangeRow() == Number) this.getBChangeRow();
        else this.pushBK();

        setTimeout(() => {
          if (this.AIRow == 1) {
            this.pushBK();
            console.log("pushk");
          } else if (this.AIRow == 2) {
            this.pushBE();
            console.log("pushe");
          } else if (this.AIRow == 3) {
            this.pushBX();
            console.log("pushx");
          } else console.log("row is " + this.AIRow);
        }, 1000);
      }
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
    //background-color: pink;
    div {
      height: 90px;
      width: 90px;
      border-radius: 15px;
      //background-color: #fff;
      background-image: url("../../assets/img/pvpBgImg.jpg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: 3px 3px 8px rgb(237, 233, 233);
    }
  }
  .Arow {
    flex-direction: row-reverse;
    cursor: pointer;
  }
  .Arow:hover div {
    box-shadow: 5px 5px 12px rgb(102, 101, 101);
    transform: scale(1.05, 1.05);
    transition: 0.4s;
  }
  .Brow {
    cursor: pointer;
  }
  .Brow:hover div {
    box-shadow: 5px 5px 12px rgb(102, 101, 101);
    transform: scale(1.05, 1.05);
    transition: 0.4s;
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    height: 450px;
    width: 900px;
    background-color: #fff;
    margin: 0 auto;
    //2022/10/5写到这里
    //background-image: url("../../assets/img/welcomeBgImg_4.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 40px 0 40px 0;
    box-shadow: 6px 6px 25px white;
    .playerAArea,
    .playerBArea {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 400px;
      width: 400px;
      border-radius: 40px 0 40px 0;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 0px 8px white;
    }
  }
  .calculateA,
  .calculateB {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    height: 430px;
    font-family: LiSu;
    color: white;
    font-size: 30px;
  }
  .calculateA {
    left: -115px;
  }
  .calculateB {
    right: -115px;
  }
  .calculateA > div,
  .calculateB > div {
    height: 50px;
    width: 110px;
    //background-color: #fff;
    text-align: center;
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
.playerA,
.playerB {
  position: absolute;
  display: flex;
  height: 120px;
  width: 120px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-sizing: border-box;
}
.playerA {
  left: 20px;
  bottom: 150px;
  .headA {
    height: 100px;
    width: 100px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    opacity: 1;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.playerB {
  right: 20px;
  top: 150px;
  .headB {
    height: 100px;
    width: 100px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    opacity: 1;
    img {
      height: 100%;
      width: 100%;
    }
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
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.startGameBtn {
  position: absolute;
  top: 40px;
  width: 120px;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  background-image: url("../../assets/img/menuBgImg.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  font-family: LiSu;
  cursor: pointer;
}
.startGameBtn:hover {
  transform: scale(1.1, 1.1);
  transition: 0.5s;
}
</style>