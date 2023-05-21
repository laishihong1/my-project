<template>
      <div>
      
        <div class="text">
              <p>请写下你注册的理由</p>
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                maxlength="50"
                placeholder="请输入"
                step:5
                resize="none"
                show-word-limit:true
                clearable:true
                v-model="textarea" >
                </el-input>
         </div>
         
           <el-button type="primary" @click="this.click">确定</el-button>
      </div>
</template>

<script>
    export default {
        data() {
    return {
      textarea: '',
    }
  },
  methods:{
     click(){
            window.localStorage.setItem('replyReason',JSON.stringify(this.textarea))
            this.$store.commit('modifyMark',2)
            this.$message.success('还差一步了，完成注册')
     }
  }
    }
</script>

<style lang="less" scoped>
      .text{
         position: relative;
         width: 50%;
         left: 75%;
         transform: translate(-100%,150%);
         p{
          
            text-align: center;
            margin-bottom: .25rem;
            font-size: .375rem;
            font-family: "YaHei";
            height: .25rem;
            line-height: .25rem;
            color: #000;
         }
            .el-input{
                //    width: 2.5rem;
                font-size: 20px;
                text-indent: 6px;
                font-family: "YaHei";
            }
      }
</style>