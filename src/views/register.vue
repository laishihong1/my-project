<template>
    <div>
  
     <el-container>
        <el-header  :style="{'box-shadow':this.$store.state.tabs.headerboxShadow}">
            <el-steps :active="active" finish-status="success" simple>
            <el-step title="步骤 1" description="手机号码注册" icon="el-icon-mobile-phone"></el-step>
            <el-step title="步骤 2" description="账号密码注册" icon="el-icon-s-custom"></el-step>
            <el-step title="步骤 3" description="申请理由信息" icon="el-icon-s-order"></el-step>
            
           </el-steps>
        </el-header>
        <el-main style="padding:0">
                <div v-if="active==0"><reigster-table1></reigster-table1></div>
                <div v-if="active==1"><reigster-table2></reigster-table2></div>
                <div v-if="active==2"><register-table3></register-table3></div>
                <div v-if="active==3"><reigster-table4></reigster-table4></div>
        </el-main>
        <el-footer :style="{'box-shadow':this.$store.state.tabs.footerboxShadow}">
             <div class='contianer'>
            <el-button :style="{'display':this.beforeDisplay}"  @click="before" type="primary" round>{{this.beforeButton}}</el-button>
            <el-button  type="primary" round @click="comeBack">返回主界面</el-button>
            <el-button :style="{'display':this.$store.state.tabs.hidden}" @click="next" type="primary" round>{{this.afterButton}}</el-button>
         </div>
        </el-footer>
  </el-container>

    </div>



</template>

<script>
import reigsterTable1 from '@/components/reigsterTable/reigsterTable1'
import reigsterTable2 from '@/components/reigsterTable/reigsterTable2'
import registerTable3 from '@/components/reigsterTable/registerTable3'
import reigsterTable4 from '@/components/reigsterTable/reigsterTable4'
    export default {
        name:'register',
        data() {
           
            return {
               
                active: 0,
                afterButton:'下一步',
                beforeButton:'上一步',
                beforeDisplay:'none',
                
                 userReply:{
                   numberPhone:'',
                   replyAccount:'',
                   replyPassword:'',
                   replyReason:''
                 }
            };
        },
        methods: {
                next() {
              
                      this.active++
                    if(this.active>=1){
                        this.beforeDisplay='inline-block'
                    }

                    if (this.active >2 ){
                     
                         this.beforeDisplay='inline-block'
                     
                             this.userReply.numberPhone=JSON.parse(window.localStorage.getItem('numberPhone'))
                             this.userReply.replyAccount=JSON.parse(window.localStorage.getItem('replyAccount'))
                             this.userReply.replyPassword=JSON.parse(window.localStorage.getItem('replyPassword'))
                             this.userReply.replyReason = JSON.parse(window.localStorage.getItem('replyReason'))
                             
                         this.$axios.post("http://localhost:8080/register",this.userReply).then(res=>{
                              if(res.data.flag){
                                this.$message.success('注册成功,正在返回登陆页面.......')
                                setTimeout(()=>{
                                     this.$router.replace('/login')
                                     this.$message.success('欢迎回来,当前注册信息已提交，请耐心等待审核')
                                },4000)
                                // 移除所有
                                localStorage.clear();


                              }else{
                                this.$message.error('服务异常,待稍后再试一次......')
                                // 移除所有
                                localStorage.clear();
                                 this.$router.replace('/reigster')
                              }
                         })
                         .catch(error=>{
                             // 移除所有
                            // localStorage.clear();
                             this.$message.error('操作异常')
                              // setTimeout(()=>{
                              //        this.$router.replace('/login')
                              //        this.$message.success('欢迎回来')
                              //   },4000)
                         })
                    }
                    
                },
                before(){
                  
                     this.active=this.active-1;
                     this.afterButton='下一步'
                     if(this.active===0){
                        this.beforeDisplay='none'
                     }
                },
                comeBack(){
                      this.$message.success('欢迎回来')
                      localStorage.clear();
                      this.$router.replace('/login')
                }
     },
     components:{
       reigsterTable1,
       reigsterTable2,
       registerTable3,
       reigsterTable4
     }
    }
</script>

<style lang="less" scoped>

  .el-header, .el-footer {
    text-align: center;
    height: 15%;
  }
 .el-main {
  
    text-align: center;
    height: 70%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

      .contianer{
         position: relative;
          display:flex; 
        
          align-content: center;
          .el-footer{
             display: flex;
             justify-content: space-between;
             position: relative;
          .el-button {
          position: relative;

          }
         
         
          }
         
         
      }
</style>