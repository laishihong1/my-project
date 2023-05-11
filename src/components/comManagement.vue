<template>
    <div>
    
      <div class="app-container">

        <div class="box">

            <div class="filter-container">
                <el-input placeholder="输入姓名" v-model=" pagination.name" style="width: 200px; margin-right:20px" class="filter-item"></el-input>


                <el-select v-model=" pagination.gender" placeholder="请选择性别"  style="width: 200px; margin-right:20px">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>

                <el-input placeholder="请输入地址" v-model=" pagination.address" style="width: 200px;margin-right:20px" class="filter-item"></el-input>

                <el-button @click="getAllPages()" class="dalfBut">查询</el-button>
                <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
            </div>

            <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>

                <el-table-column prop="name" align="center" label="姓名"></el-table-column>

                <el-table-column prop="gender" label="性别" align="center"></el-table-column>

                <el-table-column prop="birthday" label="出生日期" align="center"></el-table-column>

                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>

                <el-table-column prop="address" label="现居地址" align="center"></el-table-column>

                <el-table-column label="操作" align="center">

                    <template slot-scope="scope">

                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>

                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>

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

            <!-- 新增标签弹层 -->

            <el-dialog title="添加学生" :visible.sync="dialogFormVisible">

                <el-form :inline="true"   class="demo-form-inline">
                    <el-form-item label="学生姓名">
                        <el-input  v-model="formData.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="formData.gender"  placeholder="请选择性别">
                            <el-option label="男" value="男" ></el-option>
                            <el-option label="女" value="女" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-form :inline="true"   class="demo-form-inline">
                        <el-form-item label="出生日期">
                            <el-date-picker
                                    v-model="formData.birthday"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    <el-form-item  label="电话">
                        <el-input  v-model="formData.phone"  placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>

                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item  label="现居地址">
                        <el-input  v-model="formData.address"  placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>


                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handlerAdd()">确 定</el-button>
                </div>

            </el-dialog>


            <!-- 编辑标签弹层 -->

            <div class="add-form">

                <el-dialog title="修改信息" :visible.sync="dialogFormVisible4Edit">
                    <el-form :inline="true"   class="demo-form-inline">
                        <el-form-item label="学生姓名">
                            <el-input  v-model="formData.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="formData.gender"  placeholder="请选择性别">
                                <el-option label="男" value="男" ></el-option>
                                <el-option label="女" value="女" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true"   class="demo-form-inline">
                        <el-form-item label="出生日期">
                            <el-date-picker
                                    v-model="formData.birthday"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item  label="电话">
                            <el-input  v-model="formData.phone"  placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item  label="现居地址">
                            <el-input  v-model="formData.address"  placeholder="请输入"></el-input>
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
                name:'',
                gender:'',
                value1:'',
                phone:'',
                address:''
            },//表单数据
            rules: {//校验规则
                type: [{ required: true, message: '图书类别为必填项', trigger: 'blur' }],
                name: [{ required: true, message: '图书名称为必填项', trigger: 'blur' }]
            },
            pagination: {//分页相关模型数据
                currentPage: 1,//当前页码
                pageSize:20,//每页显示的记录数e
                total:0,//总记录数
                name:'',
                gender:'',
                address:''
            },
             studentData: {}
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
                this.$axios.get("http://localhost:8080/students").then((res)=>{
                   
                    this.dataList = res.data.data;
                     this.pagination.total=res.data.data.length
                });
            },

            //分页查询
            getAllPages() {
                //组织参数，拼接url请求地址
                // console.log(this.pagination.type);
            var param = "?name="+this.pagination.name;
                param +="&gender="+this.pagination.gender;
                param +="&address="+this.pagination.address;
                // console.log(param);

                //发送异步请求
                this.$axios.get("http://localhost:8080/students/"+this.pagination.currentPage+"/"+this.pagination.pageSize+param).then((res)=>{
                    this.pagination.pageSize = res.data.data.size;
                    this.pagination.currentPage = res.data.data.current;
                    this.pagination.total = res.data.data.total;
                    this.dataList = res.data.data.records;
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
            //
             //添加

             handlerAdd() {
                this.$axios.post("http://localhost:8080/students",this.formData).then((res)=>{
                    //判断当前操作是否成功
                    if(res.data.flag){
                        //1.关闭弹层
                        this.dialogFormVisible = false;
                         this.$message.success(res.data.msg);
                    }else{
                         this.$message.error(res.data.msg);
                    }
                }).finally(()=>{
                    //2.重新加载数据
                    this.getAll();
                });
            },


            //
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
                    this.$axios.delete("http://localhost:8080/students/"+row.id).then((res)=>{
                        if(res.data.flag){
                            this.$message.success("删除成功");
                        }else{
                            this.$message.error("数据同步失败，自动刷新");
                        }
                    }).finally(()=>{
                        //2.重新加载数据
                        this.getAll();
                    });
                }).catch(()=>{
                    this.$message.info("取消操作");
                });
            },

            //
            //弹出编辑窗口
            handleUpdate(row) {
                this.$axios.get("http://localhost:8080/students/"+row.id).then((res)=>{
                    if(res.data.flag && res.data.data != null ){
                        this.dialogFormVisible4Edit = true;
                        this.formData = res.data.data;
                    }else{
                        this.$message.error("数据同步失败，自动刷新");
                    }
                }).finally(()=>{
                    //2.重新加载数据
                    this.getAll();
                });
            },

             //修改

            handleEdit() {
                this.$axios.put("http://localhost:8080/students",this.formData).then((res)=>{
                    //判断当前操作是否成功
                    if(res.data.flag){
                        //1.关闭弹层
                        this.dialogFormVisible4Edit = false;
                        this.$message.success("修改成功");
                    }else{
                        this.$message.error("修改失败");
                    }
                }).finally(()=>{
                    //2.重新加载数据
                    this.getAll();
                });
            },
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