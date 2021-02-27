import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


import Request from '@/common/luch-request/index.js'
const http = new Request();
Vue.prototype.$http = http;


import store from './store' // 引入vuex
Vue.prototype.$store = store;


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
