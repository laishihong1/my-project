
<template>
    
    <div class="Login">
      
         <keep-alive>
           <component :is="currentView"></component>
         </keep-alive>
          
         <div style="display:inline-block; top:0.5rem; left:0.5rem; position: absolute;">
                 <el-switch
            v-model="value"
            @change='changeStatus'
            active-text="默认背景"
            inactive-text="随机背景"
             active-color="#13ce66"
             inactive-color="#ff4949"
            style="position:relative; display:inline-block;"
            
            >
          </el-switch>
          </div>

         <!-- <vantas></vantas> -->
         <body class="poster">
         
    <el-form class="login-container" label-position="left">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <!-- :user_name="this.loginForm.user_name" 父组件向子组件传值 -->
        <el-input type="text" v-model="loginForm.account"  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
 
      <el-form-item style="  position: relative; display:flex;  justify-content: center; ">
         <el-button type="primary" style="width:100px;  background: #505458; border: none;display:inline-block;   position:  relative;" v-on:click="reset">重置</el-button>
         <el-button type="primary" style="width:100px;  background: #505458; border: none;display:inline-block;   position:  relative;" v-on:click="submit">登录</el-button>
         <el-button type="primary" style="width:100px;  background: #505458; border: none;display:inline-block;   position:  relative;" v-on:click="register">注册</el-button>
      </el-form-item>
    </el-form>
       <p>通讯录平台</p>
  </body>
    </div>
</template>


<script>
import vantas from '@/utils/vantas'
import vantasR from '@/utils/vantasR'
import Mock from 'mockjs'
import cookie from 'js-cookie'
var moment = require('moment-timezone');
var tz = 'Asia/Choibalsan'

    export default {
        name: "Login",
        data() {
            return {
                   value:this.$store.state.tabs.buttonSwitch,
                loginForm: {
                    account: '',
                    password: '',
                    nation:'',
                    province:'',
                    district:'',
                    city:''
                },
                 rules:{
                     account:[
                        {required:true,trigger:'blur',message:"请输入账号"}
                     ],
                     password:[
                        {required:true,trigger:'blur',message:"请输入账号"}
                     ]
                 },
            }
        },
        created(){
           
            document.addEventListener('keyup', this.enter)
             this.getLocalCity()
        },
        methods: {
          //切换背景和上下边的阴影
             changeStatus(callback){
                //   console.log(callback)
                   this.$store.commit('modifySwitch',callback)
                   if(callback===true){
                       var  haderShadow='0px 20px 10px rgba(255, 255, 255,.4)'
                       var footerShadow='0px -20px 10px rgba(255,255,255,0.4)'
                        this.$store.commit('modifyShadow',haderShadow,footerShadow)
                   }else if(callback===false){
                    var  haderShadow='0px 20px 10px rgba(0, 0, 0,.4)'
                    var footerShadow='0px -20px 10px rgba(0,0,0,0.4)'
                      this.$store.commit('modifyShadow',haderShadow,footerShadow)
                   }
             },

           submit(){
                  
               if(this.loginForm.username===''){
                   this.$message.error('账号为空');

                }else if(this.loginForm.password===''){
                  this.$message.error('密码为空');
                }
                 else{
                 
                   var param={
                     replyAccount:this.loginForm.account,
                     replyPassword:this.loginForm.password,
                   }
                    //  console.log(param)
                        this.$axios.post("http://localhost:8080/simpleUser/login",param).then(res=>{
                     
                            if(res.data.flag){
                                const num=Mock.Random.guid()
                                  //首次登陆存入cookie
                                  cookie.set('token',num)
                                 
                                  //储存数据到localStorage
                                    var loginDate=new Date().getTime()
                                    loginDate = moment.utc(loginDate).tz(tz).format('YYYY-MM-DD HH:mm:ss')

                                 //记录登陆时间
                                 window.localStorage.setItem('loginTime',JSON.stringify(loginDate))
                                  
                                  //记录登陆账户
                                  window.localStorage.setItem('param',JSON.stringify(this.loginForm))

                                  //记录账户位置
                                  window.localStorage.setItem('userLocation',JSON.stringify((this.loginForm.nation+"-"+this.loginForm.province+"-"+this.loginForm.city+"-"+this.loginForm.district)))
                                   this.$router.push('/home')
                                   this.$message.success('登陆成功')

                            }
                          
                            else if(!res.data.flag){
                              this.$message.error('请确认账号或密码')
                            }
                     })
                      .catch(error=>{
                        console.log(error)
                                   const num=Mock.Random.guid()
                                    //首次登陆存入cookie
                                    cookie.set('token',num)
                                    this.$router.push('/home')
                                setTimeout(()=>{
                                  this.$message.warning('登陆成功-当前服务器不在线...数据为mock数据')
                                },2000)    
                      })

                 }
           },
          
           reset(){
                this.loginForm.username='',
                this.loginForm.password=''
           },
           enter(){
                 document.addEventListener('keydown', (e) => {
                let key = window.event.keyCode;
                  if (key == 13) {
                    this.submit()
                }
              })
           },
           register(){
                  this.$router.replace('/register')//点击注册按钮，跳转至注册页面
           },
           
getLocalCity() {
      var data = {
        key: 'LJIBZ-XMRCU-SZYVU-G3NES-UWAQ6-ZKBZQ', //申请的密钥,写死就行
      }
      var url = 'https://apis.map.qq.com/ws/location/v1/ip' //这个就是地理位置信息的接口
      data.output = 'jsonp'
      this.$jsonp(url, data)
        .then((res) => {
          console.log(res)
             this.loginForm.nation=res.result.ad_info.nation
             this.loginForm.province=res.result.ad_info.province
             this.loginForm.city=res.result.ad_info.city
             this.loginForm.district=res.result.ad_info.district
        })
        .catch((error) => {
          console.log(error)
        })
    },




        },
        computed:{
            currentView:function () {
                      if(this.value===true){
                         return "vantas"
                      }else if(this.value===false){

                          return "vantasR"
                      }
                }
        },
        beforeUnmount() {
           document.removeEventListener('keyup', this.enter)
        },
        components:{
             vantas,
            vantasR,
        }
    }
</script>

<style lang="less" scoped>

     .Login{
         position: relative;
         height: 100vh;
          
            .poster{
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
            margin:  0;
            padding: 0;
           .login-container {

            border-radius: .1875rem;
            background-clip: padding-box;
            margin: 1.125rem auto;
            width: 6.375rem;
            padding: .4375rem .4375rem .1875rem .4375rem;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 .125rem .5rem #d6c6c6;
          }
            .login_title {
              margin: 0px auto .5rem auto;
              text-align: center;
              color: #505458;
              font-size: .37rem;
           }
        }  
         }
          p{
       text-align:center;
       color:#fff;
       font-size:1.25rem;
       top:70%  
    }
     
</style>


