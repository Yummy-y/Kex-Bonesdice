import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入element-ui
import './plugins/element.js'
// 全局样式表
import "./assets/css/base.css"
//公用方法
import methods from './utils/methods'
Vue.prototype.methods=methods;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
