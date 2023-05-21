<template>
    <div class="header-container" >
        <div class="l-header">  
            <el-button style="margin-right:20px" @click="clicktab"  :class="`el-icon-s-${this.$store.state.tabs.icon}`" size="mini" ></el-button>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item    v-for="item in tags" :key="item.path" :to="{ path: item.path}">{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        <div class="r-header">
            <el-dropdown>
  <span class="el-dropdown-link">
      <el-avatar :src=this.src class="user"> user </el-avatar>
  </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="clickquit">退出</el-dropdown-item>
      
    </el-dropdown-menu>
    </el-dropdown>

        </div>

    </div>
</template>

<script>
 import{mapState}from 'vuex'
 import cookie from 'js-cookie'
    export default {
         data() {
            return {
               src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            };
         },
        methods: {
             clicktab() {
             this.$store.commit('CollapseMenu')
            },
             clickquit(){
              
                 window.localStorage.removeItem('param')
                 window.sessionStorage.clear()
		      	this.$router.push('/Login')

                 cookie.remove('token',{path:''})
            
                 this.$message.success('您已退出....')
             }
        },
        computed:{
            ...mapState({
                tags: state=> state.tabs.tabList
            })
        },
    }
</script>

<style lang="less" scoped>
   .header-container{
     padding:0 20px ;
     height: 60px;
     background-color: #333;
     display: flex;
     justify-content: space-between;
     align-items: center;
     .text{
         margin-left: 10px;
         font-size: 14px;
         color:#fff;
     }
     .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
     }
     .l-header{
        display: flex;
        align-items: center;
          // /deep/ 样式穿刺
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner{
                 font-weight: normal;
                &.is-link {
                    color: #666666;
                }
            }
             &:last-child{
                   .el-breadcrumb__inner{
                       color: #fff;
                   }
             }
        }
    }
}
   .tex {
     color: #fff;
   }
</style>