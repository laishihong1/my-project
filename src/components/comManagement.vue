<template>
    <div>
    
      <div class="app-container">

        <div class="box">

            <div class="filter-container" style="left:0.5rem">
                <el-input placeholder="请输入账号" v-model=" pagination.userAccount" style="width: 200px; margin-right:20px" class="filter-item"></el-input>
                <el-input placeholder="请输入用户名" v-model=" pagination.userName" style="width: 200px;margin-right:20px" class="filter-item"></el-input>
                  <el-input placeholder="请输入上次登陆地点" v-model=" pagination.userLocation" style="width: 200px;margin-right:20px" class="filter-item"></el-input>
                <el-button @click="getAllPages()" class="dalfBut">查询</el-button>
               
            </div>

            <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>

                <el-table-column prop="userAccount" align="center" label="用户账号"></el-table-column>

                <el-table-column prop="userName" label="用户昵称" align="center"></el-table-column>

                <el-table-column prop="userOnlineTime" label="用户上次登陆时间" align="center"></el-table-column>

                <el-table-column prop="userTotalTime" label="用户总在线时长" align="center"></el-table-column>

                <el-table-column prop="userLocation" label="用户上次登陆地点" align="center"></el-table-column>
    
                <el-table-column prop="mark" label="用户身份" align="center"></el-table-column>
                
                <el-table-column label="操作" align="center">

                    <template slot-scope="scope">

                        <el-button type="primary" size="mini" @click="handleUpdate(scope.$index,scope.row)">编辑</el-button>

                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>

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

            <!-- 编辑标签弹层 -->

            <div class="add-form">

                <el-dialog title="修改信息" :visible.sync="dialogFormVisible4Edit">
                    <el-form :inline="true"   class="demo-form-inline">

                        <el-form-item label="用户账号">
                            <el-input  v-model="formData.userAccount" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true"  class="demo-form-inline">
                       <el-form-item label="用户身份">
                            <el-input  v-model="formData.mark" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">

                        <el-button @click="cancel()">取消</el-button>

                        <el-button type="primary" @click="handleEdit()">确定</el-button>

                    </div>

                </el-dialog>

            </div>
        </div>

    </div>

    
    </div>
</template>

<script>
    export default {
         data() {
            return {
            dataList: [],//当前页要展示的列表数据
            dialogFormVisible: false,//添加表单是否可见
            dialogFormVisible4Edit:false,//编辑表单是否可见
            formData: {
                id:'',
                userAccount:'',
                mark:''
            },//表单数据
            
            pagination: {//分页相关模型数据
                currentPage: 1,//当前页码
                pageSize:20,//每页显示的记录数e
                total:0,//总记录数
                userAccount:'',
                userName:'',
                userUsedEquiment:'',
                userOnlineTime:'',
                userTotalTime:'',
                userLocation:'',
                mark:''
            },
            
            };
         },
          //钩子函数，VUE对象初始化完成后自动执行-->
          mounted() {
            //调用查询全部数据的操作-->
            this.getAll();
        },
       methods: {
            //列表
            getAll() {
                //发送异步请求
              

                this.$axios.get("http://localhost:8080/user/userAll/"+this.pagination.currentPage+"/"+this.pagination.pageSize).then((res)=>{
                   console.log(res.data)
                   if(res.data.flag){
                      
                       this.dataList=res.data.data
                     this.pagination.total=res.data.data.length
                    } else{
                        this.$message.error('当前返回数据异常')
                    }
                   
                })
                .catch(error=>{
                    this.$message.warning('服务器当前不在线,当前数据为模拟数据')
                     this.$axios.get("http://localhost:8080/text/comManage/").then((res)=>{
                     this.dataList = res.data;
                     this.pagination.total=res.data.length
                })
                })
            },

            //分页查询
            getAllPages() {
                //组织参数，拼接url请求地址
                // console.log(this.pagination.type);
                var param = "?name="+this.pagination.userAccount;
                param +="&gender="+this.pagination.userName;
                param +="&address="+this.pagination.userLocation;
                // console.log(param);

                //发送异步请求
                this.$axios.get("http://localhost:8080/user/userSearch/"+this.pagination.currentPage+"/"+this.pagination.pageSize+'/'+param).then((res)=>{
                     if(res.data.flag){
                     this.dataList=res.data.data
                     this.pagination.total=res.data.data.length
                     }else{
                        this.$message.error('当前查询异常')
                     }
                     
                });
            },

            // //切换页码
            handleCurrentChange(currentPage) {
                //修改页码值为当前选中的页码值
                this.pagination.currentPage = currentPage;
                //执行查询
                this.getAll();
            },


             //弹出添加窗口
            handleCreate() {
                this.dialogFormVisible = true;
                this.resetForm();
            },

            //
            // //重置表单
            resetForm() {
                this.formData = {};
            },
            
            
            // //取消
            cancel(){
                this.dialogFormVisible = false;
                this.dialogFormVisible4Edit = false;
                this.$message.info("当前操作取消");
            },
            //
            // 删除
            handleDelete(row) {
                // console.log(row);
                this.$confirm("此操作永久删除当前信息，是否继续？","提示",{type:"info"}).then(()=>{
                    this.$axios.delete("http://localhost:8080/stsimpleUser/deleteReplyUser/"+row.id).then((res)=>{
                        if(res.data.flag){
                            this.$message.success("删除成功");
                        }else{
                            this.$message.error("操作异常");
                        }
                    }).finally(()=>{
                        //2.重新加载数据
                        this.getAll();
                    });
                }).catch(()=>{
                    this.$message.info("取消操作");
                });
            },

            
            // handleUpDate(row){
            //      this.handleCreate();
            //      this.formData.id=row.id
            //      this.formData.userAccount=row.userAccount
            //      this.formData.mark=row.mark
            // },

            //  //修改

            // handleEdit(row) {
            //      if(this.formData.userAccount===row.userAccount&&this.formData.mark==row.mark){
            //         this.$message.error('当前你未作出任何修改')
            //      }else if(this.formData.userAccount===''||this.formData.mark===''){
            //         this.$message.error('请确认是否全部填写')
            //      }else{
            //         this.$axios.put("http://localhost:8080/students",this.formData).then((res)=>{
            //         if(res.data.flag){
            //             this.$message.success('编辑成功')
            //         }
            //         else{
            //             this.$$message.error('操作异常')
            //         }
            //         }).finally(()=>{
            //             //2.重新加载数据
            //             this.getAll();
            //         });
            //      }
                
            // },
        },
         


   }
</script>

<style lang="less" scoped>
  .pagiantion{
      position: absolute;
      margin-top: 10px;
       right: 20px;
  }
 
</style>