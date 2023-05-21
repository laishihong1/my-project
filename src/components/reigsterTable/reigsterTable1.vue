<template>
    <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
        <el-form-item label="手机号" prop="numberPhone">
            <el-input type="text" v-model="ruleForm.numberPhone" autocomplete="off" placeholder="请输入你的手机号" maxlength="11"></el-input>
        </el-form-item>
       
       <el-form-item label="确认手机号" prop="checknumberPhone">
            <el-input type="text" v-model="ruleForm.checknumberPhone" autocomplete="off" placeholder="请再次输入你的手机号" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export default {
        data() {

              var reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])d{8}$/; 

               var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入手机号'));
                }else if(!reg_tel.test(value)){
                     callback(new Error('请确认你输入输入手机号'));
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
                     callback(new Error('请确认你输入输入手机号'));
                }
                else if (value !== this.ruleForm.checknumberPhone) {
                callback(new Error('两次输入不一致!'));
                } else {
                callback();
                }
            };
           
            return{
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
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                     window.localStorage.setItem('numberPhone',JSON.stringify(this.numberPhone))
                     this.$store.commit('modifyMark',1)
                } else {
                  
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
     .el-form{
        position: relative;
         width: 25%;
         height: 25%;
         left: 50%;
        transform: translate(-50%,100%);
     }
     .el-form-item {
        margin-bottom: 1.2rem;
     }
</style>