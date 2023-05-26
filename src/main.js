import Vue from 'vue'
import App from './App.vue'

//ElementUI插件，用于板块设计
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router/index.js'
import store from './store'
import axios from "axios";


axios.defaults.headers.post['Content-Type']='user'
axios.defaults.headers.get['Content-Type']='user'


//datav插件，用于可视化平台ui设计
import dataV from '@jiaminghi/data-view'

//mock插件，用于随机模拟数据，模拟axios的一系列请求方法
import "./mock/index"
import "./mock/replyData"
import "./mock/mockDayData"
import "./mock/lineTable1"
import "./mock/equipment"
import "./mock/login"
import "./mock/user"
import "./mock/UserNumber"
import "./mock/comManage"
//echart组件

import echarts from '@/utils/echart';
Vue.prototype.$echarts = echarts


// 导入腾讯地图，获取用户当前位置
import { VueJsonp } from 'vue-jsonp';
Vue.prototype.$jsonp = VueJsonp
Vue.use(VueJsonp)

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(dataV)


import {borderBox5,borderBox6,borderBox9,borderBox10,borderBox11,borderBox12,borderBox13} from '@jiaminghi/data-view'
Vue.use(borderBox5,borderBox6,borderBox9,borderBox10,borderBox11,borderBox12,borderBox13)

//引用flexible
import 'lib-flexible/flexible.js'
 
axios.defaults.headers.post['Content-Type']='application/json'

new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
