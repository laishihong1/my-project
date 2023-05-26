<template>
    <div class='register1'>

        <keep-alive>
           <component :is="currentView"></component>
         </keep-alive>
        
    
           <!-- <div><vantas-r></vantas-r></div> -->
           <div class='form'>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                    <el-form-item label="手机号" prop="numberPhone">
                        <el-input type="text" v-model="ruleForm.numberPhone" autocomplete="off" placeholder="请输入你的手机号" minlength="11" maxlength="11"></el-input>
                    </el-form-item>
                
                <el-form-item label="确认手机号" prop="checknumberPhone">
                        <el-input type="text" v-model="ruleForm.checknumberPhone" autocomplete="off" placeholder="请再次输入你的手机号" minlength="11" maxlength="11"></el-input>
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
 
              var reg_tel = new RegExp("^1[356789]\\d{9}$");  //手机号码验证

               var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入手机号'));
                }else if(!reg_tel.test(value)){
                     callback(new Error('输入的手机号格式不对'));
                }
                 else {
                    if (this.ruleForm.numberPhone !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                     callback();
                }
            };
               var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入手机号'));
                }
                 else if(!reg_tel.test(value)){
                     callback(new Error('输入的手机号格式不对'));
                }
                else if (value !== this.ruleForm.numberPhone) {
                callback(new Error('两次输入不一致!'));
                } else {
                callback();
                }
            };
           
            return{
                    value1:this.$store.state.tabs.buttonSwitch,
            ruleForm: {     //表单验证
                    numberPhone: '',
                    checknumberPhone: '',
                    }, 
                rules: {  //触发条件
                    numberPhone: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checknumberPhone: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                  
                }       
         }
        },
        created(){
             this.init()
        },
        methods: {
            init(){
                var numberPhone=JSON.parse(window.localStorage.getItem('numberPhone'))
                if(numberPhone){
                    this.ruleForm.numberPhone=numberPhone
                    this.ruleForm.checknumberPhone=numberPhone
                }
            },
             changeStatus(callback){
                   console.log(callback)
                   this.$store.commit('modifySwitch',callback)
             },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                       var numberPhone=JSON.parse(window.localStorage.getItem('numberPhone'))
                       if(!numberPhone){
                        window.localStorage.setItem('numberPhone',JSON.stringify(this.ruleForm.numberPhone))
                        this.$store.commit('modifyMark','inline-block')
                        this.$message.success('请点击下一步继续注册')
                       }else if(numberPhone){
                         localStorage.removeItem('numberPhone');
                         window.localStorage.setItem('numberPhone',JSON.stringify(this.ruleForm.numberPhone))
                         this.$message.success('请点击下一步继续注册')
                         this.$store.commit('modifyMark','inline-block')
                       }
                } 
                else {
                  
                    return false;
                }
                });
            },
          
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        components:{
              vantas,
            vantasR,
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
    }
</script>

<style lang="less" scoped>
     .register1{
        position: relative;
         
       
        .form{
         
            position: relative;
             height: 16.1rem;
              .el-form{
                    position: absolute;
                    width: 25%;
                    height: 25%;
                    left: 50%;
                    transform: translate(-50%,120%);
                }
                .el-form-item {
                    margin-bottom: 1.2rem;
                    .el-form-item__content{
                        margin-left: 0;
                    }
              }
        }
     }
   
   
      
</style>