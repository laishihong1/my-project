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
        <el-dropdown-item @click.native="userMessage">个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="clickquit">退出</el-dropdown-item>
      
    </el-dropdown-menu>
    </el-dropdown>

        </div>

    </div>
</template>

<script>
 import{mapState}from 'vuex'
 import cookie from 'js-cookie'
var moment = require('moment-timezone');
var tz = 'Asia/Choibalsan'  //时区

    export default {
         data() {
            return {
               src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
               param:{
                userTotalTime:'',
                userAccount:'',
                userPassword:'',
                userLocation:''
               },
               item:{
                  path:'/userMessage',
                  name:'userMessage',
                  icon:'s-custom',
                  label:'用户信息',
                  url:'userMessage/userMessage' //用户信息
               }
            };
         },
        methods: {
             clicktab() {
             this.$store.commit('CollapseMenu')
            },
            userMessage(){
            //    if(this.item.name!=='userMessage'){
            //      this.$router.replace('/page1')
            //     this.$store.commit('selectMenu',this.item)
            //    }else{
            //      setTimeout(()=>{
            //         this.$message.warning('你已处于当前位置')
            //      },500)
            //    }
            },
             clickquit(){
                 
                //计算时间差，发送数据到后端   
                 var loginOut=moment.utc(new Date().getTime()).tz(tz).format('YYYY-MM-DD HH:mm:ss')

               
                 //计算时间
                this.param.userTotalTime= this.getDate(loginOut,JSON.parse(window.localStorage.getItem("loginTime")))
                this.param.userAccount=JSON.parse(window.localStorage.getItem("param")).account
                this.param.userPassword=JSON.parse(window.localStorage.getItem("param")).password 
                this.param.userLocation=JSON.parse(window.localStorage.getItem("userLocation"))
                 console.log(this.param)


                 this.$axios.post("http://localhost:8080/simpleUser/loginOut",this.param).then(res=>{
                      if(res.data.flag){
                        // 移除所有
                        localStorage.clear();
                        window.sessionStorage.clear()
                        cookie.remove('token',{path:''})
                        this.$router.push('/Login')
                        this.$message.success('您已退出....')
                      }else{
                        this.$message.error('操作异常')
                      }
                   }).catch(error=>{
                       this.$message.error('服务器异常')
                  })

                   //移除所有
                //  localStorage.clear();
                //  window.sessionStorage.clear()
		    	
                //  cookie.remove('token',{path:''})
                //  this.$router.push('/Login')
                //  this.$message.success('您已退出....')
             },
              getDate:function(endTime,startTime){

                var new_date = new Date(endTime.replace(/-/g, "/")).getTime(); 
                console.log(new_date)
	            var old_date = new Date(startTime.replace(/-/g, "/")).getTime(); 
                console.log(old_date)
                var difftime = (new_date - old_date); //计算时间差,并把毫秒转换成秒
	            

                //计算出小时数
                var leave1 = difftime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数

                var hours = (Math.floor(leave1 / (3600 * 1000)))<10? "0"+(Math.floor(leave1 / (3600 * 1000))):Math.floor(leave1 / (3600 * 1000));
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                var minutes = (Math.floor(leave2 / (60 * 1000)))<10? "0"+(Math.floor(leave2 / (60 * 1000))):Math.floor(leave2 / (60 * 1000));

                //计算相差秒数
                var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                var seconds = (Math.round(leave3 / 1000))<10?"0"+(Math.round(leave3 / 1000)):Math.round(leave3 / 1000);

               
                
                return hours+":"+minutes+":"+seconds;
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
     box-shadow: 0px 1px 4px rgba(0, 0, 0,.3);
     margin-bottom: 1px;
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