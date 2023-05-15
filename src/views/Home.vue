<template>
    <div class="contianer">
     <el-row>
            <el-col :span="8"  style="padding-right:10px">
                <el-card class="box-card">
                   <div class="user">
                    <img src="" alt="" srcset="">
                    <div class="userinfo">
                         <p class="name">Admin</p>
                         <p class="access">管理员</p>
                    </div>
                   </div>
                   <div class="login-info">
                    <p>上次登陆时间：<span>2020-1-1</span></p>
                    <p>上次登陆地点：<span>成都</span></p>
                   </div>
                </el-card>
                   <el-card :style="{'margin-top':this.fontSize(65)+'px'}">
                        <count-table></count-table>  
                   </el-card>


            </el-col>

            <el-col :span="16" :style="{'padding-left':this.fontSize(20)+'px'}">
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
                <el-card style="height:100%">
                  <div style="height:3.5rem"><line-chart></line-chart></div>
                </el-card>
                     
               <div class="graph" style="height:7.125rem">
                                  <!-- 扇形图 -->
                <el-card style="height:100%"> <pie-chart></pie-chart> </el-card>
                            <!-- 柱状图 -->
                <el-card style="height:100%"><column-chart></column-chart></el-card>
                </div>    
            </el-col>         
    </el-row>
           
    </div>
</template>
<script>
   import lineChart from '@/components/echart/lineChart'
   import pieChart from '@/components/echart/pieChart'
   import columnChart from '@/components/echart/columnChart'
   import countTable from '@/components/table/countTable'
    export default {
         data() {
          return {
            accountData:[
              {
                name:'本月注册用户',
                value:210,
                icon:'user-solid',
                color:'#ffb980'
              },
              {
                name:'本月在线用户',
                value:210,
                icon:'user',
                color:'#2ec7c9'
              },
             {
                name:'本月在线用户',
                value:210,
                icon:'user',
                color:'#2ec7c9'
              },
               {
                name:'本月在线用户',
                value:210,
                icon:'user',
                color:'#2ec7c9'
              },
               {
                name:'本月在线用户',
                value:210,
                icon:'user',
                color:'#2ec7c9'
              },
               {
                name:'本月在线用户',
                value:210,
                icon:'user',
                color:'#2ec7c9'
              },
        
            ],
           
          };
         }, 
         components:{
           lineChart,
           pieChart,
           columnChart,
           countTable
         },
         methods:{
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
                   
                    img{
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
                    width: 80px;
                    height: 80px;
                    font-size: 30px;
                    line-height: 80px;
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
                    width: 45%; 
          }
  }
</style>