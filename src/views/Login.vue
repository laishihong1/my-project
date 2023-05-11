
<template>
    
    <div>
       
      <vantas></vantas>
         <body id="poster">
    <el-form class="login-container" label-position="left">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="submit">登录</el-button>
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
        methods: {
           submit(){
                  const num=Mock.Random.guid()
                  //首次登陆存入cookie
                  cookie.set('token',num)
                  this.$router.push('/home')
           }
        },
        components:{
            vantas
        }
    }
</script>

<style>
  #poster {
    
    top: 25%;
    left: 39%;
    position: absolute;
     margin: 0;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
 
 
</style>


