<template>
  <div
    class="welcomeContainer"
    :style="{ backgroundImage: 'url(' + welcomeBgImg + ')' }"
  >
    <!-- 背景音乐 -->
    <audio
      controls
      src="../../assets/music/采风乐坊 - 曙光～Dawn～.mp3"
      ref="audio"
      loop
      hidden
    ></audio>
    <audio controls src="../../assets/music/击剑.mp3" ref="test" hidden></audio>
    <div class="settings">
      <div class="settingItem" @click="playMusic">
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
      <div class="settingItem" @click="rulesDialogVisible = true">
        <el-tooltip
          class="item"
          effect="dark"
          content="江湖规矩"
          placement="bottom"
        >
          <i class="el-icon-document"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="title"><h1>逍 遥 骰</h1></div>
    <div class="words"><span>拂 去 尘 烟 , 一 念 逍 遥 。</span></div>
    <div class="menu">
      <div class="menuItem"><router-link to="/pvp">龙争虎斗</router-link></div>
      <div class="menuItem"><router-link to="/pve">投石拔距</router-link></div>
      <div class="menuItem">
        <router-link to="/test">人外有人</router-link>
      </div>
    </div>
    <!-- 游戏规则对话框 -->
    <el-dialog
      title="江湖规矩"
      :visible.sync="rulesDialogVisible"
      width="50%"
      class="rulesDialog"
    >
      <span>你说的对，但是《逍遥骰》是由饿鬼队自主研发的一款基于vue框架和pyhton后端的全新策略随机骰子对战小游戏。游戏发生在一个被称作「逍遥境」的武侠幻想世界，在这里，被召选的人将被授予「明心之炁」，修炼真我之道。你将扮演一位名为「修行者」的侠客，在自由的修行中邂逅性格迥异、功法独特的侠士们，和他们一起云游四海，拂去尘烟，一念逍遥，至由太极而无极境界——同时，逐步发掘「逍遥道」的真相。</span>
      <span slot="footer" class="dialog-footer">
        <div class="rulesBoxBtn" @click="rulesDialogVisible = false">
          吾已知晓
        </div>
      </span>
    </el-dialog>
    <!-- 开启音乐提示框 -->
    <transition-group name="lyric">
      <div class="tips" v-if="musicTips" :key="1">
        <div class="icon"><i class="el-icon-service"></i></div>
        <div><p>建议大侠开启音乐游玩</p></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicTips: true,
      //控制音乐播放
      musicFlag: false,
      //背景
      welcomeBgImg: this.$store.state.welcomeBgImg,
      //游戏规则对话框
      rulesDialogVisible: false,
    };
  },
  created() {
    //因为created在模板渲染成html前调用，故设置计时器让dom元素加载完再获取dom元素
    // setTimeout(() => {
    //     this.playMusic()
    //   });
    setTimeout(() => {
      this.musicTips = false; //自动关闭提示框
    }, 1200);
    //this.welcomeBgImg = this.$store.state.welcomeBgImg;
  },
  methods: {
    test() {
      this.$refs.test.play();
      setTimeout(() => {
        this.$router.push({ path: "/pvp" });
        //this.$refs.audio.pause(); //停止
      }, 900);
    },
    playMusic() {
      this.musicFlag = !this.musicFlag;
      this.$refs.audio.volume=0.6;
      if (this.musicFlag == true) this.$refs.audio.play();
      //播放
      else this.$refs.audio.pause();
      // this.$refs.audio.currentTime = 0; //从头开始播放
    },
    changeBgImge() {
      var num = this.methods.rand(1, 7);
      var str = "welcomeBgImg_" + num + ".jpg";
      this.$store.commit("changeWelcomeBgImg", str);
    },
  },
  watch: {
    "$store.state.welcomeBgImg"() {
      this.welcomeBgImg = this.$store.state.welcomeBgImg;
    },
  },
};
</script>

<style lang="less" scoped>
.welcomeContainer {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //background-image: url("../../assets/img/welcomeBgImg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  }
  .rulesDialog {
    font-family: STKaiti;
    //background-image: url("../../assets/img/rules.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .rulesBoxBtn {
    height: 40px;
    width: 80px;
    text-align: center;
    line-height: 40px;
    font-family: LiSu;
    font-size: 15px;
    bottom: 18px;
    right: 38px;
    background-image: url("../../assets/img/menuBgImg.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    cursor: pointer;
  }
  .rulesBoxBtn:hover {
    transform: scale(1.1, 1.1);
    transition: 0.5s;
  }
  .tips {
    width: 400px;
    height: 150px;
    position: absolute;
    top: 200px;
    transform: translate(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0px 0px 15px black;
    z-index: 500;
    font-size: 25px;
    color: rgb(231, 225, 225);
    font-family: STKaiti;
    .icon {
      font-size: 35px;
      font-weight: bold;
    }
  }

  .lyric-enter,
  .lyric-leave-to {
    opacity: 0;
    //transform: translateY(20px);
  }
  .lyric-enter-to,
  .lyric-leave {
    opacity: 1;
  }
  .lyric-enter-active,
  .lyric-leave-active {
    transition: all 0.6s;
  }
}
</style>