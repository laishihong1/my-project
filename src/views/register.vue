<template>
    <div>
  

     <el-container>
        <el-header :style="{'display':this.$store.state.tabs.hideenStep}">
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
        <el-footer  :style="{'display':this.$store.state.tabs.hideenStep}">
             <div class='contianer'>
            <el-button :style="{'display':this.beforeDisplay}"  @click="before">{{this.beforeButton}}</el-button>
            <el-button :style="{'display':this.$store.state.tabs.hidden}" @click="next">{{this.afterButton}}</el-button>
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
                afterDisplay:this.$store.state.tabs.hidden,
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
                 //    console.log(this.active)
                    //  this.active=this.$store.state.tabs.reigsterMark
                      this.active++
                    if(this.active>=1){
                        this.beforeDisplay='inline-block'
                    }

                    if (this.active >2 ){
                         console.log(this.active)
                         this.beforeDisplay='none'
                        //  this.afterButton='完成'
                         this.$store.commit('modifyMark','none')


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
                             localStorage.clear();
                             this.$message.error('操作异常')
                              setTimeout(()=>{
                                     this.$router.replace('/login')
                                     this.$message.success('欢迎回来')
                                },4000)
                         })
                    }
                    
                },
                before(){
                    //  this.$store.commit('modifyMark',-1)
                    //  this.active=this.$store.state.tabs.reigsterMark

                      this.active=this.active-1;
                     this.afterButton='下一步'
                     if(this.active===0){
                        this.beforeDisplay='none'
                     }
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
  }
 .el-main {
   
   
    text-align: center;
    height: 16.1rem;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

      .contianer{
          display:flex; 
          justify-content:space-between;
      }
</style>