import Vue from 'vue'
import VueRouter from 'vue-router'
//cookie插件，用于读取token
import Cookies from 'js-cookie';
import Main  from '../views/Main.vue'
import Mail  from '../views/Mail.vue'
import Home  from '../views/Home.vue'
import User  from '../views/User.vue'
import Page1 from '../views/Page1.vue'
import userMessage from '../components/userMessage/userIntroduce.vue'
import userRevise from '@/components/userMessage/userRevise'

import Label from "../views/Label.vue"
import Login from '@/views/Login'
import register from '@/views/register.vue'





import maps from '@/components/echart/Label/maps'
import mainLoading from '@/components/animations/MainLoading'
import component from "@/components/animations/componentLoading"



Vue.use(VueRouter)



const router = new VueRouter({
  mode: "history",
  routes: [
    {path:'/',redirect:'/Login'},
    {path:'/Login',name:'login',component:Login},
    {path:'/register',name:'register',component:register},
    
    {
     path:'/Main',component: Main,redirect: '/Home',
      children: [
        {path:'/Mail' ,name:'mail' ,component: Mail },
        {path:'/Home' ,name:'home' ,component: Home },
        {path:'/User' ,name:'user' ,component: User },
        {path:'/Page1',name:'page1',component: Page1,redirect:'/userMessage',
          children:[
               {path:'/userMessage',name:'userMessage',component:userMessage},
               {path:'/revise',name:'revise',component:userRevise}
          ]
        },
        {path:'/Label',name:'label',component: Label},
      ]
    },
  
    {path:'/Maps',name:'map',component:maps},
    {path:'/animation',component:mainLoading},
    {path:'/animation1',component:component}
    
  ]
})

//创建全局前置守护导航
 router.beforeEach((to, from, next) => {

    const token = Cookies.get('token')
  var loginData = JSON.parse(window.localStorage.getItem('param'))
     if(to.name==='register'){
        next()
     }
       else if(!token&&to.name!=='login'&&!loginData){
        next({name:'login'})
        if(token&&to.name==='login'&&loginData){
          //如果当前token存在，跳转到主页面
          next({name:'home'})
        }
     }
      else if(token&&to.name==='login'){
        next({name:'home'})
      } 
      else{
        next()
      }
 })

 //push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}



export default router
