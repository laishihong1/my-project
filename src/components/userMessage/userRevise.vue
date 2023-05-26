<template>
    <div>
        <p>信息修改</p>

       <el-form :model="form" label-width="150px">
      <div class="updateinfo">
  <div class="left">
      <el-form-item label="头像">
            <img style=" width:100px;height:100px;position: relative;;left: 0;" :src="this.avatar"/>
          </el-form-item>

          <el-form-item label="修改密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>

          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>

          <el-form-item label="性别">
              <el-switch
          v-model="value2"
          active-color="#13ce66"
          style="left:-24px; position: relative;"
          inactive-color="#ff4949"
          active-text="男"
          inactive-text="女">
        </el-switch>
          </el-form-item>
       
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          
  </div>
  <div class="right">
     
          <el-form-item label="居住地址">
            <el-input v-model="form.area"></el-input>
          </el-form-item>

          <el-form-item label="兴趣爱好">
            <el-input v-model="form.hobby"></el-input>
          </el-form-item>

          <el-form-item label="职业">
            <el-input v-model="form.work"></el-input>
          </el-form-item>

          <el-form-item label="个性签名">
            <el-input v-model="form.design"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input v-model="form.mobilePhoneNumber"></el-input>
          </el-form-item>

          <span slot="footer" class="dialog-footer">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="submit">提 交</el-button>
          </span>

  </div>

  
  </div>
  </el-form>
  
    </div>
</template>

<script>
    export default {
        data() {
          var reg_psd=/^(?=.*\d)(?=.*[A-Z|a-z])[a-zA-Z0-9]{8,15}$/ //密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)
          var reg2=/^[a-zA-Z\u4e00-\u9fa5]+$/ //只能是中文或英文
          var reg_tel = new RegExp("^1[356789]\\d{9}$");  //手机号码验证
          var reg_emi = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi; //邮箱格式验证
          var validatePassWord=(rule, value, callback) => {
            if(value===''){
              callback(new Error('请输入密码'));
            }else if(!reg_psd.test(value)){
               callback(new Error('必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间'));
            }else{
              callback()
            }
          };

          var validateEmail=(rule, value, callback) => {
             if(value===''){
               callback(new Error('请输入邮箱'));
             }else if(!reg_emi.test(value)){
                callback(new Error('请输入正确格式的邮箱'));
             }else{
              callback()
             }
          };

          var validatePhone=(rule, value, callback) => {
             if(value===''){
               callback(new Error('请输入手机号'));
             }else if(!reg_tel.test(value)){
                callback(new Error('请输入正确的手机号'));
             }else{
              callback()
             }
          }
           
           return {
               value2: true,
               avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                form: {
                  password:'',
                  nickname:'',
                  age:'',
                  sex:'',
                  email:'',
                  area:'',
                  hobby:'',
                  work:'',
                  design:'',
                  mobilePhoneNumber:''
                },
                rules:{
                  password:[{ validator: validatePassWord, trigger: 'blur'}],
                  email:[{validator: validateEmail, trigger: 'blur'}],
                  mobilePhoneNumber:[{validator: validatePhone, trigger: 'blur'}]
                }
        };
    },
   mounted(){
          this.init()
   },
     methods: {
     init(){
         
         var data=JSON.parse(window.localStorage.getItem('res'));
         this.form.password=data.userReply.replyPassword
         this.form.nickname=data.userMessage.userName
         this.form.age=data.userMessage.age
         this.form.sex=data.userMessage.gender
         if(this.form.sex==='男'){
          this.value2=true
         }else{
          this.value2=false
         }
         this.form.email=data.userReply.replyEmail
         this.form.area=data.userMessage.userResidentialAddress
         this.form.hobby=data.userMessage.userHobby
         this.form.work=data.userMessage.userEmploy
         this.form.design=data.userMessage.userSignature
         this.form.mobilePhoneNumber=data.userReply.numberPhone
     },
    submit() {
    // 先把数据放在localStorage里面   创建一个临时对象，记录表格里改变的数据，通过axios提交数据，当提交过后，进行初始化刷新页面
   
    },
    handleClose() {
         //取消直接把储存在localStorage 的数据全部放在表格里 提示已取消
         
    },
  },
};


</script>

<style lang="less" scoped>
p{
    text-align: left;
    font-size: .3rem;
    line-height: .3rem;
    font-weight: 700;
  
    
}
.updateinfo {
  position: relative;
  display: flex;
  top:1rem;
  height: 550px;
  overflow: auto;
}
.left {
  flex: 1;
}
.right {
  flex: 3;
  margin-left: 1.5rem;
  .el-form-item{
    margin-bottom: 1.09rem;
    width: 16.25rem;
   
  }
}
.dialog-footer{
    position: absolute;
    left: 50%;
    transform: translate(0 -50%);
}
</style>