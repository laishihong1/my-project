<template>
    <div>
      <el-container>
        <el-header height="2rem">
            <div class="header_img" style="position: relative;">
              <img :src="this.src" alt="">
            </div>
          <div class="per_introduce">
                <p>用户名:&nbsp;&nbsp;{{this.dataForm.userMessage.userName}}</p>
                <div style="display:flex">
                    <div style="flex:6;height:100%;">
                       <p style="height:50%; line-height:150%;" >用户身份:&nbsp;&nbsp;{{this.dataForm.mark>1?(this.dataForm.mark>2? '管理员':'会员用户'):'普通用户'}}</p>
                       <p style="height:50%; line-height:150%;">个性签名:&nbsp;&nbsp;{{this.dataForm.userMessage.userSignature==='无'?'':this.dataForm.userMessage.userSignature}}</p>
                    </div>
                    <div style="flex:4;height:100%;">
                      <ul class="ul_message">
                        <li>登陆总时长:</li>
                        <li>好友数量:0</li>
                        <li>关注量:0</li>
                      </ul>
                    </div>
                </div>
                <div style="position: relative;">
                  <el-button type="primary" @click="userRevise">修改</el-button>
                </div>
          </div>
        </el-header>
        <el-container>
            <el-aside width="3.7rem">
               <user-navigation></user-navigation>
            </el-aside>
            <el-main>
               <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import userNavigation from '@/components/userMessage/userNavigation'
    export default {
         data() {
           
          return {
              src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
              timer:null, //定时器名称
                item:{
                    path:'/userMessage',
                    name:'userMessage',
                    icon:'s-custom',
                    label:'用户信息',
                    url:'userMessage/userMessage' //用户信息
                },
                dataForm:{

                }
          };
         },
         created(){
                
                this.timer = setInterval(() => {
                    localStorage.removeItem('res')
                    setTimeout(this.init(), 0)
                }, 1000*60) //十分钟刷新

                this.init()
               this.$store.commit("selectMenu",this.item)
           
         },
         methods:{
          init(){
                var data=JSON.parse(window.localStorage.getItem('res'));
                if(data){
                    this.dataForm=data
                }else{
                   var param={
                      userAccount:JSON.parse(window.localStorage.getItem('param')).account,
                      userPassword:JSON.parse(window.localStorage.getItem('param')).password,
                  }

                   this.$axios.post("http://localhost:8080/simpleUser/userMessage",param).then(res=>{
                           
                            window.localStorage.setItem('res',JSON.stringify(res.data.data))
                            this.dataForm=res.data.data
                         

                   }).catch(error=>{
                         this.$message.error('服务器出错')
                   })
                }
          },
          userRevise(){
             
           
          },
          Traversal(array,item){
               for (const i in array) {
                   if(array[i].name===item){
                    return false
                   }
               }
               return true
          }
    },
      beforeDestroy(){
          clearInterval(this.timer);        
          this.timer = null;   //清除定时器
      },
      components:{
            userNavigation
         }
}
</script>

<style lang="less" scoped>

   .el-header {
    padding: 0;
   background-color: transparent;
    color: #333;
    text-align: center;

    box-shadow: 0px 10px 10px rgba(0, 0, 0,.3);
    margin-bottom: .30rem;
    display: flex;
    .header_img{
      flex: 1.5;
      width: 20%;
      position: relative;
       img{
         width:  2rem;
         height: 2rem;
         left: 1.2rem;
         position: absolute;
       }
    }
    .per_introduce{
      flex: 10;
      width: 80%;
     
       p{
         height:28%;
         line-height: 250%;
         font-size: .25rem;
         font-weight: 700;
         text-align: left;
         font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
         
       }
       p:nth-child(2){
         color: #D3DCE6;
       }
       div{
         height:36%;
       //  background-color:#ccc;
         position: relative;
         .ul_message{
             display: flex;
             padding: 0;
             li{
               position: relative;
                top: -8px;
                list-style: none;
                width: 30%;
                margin-right: 4%;
                text-align: left;
                font-size: .36rem;
                border-right: 1px solid #D3DCE6;
                color: #D3DCE6;
             }
             li:nth-child(3){
              border: 0;
             }
         }
         .el-button{
             position: absolute;
             left:-0.1rem;
             background-color:rgba(64, 158, 255,.2);
             border:0;
             color:rgb(64, 158, 255)
         }
       }
    }
  }
  
    .el-aside {
      
    background-size: 100% 100%;
    color: #333;
    text-align: center;
    margin: 15px 10px 0px 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0,.7);
    height: 71vh;
    border-radius: 10px;
  }
 
  .el-main {
   // background-color: #E9EEF3;
    color: #333;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0,.4);
    height: 71vh;
    margin-right: 10px;
    border-radius: 10px;
    margin-top: 15px;
  }
</style>