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
      prop="onLinePeople"
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
      label="待服务处理人数">
    </el-table-column>
  </el-table>




</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[],
      }
    },
      mounted(){
           this.init()
      },
      methods:{
            init(){
                      this.$axios.get('http://localhost:8080/text/textInfo').then((res)=>{
                       this.tableData=res.data
                })
           },
        
 }
}

</script>
