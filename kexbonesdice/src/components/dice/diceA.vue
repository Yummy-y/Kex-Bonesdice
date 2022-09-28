<template>
  <div class="diceContainer">
    <div class="diceBox">
      <img :src="diceImg" class="dice" alt="" />
    </div>
    <div class="command">
      <input type="button" @click="shake()" value="摇一摇" />
      <!-- <input type="button" @click="test" name="" id="" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onPlay: true,
      diceImg: require("../../assets/diceImg/default.png"),
    };
  },

  methods: {
    test() {},
    shake() {
      if (this.$store.state.isAShake) {
        //判断开关的状态，若为true，执行下边的内容
         this.$store.commit("updataIsAShake", false); //开始执行后，关闭开关require("../../assetsdiceImg/spin.gif")
        this.diceImg = require("../../assets/diceImg/spin.gif"); //将静态图替换为动图
        //vue中require它是打包工具所需要的标识，你搞成运行时通过变量去定义的话，它就没办法打包了啊
        var num = this.methods.rand(1, 6);
        this.$store.commit("updataRandA", num);
        var str = "dice_" + num + ".gif";
        // vue中在 setTimeout() 方法中如果用到 this ，必须在函数外定义一个变量来暂存 this
        const that = this;
        //随机时间后，将动态图替换为随机点数的图片
        setTimeout(function () {
          //this.diceImg = require('../../assets/diceImg/dice_3.gif');
          that.diceImg = require("../../assets/diceImg/" + str);
          console.log(num);
          //骰子动画结束后显示点数 打开开关
          setTimeout(function () {
            //alert(num);
            that.$store.commit("updataIsChangeARow", true); //执行完毕后，再打开开关
          }, 1500);
        }, this.methods.rand(200, 1500));
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.diceContainer {
  width: 100px;
  //height: 150px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0);
}
.diceBox {
  padding: 10px;
  width: 100px;
  height: 100px;
  border: orange solid 1px;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
  }
}

.dice {
  width: 100px;
  height: 100px;
}

.command {
  margin: auto;
  width: 100px;
}

.command input {
  width: 100px;
  height: 30px;
  border: #ccc solid 1px;
  border-radius: 8px;
}
</style>