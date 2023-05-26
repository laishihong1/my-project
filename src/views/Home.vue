<template>
 
       <div class="contianer" v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      
       >
      
        <el-row>
                <el-col :span="8"  style="padding-right:10px">
                    <el-card class="box-card">
                      <div class="user">
                        <!-- <img src="" alt="" srcset=""> -->
                         <el-avatar :src=this.src class="img"> user </el-avatar>
                        <div class="userinfo">
                            <p class="name">{{this.user.userName}}</p>
                            <p class="access">管理员</p>
                        </div>
                      </div>
                      <div class="login-info">
                        <p>本次登陆时间：<span>{{this.user.userOnlineTime}}</span></p>
                        <p>本次登陆地点：<span>{{this.user.userLocation}}</span></p>
                        <p>当前在线设备：<span>{{this.user.userUsedEquipment}}</span></p>
                      </div>
                    </el-card>
                      <el-card :style="{'margin-top':this.fontSize(40)+'px'}">
                            <count-table></count-table>  
                      </el-card>


                </el-col>

                <el-col :span="16">
                  <div class="num">
                    <el-card v-for="item in accountData" :key="item.name" :body-style="{display:'flex',padding:0, }">
                        <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}" style="text-align:center"></i>
                        <div class="detail">
                          <p class="number">{{item.value}}</p>
                          <p class="desc">{{item.name}}</p>
                        </div>
                      
                    </el-card>
                  </div>
                  <!-- 折线图 -->
                    <el-card >
                      <div style="height:4.5rem"><line-chart></line-chart></div>
                    </el-card>
                        
                  <div class="graph" style="height:7.125rem">
                                      <!-- 扇形图 -->
                    <el-card> <pie-chart></pie-chart> </el-card>
                                <!-- 柱状图 -->
                    <el-card>
                      <column-chart></column-chart>
                      </el-card>
                    </div>    
                </el-col>         
        </el-row>
      </div> 
        
  
   
