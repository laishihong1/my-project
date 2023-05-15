<template>
   <div class="Label">
     <!-- 背景 -->
     <dv-full-screen-container>
      
      <el-container >
        <!-- 头部 -->
          <el-header class="header">
            <h1>通讯录管理平台</h1>
           <div class="showTime">当前时间：{{ this.nowYear }}&nbsp;{{this.nowTime }}</div>
          </el-header>
        <!-- 页面主体部分 -->
          <el-main class="mainbox">
          
              <el-col :span="6"  class="column">
                  <div class="grid-content bg-purple ">
                       
                      <el-card class="box-card panel">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                        <lineTable1></lineTable1>
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>
                    
                     <el-card class="box-card panel ">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                     
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>
                    
                       <el-card class="box-card panel">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                      
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>

              </div>

              </el-col>
              <el-col :span="12" class="column"><div class="grid-content bg-purple-light ">
                <div class="no">
                  <div class="no-hd"><ul>
                    <li>2222</li>
                    <dv-decoration-4 style="width:5px;height:1rem;" />
                    <li>2222</li>
                  </ul></div>
                  <div class="no-bd">
                    <ul>
                      <li>当前在线人数统计</li>
                      <li>注册总人数统计</li>
                    </ul>
                  </div>
                </div>
                <!-- 地图模块 -->
                <div class="map">
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                    <div class="chart">
                      <maps class="maps"></maps>
                    </div>
                </div>
              </div></el-col>
              <el-col :span="6"  class="column"><div class="grid-content bg-purple ">
                   <el-card class="box-card panel">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                     
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>
                     <el-card class="box-card panel">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                       
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>
                     <el-card class="box-card panel">
                      <h2>在线人数比率拍名</h2>
                      <div class="chart">
                      
                      </div>
                      <div class="panel-footer"></div>
                    </el-card>
              </div></el-col>
           
          </el-main>
      </el-container>
    </dv-full-screen-container>
   
   </div>
  
</template>
 

<script>
     import lineTable1 from '@/components/echart/Label/lineTable1'
     import maps from '@/components/echart/Label/maps'
     import plainTable6 from '@/components/echart/Label/plainTable6'
     import carouselTable from '@/components/echart/Label/carouselTable'
 
     export default {
      
        data() {
            return {
                  nowTime: "", // 当前时间
                  nowYear: "", // 当前年份
                  dialogTableVisible: false,
                  bar:this.$refs.bar1,
                  
            };
        },
        mounted() {
          this.currentTime();
          this.refresh(600);
        },
        destroyed(){
            this.$store.commit('displayTag')
        },
        methods:{
            // hiddenTags(){
            //      this.$store.commit('hiddenTag','label')
            // },
 
            currentTime() {
            setInterval(this.getDate, 500);
            },
            getDate:function(){

              let yy=new Date().getFullYear();
              let ww=new Date().getMonth() + 1;
              let dd = new Date().getDate();
              this.nowYear=yy+"."+ww+"."+dd;
              let hh = new Date().getHours();
              let ms =
              new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
              let mf =
              new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes();

               this.nowTime= hh + ":" + mf + ":" + ms;
            },
              refresh:function(seconds){
                setTimeout("self.location.reload()",seconds*1000);
              },
              
          },
         beforeDestroy: function() {
           if (this.getDate) {
              console.log("销毁定时器");
              clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
         }      
      },
      
    components:{
       maps,
       lineTable1,
       plainTable6,
       carouselTable
    }
}


