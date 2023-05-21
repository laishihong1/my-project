<template>
<div>
      <el-table
    :data="tableData"
    border
    style="width:100%;">
    <el-table-column
      prop="month"
      label="月份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="onlinePeople"
      label="在线人数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="replyPeople"
      label="注册人数"
      width="120">
    </el-table-column>
     <el-table-column
      prop="waitTakePeople"
      label="待申请人数">
    </el-table-column>
  </el-table>




</div>
</template>

<script>
import cookies from 'js-cookie';

  export default {
    data() {
      return {
        tableData:[
          {waitTakePeople:''}
        ],
       waitTakePeoples:{
          waitTakePeople:''
       }
      }
    },
      mounted(){
           this.init()
      },
      methods:{
            init(){

                   var loginData = JSON.parse(window.localStorage.getItem('param'))
                   var Cookies=cookies.get('token')
                   var userStatistics=JSON.parse(window.localStorage.getItem('userStatistics'));
                    if(Cookies&&loginData&&userStatistics){
        
                      this.tableData=userStatistics.user_statistics;
                   
                      //Object.assign 对象拼接
                      for(var i=0;i<this.tableData.length;i++){
                         this.waitTakePeoples.waitTakePeople=(this.tableData[i].replyPeople-this.tableData[i].replyPassNumber)
                        
                         this.tableData[i]=Object.assign(this.tableData[i],this.waitTakePeoples)
                       
                      }
                       
                   
                    }
                   else{
                      this.$axios.get('http://localhost:8081/text/textInfo').then((res)=>{
                        this.tableData=res.data
                     })
                   }
                    
                    
           },   
        
 }
}

</script>