</template>
<script>
 
  import lineChart from '@/components/echart/table/lineChart'
  import pieChart from '@/components/echart/table/pieChart'
  import columnChart from '@/components/echart/table/columnChart'
  import countTable from '@/components/echart/table/countTable'

   import Cookies from 'js-cookie';
    export default {
    
         data() {
            
          return {
             loading:true,
             timer:null, //定时器名称

             
               src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
               data:{

                  totalReplyPassNumber:'',  //统计今年通过总人数
                  totalReplyNumber:'',      //统计今年注册人数

               },
            accountData:[
              {
                name:'本月注册用户量',
                value:'',
                icon:'user-solid',
                color:'#ffb980'
              },
              {
                name:'本月在线用户量',
                value:'',
                icon:'user',
                color:'#2ec7c9'
              },
             {
                name:'本月通过申请用户数量',
                value:'',
                icon:'user',
                color:'#ffb980'
              },
               {
                name:'本月未通过申请用户数量',
                value:'',
                icon:'user',
                color:'#2ec7c9'
              },
               {
                name:'本年用户申请量',
                value:'',
                icon:'user',
                color:'#ffb980'
              },
               {
                name:'本年申请通过量',
                value:'',
                icon:'user',
                color:'#2ec7c9'
              },
        
            ],
             user:{},
          };
         }, 
         
         components:{
           lineChart,
           pieChart,
           columnChart,
           countTable,
          
         },
         created(){
              this.loading=true
               this.init()
                 this.timer = setInterval(() => {
                    localStorage.removeItem('userSingleData')
                    localStorage.removeItem('userStatistics')
                    setTimeout(this.init(), 0)
                }, 1000*60) //十分钟刷新
         },
         
         methods:{
           init(){
          
                  var loginData = JSON.parse(window.localStorage.getItem('param'))
                  var cookies=Cookies.get('token')
                   if(loginData&&cookies){
    
                              //判断是否有用户信息 userSingleData
                              //是否有所有控件使用的信息 userStatistics
                      var userSingleData=JSON.parse(window.localStorage.getItem('userSingleData'));
                      var userStatistics=JSON.parse(window.localStorage.getItem('userStatistics'));

                          if(userSingleData){

                            this.user=userSingleData;
                           
                              if(userStatistics){
                                
                                  this.Month(userStatistics.user_statistics)
                                  
                                  this.data.totalReplyNumber=userStatistics.totalReplyNumber;
                                  this.data.totalReplyPassNumber=userStatistics.totalReplyPassNumber
                                  this.AccountData()  
                                  this.loading=false
                                } 
                                else{
                                      this.$axios.get("http://localhost:8080/user/user_statistics").then(res=>{

                                      window.localStorage.setItem('userStatistics',JSON.stringify(res.data.data))
                                      
                                      this.Month(res.data.data.user_statistics)  

                                      this.data.totalReplyNumber=res.data.data.totalReplyNumber;
                                      this.data.totalReplyPassNumber=res.data.data.totalReplyPassNumber
                                     
                                      this.AccountData()
                                      this.loading=false
                                })
                                }
                          }
                          else{
                                var param={
                                replyAccount:loginData.account,
                                replyPassword:loginData.password
                              }
                              this.$axios.post("http://localhost:8080/simpleUser",param).then(res=>{
                                    
                                      this.user=res.data.data; //返回单用户数据
                                      window.localStorage.setItem('userSingleData',JSON.stringify(this.user)) 
                                
                                  this.$axios.get("http://localhost:8080/user/user_statistics").then(res=>{
                                      
                                      window.localStorage.setItem('userStatistics',JSON.stringify(res.data.data))
                                      this.Month(res.data.data.user_statistics)  
                                      this.data.totalReplyNumber=res.data.data.totalReplyNumber;
                                      this.data.totalReplyPassNumber=res.data.data.totalReplyPassNumber
                                      this.AccountData()
                                      this.loading=false
                                })



                              })
                              .catch(error=>{
                                window.localStorage.clear()

                                this.$message.warning('当前服务器出错，数据为模拟数据')
                            
                                this.$axios.post("http://localhost:8081/text/user").then(res=>{
                                
                                      this.user=res.data.data
                                      
                                    })
                                this.$axios.get('http://localhost:8081/text/UserNumber').then(res=>{
                                      console.log(res.data)
                                      this.Month(res.data)
                                      this.AccountData()    
                                      this.loading=false
                                })    
                              })
                          }    
                  }
                  else{
                    this.$axios.post("http://localhost:8081/text/user").then(res=>{
                          this.user=res.data.data
                          
                        })
                    this.$axios.get('http://localhost:8081/text/UserNumber').then(res=>{
                      
                          this.Month(res.data)
                          this.AccountData()   
                         this.loading=false
                    })    
              }
                    
            },
           fontSize(res){
            let docEl = document.documentElement,
              clientWidth =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
                if (!clientWidth) return;
              
                let fontSize = clientWidth / 2600;
                return res * fontSize;
            },  
                Month:function(item){
                    let nowDate = new Date();
                  
                    var month=nowDate.getMonth()+1
                  
                    for (const i in item) {
                        if(month===item[i].month){
                            return this.data=item[i];
                        }
                    }
                },
              AccountData:function(){
                  this.accountData[0].value=this.data.replyPeople;
                  this.accountData[1].value=this.data.onlinePeople;
                  this.accountData[2].value=this.data.replyPassNumber;
                  this.accountData[3].value=this.data.failedReplyNumber;
                  this.accountData[4].value=this.data.totalReplyNumber;
                  this.accountData[5].value=this.data.totalReplyPassNumber;
              } ,

   },
    beforeDestroy(){
     clearInterval(this.timer);        
     this.timer = null;
}
    
  }
   </script>

    <style lang="less" scoped>
          
                .user{
                    display: flex;
                    align-items: center;
                    padding-bottom: .25rem;
                    margin-bottom:  .25rem;
                    border-bottom:1px solid #ccc;
                    
                    .img{
                      margin-right: .5rem;
                      width : 1.875rem;
                      height: 1.875rem;
                      border-radius: 50%;
                    }
                    .name{
                      font-size: .4rem;
                      margin-bottom: 10px;
                    }
                    .access{
                      color: #999999;
                    }
                }
                .login-info{
                    p{
                      text-align: left;
                      line-height:28px ;
                      font-size: 14px;
                      color: #999999;
                      span{
                        margin-left: .75rem;
                        color: #666666;
                      }
                    }

                }
                .num{
                    display:flex;
                    flex-wrap: wrap;
                    justify-content:space-between;
                    .el-card{
                          width: 32%;
                          margin-bottom: .25rem;
                    }
                  .icon {
                    width: 1rem;
                    height: 1rem;
                    font-size: 30px;
                    line-height: 1rem;
                    color: #ffffff;
                  }
                  .detail{
                      margin-left: 15px;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      .number{
                        font-size: .375rem;
                        margin-bottom: 10px;
                        line-height: .375rem;
                        height: .375rem;
                      }
                      .desc{
                        color: #999999;
                      }
                    }
                
              }
              .graph{
                margin-top: .8rem;
                display: flex;
                justify-content: space-between;
                .el-card {
                    width: 48%; 
          }
  }
</style>