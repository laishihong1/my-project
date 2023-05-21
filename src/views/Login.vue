
<template>
    
    <div class="Login">
       
      <vantas></vantas>

         <body class="poster">
    <el-form class="login-container" label-position="left">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <!-- :user_name="this.loginForm.user_name" 父组件向子组件传值 -->
        <el-input type="text" v-model="loginForm.username"  auto-complete="off" placeholder="账号"></el-input>
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
  </body>
    </div>
</template>
<script>
import vantas from '@/utils/vantas'
import Mock from 'mockjs'
import cookie from 'js-cookie'

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                    
                },
                 rules:{
                     username:[
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
        },
        methods: {
           submit(){
                  
               if(this.loginForm.username===''){
                   this.$message.error('账号为空');

                }else if(this.loginForm.password===''){
                  this.$message.error('密码为空');
                }
                 else{
                 
                   var param={
                     Account:this.loginForm.username,
                     Password:this.loginForm.password
                   }
                      
                        this.$axios.post("http://localhost:8080/simpleUser/login",param).then(res=>{
                     
                            if(res.data.flag){
                                const num=Mock.Random.guid()
                                  //首次登陆存入cookie
                                  cookie.set('token',num)
                                  this.$router.push('/home')
                                  //储存数据到localStorage

                                  window.localStorage.setItem('param',JSON.stringify(this.loginForm))
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
           }
        },
        beforeUnmount() {
           document.removeEventListener('keyup', this.enter)
        },
        components:{
            vantas
        }
    }
</script>

<style lang="less" scoped>

     .Login{
         position: relative;
      
        // width: 100wh;
         height: 100vh;
           #vantas{
             width: 100%;
             height: 100%;
            
           }
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
            box-shadow: 0 0 .3125rem #cac6c6;
          }
            .login_title {
              margin: 0px auto .5rem auto;
              text-align: center;
              color: #505458;
              font-size: .37rem;
           }
        }  
         }
         
     
</style>


