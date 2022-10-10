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

//导入 axios 使我们可以发起axios请求
import axios from 'axios'
//axios.defaults.headers['Content-Type']= 'application/json'
Vue.prototype.$axios = axios
axios.withCredentials = true
// 配置请求的跟路径 由后端提供 这样我们只要输入根路径后面的地址就OK （例如/login /home
axios.defaults.baseURL = 'http://127.0.0.1:5000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
