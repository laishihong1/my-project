<template>
    <div>
  

     <el-container>
        <el-header>
            <el-steps :active="active" finish-status="success" simple>
            <el-step title="步骤 1" description="手机号码注册" icon="el-icon-mobile-phone"></el-step>
            <el-step title="步骤 2" description="账号密码注册" icon="el-icon-s-custom"></el-step>
            <el-step title="步骤 3" description="申请理由信息" icon="el-icon-s-order"></el-step>
            
        </el-steps>
        </el-header>
        <el-main>
                <div v-if="active==0"><reigster-table1></reigster-table1></div>
                <div v-if="active==1"><reigster-table2></reigster-table2></div>
                <div v-if="active==2"><register-table3></register-table3></div>
        </el-main>
        <el-footer>
             <div class='contianer'>
            <el-button :style="{'display':this.beforeDisplay}"  @click="before">{{this.beforeButton}}</el-button>
            <el-button :style="{'display':'inline-block'}" @click="next">{{this.afterButton}}</el-button>
         </div>
        </el-footer>
  </el-container>

    </div>



</template>

<script>
import reigsterTable1 from '@/components/reigsterTable/reigsterTable1'
import reigsterTable2 from '@/components/reigsterTable/reigsterTable2'
import registerTable3 from '@/components/reigsterTable/registerTable3'
    export default {
        name:'register',
        data() {
            return {
                active: 0,
                afterButton:'下一步',
                beforeButton:'上一步',
                beforeDisplay:'none',
            };
        },
        methods: {
                next() {
                     this.active=this.$store.tabs.state.reigsterMark
                    //  this.active++
                    if(this.active>=1){
                        this.beforeDisplay='inline-block'
                    }

                    if (this.active >=3 ){
                        //  this.active = 0;
                         this.afterButton='完成'
                         this.$axios.post("http://localhost:8080/register").then(res=>{
                              if(res.data.flag){
                                this.$message.success('注册成功,正在返回登陆页面.......')
                                setTimeout(()=>{
                                     this.$router.replace('/login')
                                     this.$message.success('欢迎回来')
                                },2000)
                              }else{
                                this.$message.error('服务异常,待稍后再试一次......')
                              }
                         })
                         .catch(error=>{
                             this.$message.error('操作异常')
                         })
                    }
                    
                },
                before(){
                     this.$store.commit('modifyMark',-1)
                     this.active=this.$store.tabs.state.reigsterMark

                    //  this.active=this.active-1;
                     this.afterButton='下一步'
                     if(this.active===0){
                        this.beforeDisplay='none'
                     }
                }
     },
     components:{
       reigsterTable1,
       reigsterTable2,
       registerTable3
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