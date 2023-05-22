<template>
      <div class="reigster3">
         <div><vantas-r></vantas-r></div>
         <div class="form">
           <div class="text">
              <p>请写下你注册的理由</p>
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 10}"
                maxlength="50"
          
                step:5
                resize="none"
                show-word-limit:true
                clearable:true
                v-model="textarea"
              
                 >
                </el-input>
         </div>
           <el-button type="primary" @click="this.click">确定</el-button>
         </div>
      </div>
</template>

<script>
import vantasR from '@/utils/vantasR'
    export default {
        data() {
          var validateText=(rule, value, callback)=>{
              if(value===''){
                callback(new Error('请输入内容......'));
              }
            else{
                if(this.validateTag(value)){
                    callback(new Error('只能输入文字或者字母'));
                }
            }
          };
    return {
       rules:{
         textarea:[
          { validator: validateText, trigger: 'blur'}
         ]
       },
      textarea: '',
    }
  },
   created(){
       this.$store.commit('modifyMark','none')
       this.init()
   },
  methods:{
     init(){
       var text = JSON.parse(window.localStorage.getItem('replyReason'))
       if(text){
        this.textarea=text;
       }
     },
     click(){
          //  console.log(this.textarea)
           var text = JSON.parse(window.localStorage.getItem('replyReason'))
           if(this.textarea===''){
              this.$message('请输入内容.....')
              localStorage.removeItem('replyReason');
           }
           else if(!text&&this.textarea!==''){
                 this.$message.success('还差一步了，快完成完成注册了')
                   this.$store.commit('modifyMark','inline-block')
                  window.localStorage.setItem('replyReason',JSON.stringify(this.textarea))
           }else if(text){
                 localStorage.removeItem('replyReason');
                 window.localStorage.setItem('replyReason',JSON.stringify(this.textarea))
                 this.$store.commit('modifyMark','inline-block')
                 this.$message.success('还差一步了，快完成完成注册了,请点击下一步')
           } 
     },
      validateTag: function (item) {
			var reg = /^[\u0391-\uFFE5A-Za-z]+$/;
			if (reg.test(item)) {
				this.errorTips = false;
			} else {
				this.errorTips = true
			}
		},
    checkTextArea(){
      console.log('.......')
     
      }
    },
     components:{
            vantasR
        }
 
  }
    
</script>

<style lang="less" scoped>
     .reigster3{
         position: relative;
         #vanta-r{
             width: 100%;
             height: 100%;
            
           }
           .form{
             position: relative;
                height: 16.1rem;
                  .text{
              position: relative;
              width: 50%;
              left: 75%;
              transform: translate(-100%,170%);
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
    }
     }

    
</style>