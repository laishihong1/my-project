<template>
    <div>
    <el-menu
      default-active="用户信息"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
  
          <el-menu-item  @click="clickHome(item)" v-for="item in noChildren" :key="item.label" :index="item.label">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                 methodData:[
                {
                  path:'/userMessage',
                  name:'userMessage',
                  icon:'s-custom',
                  label:'用户信息',
                  url:'userMessage/userMessage' //用户信息
                },
                {
                    path:'/revise',
                    name:'revise',
                    label:'信息修改',
                    icon:"s-tools",
                    url:'revise/revise'    //用户信息修改
                }
              ]
            };
        },
 
        methods:{
                   handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },

   

              //指定路由跳转路径
            clickHome(item){
              if(this.$route.path!==item.path&&(this.$route!=='userMessage'&&(this.$route!=='Page1'))){
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
            }
         },
}
    
</script>

<style lang="less" scoped>
.el-menu{
      height: 71vh;
      width: 100%;
      border: 0;
      background-size: 100% 100%;
      .el-menu-item{
        border-bottom: 1px solid rgb(211, 220, 230) ;
      }
}
</style>