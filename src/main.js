import Vue from 'vue'
import App from './App.vue'

//ElementUI插件，用于板块设计
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from "axios";

//datav插件，用于可视化平台ui设计
import dataV from '@jiaminghi/data-view'

//mock插件，用于随机模拟数据，模拟axios的一系列请求方法
import "./mock/index"
import "./mock/replyData"
import "./mock/mockDayData"
import "./mock/lineTable1"
//echart组件

import echarts from '@/utils/echart';
Vue.prototype.$echarts = echarts

//cookie插件，用于读取token
import Cookies from 'js-cookie';
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(dataV)
Vue.prototype.$axios = axios;

import {borderBox5,borderBox6,borderBox9,borderBox10,borderBox11,borderBox12,borderBox13} from '@jiaminghi/data-view'
Vue.use(borderBox5,borderBox6,borderBox9,borderBox10,borderBox11,borderBox12,borderBox13)

//引用flexible
import 'lib-flexible/flexible.js'

//创建全局前置守护导航
router.beforeEach((to, from, next) => {
   
   const token = Cookies.get('token')
   ////判断token是否存在 ,不存在直接跳转到登陆页面
   if(!token&&to.name!=='login'){
          next({name:'login'})
   }else if(token&&to.name==='login'){
     //如果当前token存在，跳转到主页面
     next({name:'home'})
   }else{
    next()
   }
})
new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
