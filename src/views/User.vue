<template>
    <div class="User">
       <div class="filter-container">
                <el-input placeholder="请输入账号" v-model=" pagination.userAccount" style="width: 200px; margin-right:20px" class="filter-item"></el-input>
                <el-input placeholder="请输入密码" v-model=" pagination.userPassword" style="width: 200px;margin-right:20px" class="filter-item"></el-input>
                <el-input placeholder="请输入电话号码" v-model=" pagination.numberPhone" style="width: 200px;margin-right:20px" class="filter-item"></el-input>
                <el-button @click="getAllPages()" class="dalfBut">查询</el-button>
               
            </div>

        <el-table
    :data="tableData.filter(data => !search || data.replyAccount.toLowerCase().includes(search.toLowerCase()))"
     v-bind="lookThoughNumber(tableData.filter(data => !search || data.replyAccount.toLowerCase().includes(search.toLowerCase())))"
    style="width: 100%">

    <el-table-column
      label="申请日期"
      prop="replyTime">
    </el-table-column>

    <el-table-column
      label="申请账号"
      prop="replyAccount">
    </el-table-column>
    
    <el-table-column
      label="申请密码"
      prop="replyPassword">
    </el-table-column>

   <el-table-column
      label="电话号码"
      prop="numberPhone">
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
                total:0,//总记录数,
                userAccount:'',
                userPassword:'',
                numberPhone:''
            }, 
           
      }
    },
      created(){
             this.init()
    },

    methods: {

       init(){

         this.$axios.get("http://localhost:8080/user/userReplyAll/"+this.pagination.currentPage+"/"+this.pagination.pageSize).then(res=>{
                if(res.data.flag){
                  console.log(res.data.data)
                   this.tableData=res.data.data
                   console.log(this.tableData)
                }
                 else{
                    this.$$message.error('当前返回数据异常');
                 }
            
            }).catch(error=>{
                    this.$message.warning('当前服务器不在线,数据为模拟数据')
                    this.$axios.get('http://localhost:8081/text/reply').then(res=>{
                      this.tableData=res.data
                })
            })
      },
      
          //分页查询
            getAllPages() {
                //组织参数，拼接url请求地址
                // console.log(this.pagination.type);
            var param = "?replyAccount="+this.pagination.userAccount;
                param +="&replyPassword="+this.pagination.userPassword;
              
                // console.log(param);

                //发送异步请求
                this.$axios.get("http://localhost:8080/user/userReplySearch/"+this.pagination.currentPage+"/"+this.pagination.pageSize+'/'+param).then((res)=>{
                     if(res.data.flag){  
                     this.tableData=res.data.data
                     this.pagination.total=res.data.data.length
                     console.log(this.tableData)
                     }else{
                        this.$message.error('当前查询异常')
                     }
                     
                });
            },


      handleEdit(index, row) {
        console.log(index, row);
          //发送同意注册请求
           this.$axios.post('http://localhost:8080/simpleUser/agreeReplyUser'+'/'+row.id).then((res)=>{
          
                         if(res.data.flag){
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
      
      //发送撤回注册
      handleDelete(index, row) {
        console.log(index, row);
         this.$confirm("此操作永久删除当前信息，是否继续？","提示",{type:"info"}).then(()=>{
          
                    this.$axios.delete('http://localhost:8080/simpleUser/deleteReplyUser'+'/'+row.id).then((res)=>{
                    
                         if(res.data.flag){
                          this.$message.success('已撤回')
                         }else{
                          this.$message.error('操作异常')
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