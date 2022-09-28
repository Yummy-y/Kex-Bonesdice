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

  },
  actions: {
  },
  modules: {
  }
})
