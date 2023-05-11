<template>
    <div >
     
 <el-menu default-active="1-4-1"
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            
 >
 <h3>{{!isCollapse?'通讯录管理系统':'管理'}}</h3> 
          <el-menu-item @click="clickHome(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
    <span slot="title">{{item.label}}</span>
          </el-menu-item>

          <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
    <template slot="title">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </template>
    <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
      <el-menu-item @click="clickHome(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
    </el-menu-item-group>
   
          </el-submenu>
 
</el-menu>
    </div>
</template>


 <style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse){
      width: 200px;
      min-height: 400px;
    }
    .el-menu {
      height: 100vh;

      border: 0;
    h3{
      color: #fff;
    }
    }
 </style>

<script>

export default {
    data() {
      return {
        methodData: [
           {
            path:'/Home',
            name:'home',
            label:'首页',
            icon:'s-home',
            url:'Home/Home'
           },
           {
            path:'/Mail',
            name:'mail',
            label:'用户管理',
            icon:'video-play',
            url:'MailManage/MailManage'
           }, 
           {
            path:'/User',
            name:'user',
            label:'申诉管理',
            icon:'user',
            url:'UserManage/UserManage'
           },
            {
            path:'/Label',
            name:'label',
            label:'可视化管理',
            icon:'s-data',
            url:'LabelManage/LabelManage'
           },
           {
            label:'其它',
            icon:'location',
            children:[
              {
                path:'/Page1',
                name:'page1',
                label:'页面1',
                icon:'setting',
                url:'Other/PageOne'
              }
            ]
           }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //指定路由跳转路径
      clickHome(item){
        if(this.$route.path!==item.path&&(this.$route!=='Home'&&(this.$route!=='Main'))){
           this.$router.push(item.path)
        }
        this.$store.commit('selectMenu',item)
      }
    },
    computed:{
       noChildren(){
             return this.methodData.filter(item=> !item.children)
       },
       hasChildren(){
             return this.methodData.filter(item=> item.children)
       },
       isCollapse(){
             return this.$store.state.tabs.isCollapse
       }
       
    }
  }

</script>

