<template>
    <div class="reigster2">

          <keep-alive>
           <component :is="currentView"></component>
         </keep-alive>
 

        <div class="form">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="replyAccount">
                <el-input type="text" v-model="ruleForm.replyAccount" autocomplete="off" placeholder="请输入账号" minlength="8" maxlength="15" value="replyAccount"></el-input>
            </el-form-item>

             <el-form-item label="邮箱" prop="replyEmail">
                <el-input type="text" v-model="ruleForm.replyEmail" autocomplete="off" placeholder="请输入邮箱" minlength="8" maxlength="20" value="replyAccount"></el-input>
            </el-form-item>

             <el-form-item label="密码" prop="replyPassword">
                      <el-input type="password" v-model="ruleForm.replyPassword" autocomplete="off" placeholder="请输入密码" minlength="8" maxlength="15" value="replyPassword" show-password></el-input>
             </el-form-item>
           
            <el-form-item label="确认密码" prop="checkreplyPassword">
                <el-input type="password" v-model="ruleForm.checkreplyPassword" autocomplete="off" placeholder="请再次输入密码" minlength="8" maxlength="15" show-password>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>

import vantas from '@/utils/vantas'
import vantasR from '@/utils/vantasR'

    export default {
        data() {
                var reg_tel=/^(?=.*\d)(?=.*[A-Z|a-z])[a-zA-Z0-9]{8,15}$/ //密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
                 reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi; //邮箱格式验证
                var validateAccount = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入账号'));
                } else if(!reg_tel.test(value)){
                         callback(new Error('必须包含字母和数字的组合，不能使用特殊字符，长度在 8-15 之间'));
                }
                else {
                if (this.ruleForm.replyAccount !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validateReplyPassword = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } 
                 else if(!reg_tel.test(value)){
                     callback(new Error('必须包含字母和数字的组合，不能使用特殊字符，长度在 8-15 之间'));
                 }
                else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
               
              var checPassword = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.replyPassword) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                 callback();
                }
             };
               
              var validateEmail=(rule,value,callback)=>{
                   if(value===''){
                      callback(new Error('请输入你的邮箱'));
                   }
                    else if(!reg.test(value)){
                      callback(new Error('邮箱格式不正确'));
                    }
                   else{
                     callback();
                   }
              }
              
            return {
                   value1:this.$store.state.tabs.buttonSwitch,
                 ruleForm: {
                    replyAccount: '',
                    replyPassword: '',
                    replyEmail:'',
                    checkreplyPassword: ''
                    
                },
                 rules: {
                    replyAccount: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    replyPassword: [
                        { validator: validateReplyPassword, trigger: 'blur' }
                    ],
                    replyEmail:[
                        {validator: validateEmail, trigger:' blur' }
                    ],
                    checkreplyPassword: [
                        { validator: checPassword, trigger: 'blur' }
                    ]
                  }
            };
        },
        created(){
          this.$store.commit('modifyMark','none')
          this.init()
        },
           methods: {
             init(){
                var replyAccount=JSON.parse(window.localStorage.getItem('replyAccount'))
                var replyPassword=JSON.parse(window.localStorage.getItem('replyPassword'))
                if(replyAccount&&replyPassword){
                    this.ruleForm.replyAccount=replyAccount
                    this.ruleForm.replyPassword=replyPassword
                    this.ruleForm.checkreplyPassword=replyPassword
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            var replyAccount=JSON.parse(window.localStorage.getItem('replyAccount'))
                            var replyPassword=JSON.parse(window.localStorage.getItem('replyPassword'))
                            var replyEmail=JSON.parse(window.localStorage.getItem('replyEmail'))

                            if(!replyAccount&&!replyPassword&&replyEmail){
                                window.localStorage.setItem('replyAccount',JSON.stringify(this.ruleForm.replyAccount))
                                window.localStorage.setItem('replyPassword',JSON.stringify(this.ruleForm.replyPassword))
                                window.localStorage.setItem('replyEmail',JSON.stringify(this.ruleForm.replyEmail))
                                  this.$store.commit('modifyMark','inline-block')
                                 this.$message.success('请点击下一步继续注册')
                            }else{

                                localStorage.clear()

                                window.localStorage.setItem('replyAccount',JSON.stringify(this.ruleForm.replyAccount))
                                window.localStorage.setItem('replyPassword',JSON.stringify(this.ruleForm.replyPassword))
                                window.localStorage.setItem('replyEmail',JSON.stringify(this.ruleForm.replyEmail))
                                
                                this.$store.commit('modifyMark','inline-block')
                                this.$message.success('请点击下一步继续注册')
                            }
                            

                        } else {
                            return false;
                        }
                        });
                    },
                    resetForm(formName) {
                        this.$refs[formName].resetFields();
                    },
                  
           },
            computed:{
            currentView:function () {
                      if(this.value1===true){
                         return "vantas"
                      }else{
                          return "vantasR"
                      }
                }
        },
        components:{
            vantasR,
            vantas
        }
  }
    
</script>

<style lang="less" scoped>
     .reigster2{
        position: relative;
        
           .form{
               position: relative;
                height: 16.1rem;
                  .el-form{
                    position: relative;
                    width: 25%;
                    height: 25%;
                    left: 50%;
                    transform: translate(-50%,80%);
                }
                .el-form-item {
                    margin-bottom: 1.2rem;
                    margin-left: 0;
                    .el-form-item__content{
                        margin-left: 0;
                    }
                }
           }
     }
    
    
   
</style>