import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    randA: null,
    randB: null,
    isAShake: true,
    isBShake: false,
    isChangeARow: false,
    isChangeBRow: false,
    //主页背景图
    welcomeBgImg: require("../assets/img/welcomeBgImg_1.jpg"),
    //游戏背景图
    gameBgImg: require("../assets/img/welcomeBgImg_7.jpg"),
  },
  mutations: {
    //更新点数
    updataRandA(state, num) {
      state.randA = num
    },
    updataRandB(state, num) {
      state.randB = num
    },
    //控制骰子A的禁用
    updataIsAShake(state, flag) {
      state.isAShake = flag
    },
    //控制骰子B的禁用
    updataIsBShake(state, flag) {
      state.isBShake = flag
    },
    //控制A行选择的禁用
    updataIsChangeARow(state, flag) {
      state.isChangeARow = flag
    },
    //控制A行选择的禁用
    updataIsChangeBRow(state, flag) {
      state.isChangeBRow = flag
    },
    //切换主页背景
    changeWelcomeBgImg(state, str) {
      state.welcomeBgImg = require("../assets/img/" + str);
    },
    //切换主页背景
    changeGameBgImg(state, str) {
      state.gameBgImg = require("../assets/img/" + str);
    }

  },
  actions: {
  },
  modules: {
  }
})
