<template>
    <div>
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="replyAccount">
                <el-input type="text" v-model="ruleForm.accountpass" autocomplete="off" placeholder="请输入账号" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="replyPassword">
                <el-input type="password" v-model="ruleForm.checkpassword" autocomplete="off" placeholder="请输入密码" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkreplyPassword">
                <el-input type="password" v-model="ruleForm.checkpasswordagain" autocomplete="off" placeholder="请再次输入密码" maxlength="11"></el-input>
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
                var reg_tel=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/ //密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
                var validateAccount = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入账号'));
                } else if(!reg_tel.test(value)){
                         callback(new Error('必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间'));
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
                     callback(new Error('必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间'));
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
            return {
                 ruleForm: {
                    replyAccount: '',
                    replyPassword: '',
                    checkreplyPassword: ''
                },
                 rules: {
                    replyAccount: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    replyPassword: [
                        { validator: validateReplyPassword, trigger: 'blur' }
                    ],
                    checkreplyPassword: [
                        { validator: checPassword, trigger: 'blur' }
                    ]
                  }
            };
        },
           methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                               window.localStorage.setItem('replyAccount',JSON.stringify(this.replyAccount))
                               window.localStorage.setItem('replyPassword',JSON.stringify(this.replyPassword))
                               this.$store.commit('modifyMark',2)
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
        transform: translate(-50%,60%);
     }
     .el-form-item {
        margin-bottom: 1.2rem;
     }
</style>