<template>
  <div>
   <el-descriptions class="margin-top" title="用户信息" :column="1" border>
   
   
      <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-picture"></i>
        头像
      </template>
       <img :src="this.src" alt="" style="width:100px;height:100px;">
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
         {{this.dataForm.userMessage.userName}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user-solid"></i>
        用户身份
      </template>
        {{this.dataForm.mark>1?(this.dataForm.mark>2?'管理员':'会员用户'):'普通用户'}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-notebook-1"></i>
        用户账号
      </template>
      {{this.dataForm.userReply.replyAccount}}
    </el-descriptions-item>

   
   <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-claim"></i>
        账户状态
      </template>
         <el-tag size="small">
           {{this.dataForm.mark>0?'已注册':'未注册'}}
          </el-tag>
    </el-descriptions-item>
      
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-document"></i>
        注册时间
      </template>
       {{this.dataForm.userReply.replyTime}}
    </el-descriptions-item>

     <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-document-checked"></i>
        审核通过时间
      </template>
        {{this.dataForm.userReply.replyPassTime}}
    </el-descriptions-item>


    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住城市
      </template>
        {{this.dataForm.userMessage.userResidentialCity}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">
         {{this.dataForm.mark>1?(this.dataForm.mark>2?'管理员':'会员用户'):'普通用户'}}
        </el-tag>
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        居住地址
      </template>
        {{this.dataForm.userMessage.userResidentialAddress}}
    </el-descriptions-item>


  </el-descriptions>

  </div>
</template>

<script>

export default {
  name: "Info",
  data() {
    return {
          src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          dataForm:{
             
          }
    };
  },
  mounted() {
      this.init()
  },
  methods: {
       init(){
            this.dataForm=JSON.parse(window.localStorage.getItem('res'));
       }
  },
};
</script>

<style lang="less" scoped>


</style>