</script>

 <style lang="less" scoped>
   @font-face {
        font-family:'electronicFont';
        src: url("@/utils/DS-DIGIT.ttf");
   }
    
        #dv-full-screen-container{
    padding: 0;
    margin: 0;
    z-index: 0;
  
    background: url("@/utils/bg1.jpg") no-repeat top center ;
    background-size:100% 100%;
     .header{
      position: relative;
      background: url("@/utils/head_bg.png") no-repeat;
      background-size: 100% 100%;
      h1{
        color: #fff;
        line-height: 0.53rem;
        font-size: .45rem;
        text-align: center;
      }
      .showTime{
          position: absolute;
          right: 30px;
          line-height:.9375rem;
          color: rgba(255, 255, 255, .7);
          font-size: 20px;
          top:0;
          font-family:'electronicFont';
      }
    }
     //  页面主体盒子
     .mainbox{
        display: flex;
        min-width: 24rem;
        max-width: 40.25rem /* 3220/16 */;
        min-height: 13.5rem;
        max-height: 18rem;
        margin:0;
        width: 100%;
        height: 100%;
        //background-color: aqua;
        padding:0.125rem 0.125rem 0;
        .column{
          flex: 3;
        }
        .column:nth-child(2){
          flex: 5;
          margin: 0 .12rem .185rem;
        }

        .panel{ 
                position: relative;
                height: 3.45rem;
                margin-bottom: 0.35rem;
               // height: 3.14rem;
                border: 1px solid rgba(255, 186,139,0.17);
                background: url("@/utils/line.png");
                background-color: rgba(255,255,255,.03);
                &::before{
                   position: absolute;
                   top:0;
                   left: 0;
                   width:10px;
                   height: 10px;
                   border-left: 2px solid #02a6b5;
                   border-top:  2px solid #02a6b5 ;
                   content: "";
                }
                &::after{
                   position: absolute;
                   top:0;
                   right: 0;
                   width:10px;
                   height: 10px;
                   border-right: 2px solid #02a6b5;
                   border-top:  2px solid #02a6b5 ;
                   content: "";
                }
                .panel-footer{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    &::before{
                   position: absolute;
                   bottom:0;
                   left: 0;
                   width:10px;
                   height: 10px;
                   border-left: 2px solid #02a6b5;
                   border-bottom:  2px solid #02a6b5 ;
                   content: "";
                }
                  &::after{
                    position: absolute;
                    bottom:0;
                    right: 0;
                    width:10px;
                    height: 10px;
                    border-right: 2px solid #02a6b5;
                    border-bottom:  2px solid #02a6b5 ;
                    content: "";
                  }
                }
                h2{
                  margin: 0;
                  height: .6rem;
                  color: #fff;
                  line-height: .6rem;
                  text-align: center;
                  font-size: 0.25rem;
                }
                .chart{
                   height: 2.5rem;
                   position: relative;
                }
               
                .cpu{
                        position: relative;
                        flex: 1;
                        width: 50%;
                        height: 100%;
                        background-color: #ffeb7b;
                   }
                   .memory{
                         position: relative;
                         flex: 1;
                         background-color: #02a6b5;
                          width: 50%;
                          height: 100%;
                   }
                
        }

        //数字模块
        .no{
                 background: rgba(101,132,226,.1);
                 padding: .1875rem;
                 .no-hd{
                   border: 1px solid rgba(25,186,139,.17);
                   position: relative;
                   &::before{
                     position: absolute;
                     top:0;
                     left: 0;
                     content: "";
                     width: 0.375rem;
                     height: 10px;
                     border-top:  2px solid #02a6b5 ;
                     border-left: 2px solid #02a6b5;
                   }
                   &::after{
                     position: absolute;
                     bottom:0;
                     right: 0;
                     content: "";
                     width: 30px;
                     height: 10px;
                     border-bottom:  2px solid #02a6b5 ;
                     border-right: 2px solid #02a6b5;
                   }
                   ul{
                     display: flex;
                     align-content: space-between;
                    li{
                       flex: 1;
                       line-height: 1rem;
                       font-size: .875rem;
                       color: #ffeb7b;
                       text-align: center;
                       font-family:'electronicFont';
                    }
                     #dv-decoration-4 {
                      flex: 1;
                    }
                   }
                 }
                 
                 .no-bd{
                    ul{
                      display: flex;
                    li{
                      flex: 1;
                      text-align: center;
                      color: rgba(255,255,255,.7);
                      font-size: 0.225rem;
                      height: .1rem;
                      line-height:.5rem;
                      padding: 0.125rem;
                    }
                    }
                 }
        }
      .map{
        position: relative;
         height: 10.125rem;
         .map1{
           width: 6.475rem;
           height: 6.475rem;
           position: absolute;
           top: 50%;
           left: 50%;
           background: url("@/utils/map.png") no-repeat 50% 50%;
           transform: translate(-50%,-50%);
           background-size: 100% 100%;
           opacity: .3;
         }
          .map2{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8.0375rem;
            height: 8.0375rem;
            background: url("@/utils/lbx.png");
            transform: translate(-50%,-50%);
            background-size: 100% 100%;
            opacity: .5;
            animation: rotate1 15s linear infinite;
          }
          .map3{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 7.075rem;
            height: 7.075rem;
            background: url("@/utils/jt.png");
            transform: translate(-50%,-50%);
            background-size: 100% 100%;
            opacity: .5;
            animation: rotate1 15s reverse linear infinite;
          }
          .chart{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 10.125rem;
            .maps{
              transform: translate(10%,0%);
            }
          }
      }

      }
   }
   

      .el-card{
        background-color: transparent;
        border: 0;
      }
      
   li{
    list-style: none;
   }

  
 
  
       @keyframes rotate1{
        from{
          transform: translate(-50%,-50%) rotate(0deg);  
        }
        to{
          transform: translate(-50%,-50%) rotate(360deg); 
        }
       }
 
    
 </style>

