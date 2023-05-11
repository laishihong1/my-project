import Vue from 'vue'
import VueRouter from 'vue-router'
import Main  from '../views/Main.vue'
import Mail  from '../views/Mail.vue'
import Home  from '../views/Home.vue'
import User  from '../views/User.vue'
import Page1 from '../views/Page1.vue'
import Label from "../views/Label.vue"
import Login from '@/views/Login'
import maps from '@/components/echart/Label/maps'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
   path:'/Main',component: Main,redirect: '/Home',
   children: [
    {path:'/Mail' ,name:'mail' ,component: Mail },
    {path:'/Home' ,name:'home' ,component: Home },
    {path:'/User' ,name:'user' ,component: User },
    {path:'/Page1',name:'page1',component: Page1},
   
  ]
  },
  {path:'/Label',name:'label',component: Label},
  {path:'/Login',name:'login',component:Login},
  {path:'/Maps',name:'map',component:maps}
]

const router = new VueRouter({
  routes
})

export default router
