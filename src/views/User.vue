<template>
    <div class="User">
      
        <el-table
    :data="tableData.filter(data => !search || data.replyAccount.toLowerCase().includes(search.toLowerCase()))"
     v-bind="lookThoughNumber(tableData.filter(data => !search || data.replyAccount.toLowerCase().includes(search.toLowerCase())))"
    style="width: 100%">

    <el-table-column
      label="申请日期"
      prop="date">
    </el-table-column>

    <el-table-column
      label="申请账号"
      prop="replyAccount">
    </el-table-column>
    
    <el-table-column
      label="在线总时间"
      prop="totalTime">
    </el-table-column>

    <el-table-column
      label="申请理由"
      prop="replyReason">
    </el-table-column>

     <el-table-column
      align="right">
      <template slot="header" slot-scope="{}">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">同意</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
             
               <!--分页组件-->
            <div class="pagination-container">

                <el-pagination
                        class="pagiantion" 

                        @current-change="handleCurrentChange"

                        :current-page="pagination.currentPage"

                        :page-size="pagination.pageSize"

                        layout="total, prev, pager, next, jumper"

                        :total="pagination.total">

                </el-pagination>
            </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        search: '',
          dialogFormVisible: false,//添加表单是否可见
          dialogFormVisible4Edit:false,//编辑表单是否可见
           pagination: {//分页相关模型数据
                currentPage: 1,//当前页码
                pageSize:20,//每页显示的记录数e
                total:0,//总记录数
            }, 
           
      }
    },
      created(){
             this.init()
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
          //发送后端数据添加请求 post 返回成功和失败信息
           this.$axios.post('http://localhost:8080/text/reply'+row).then((res)=>{
          
                         if(res.data){
                          this.$message.success('已同意')
                         }else{
                          this.$message.error('操作异常')
                         }
                    }).finally(()=>{
                        //2.重新加载数据
                        this.init();
                    });
          this.init()
      },
      
      handleDelete(index, row) {
        console.log(index, row);
         this.$confirm("此操作永久删除当前信息，是否继续？","提示",{type:"info"}).then(()=>{
          //  this.$axios.delete("http://localhost:8080/students/"+row)
                    this.$axios.delete('http://localhost:8080/text/reply'+row).then((res)=>{
                    
                         if(res.data){
                          this.$message.success('删除成功')
                         }else{
                          this.$message.error('删除失败')
                         }
                    }).finally(()=>{
                        //2.重新加载数据
                        this.init();
                    });
                }).catch(()=>{
                    this.$message.info("取消操作");
                });
      },

      lookThoughNumber(item){
            this.pagination.total=item.length
      },

     init(){
        this.$axios.get('http://localhost:8080/text/reply').then(res=>{
            this.tableData=res.data
        })
     },

            // //切换页码
            handleCurrentChange(currentPage) {
                //修改页码值为当前选中的页码值
                this.pagination.currentPage = currentPage;
                //执行查询
                this.init();
            },

           
        },

    }

</script>
<style lang="less" scoped>
      .User{
         position: relative;
         width: 100%;
         height: 100%;
        // overflow: hidden;
         .pagination-container{
            position: relative;
            display: flex;
            .pagiantion{
               position: absolute;
               right: 0;
            }
         }
      }
    
</style>