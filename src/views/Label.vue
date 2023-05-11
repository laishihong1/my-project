<template>
   <div>
     <dv-full-screen-container>
      <!-- //header头 -->
         <el-row class="header">
           <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <div  class="title1">
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple"><dv-border-box-10 ><p>{{this.nowYear}}</p></dv-border-box-10></div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light"> <dv-decoration-11 style="width:412px;height:79px;left:18%; position: relative;font-size:50px;color:#27dae6">通讯录数字平台</dv-decoration-11> </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple"><dv-border-box-10 ><p>{{this.nowTime}}</p></dv-border-box-10></div></el-col>
                </el-row>
              </div>
              <div class="title2">
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple"><dv-decoration-6 style="width:330px;height:30px;" /></div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light" ><dv-decoration-5 style="width:400px;height:50px;left:19%; position: relative;" /></div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple"><dv-decoration-6 style="width:330px;height:30px;" /></div></el-col>
                </el-row>
              </div>
            </div>
            </el-col>
         </el-row>
       <!-- //内容区域 -->
         <el-row class="content">
              <el-col :span="6">
                <div class="grid-content bg-purple content-left">
                   <div><dv-border-box-13 style="width:100%;height:100%;"></dv-border-box-13></div>
                   <div style="height:325px;"><dv-border-box-13  style="width:100%;height:100%;"><line-table1  style="width:100%;height:100%;"></line-table1></dv-border-box-13></div>
                </div></el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light content-center">
                    <div class="numberDisplay">
                      <div><dv-border-box-11 title="当前在线统计" style="text-align:center;"><p style="position:relative;top:45%;letter-spacing:35px;text-indent:35px;">123456789</p></dv-border-box-11></div>
                    </div>
                    <div class="map">
                         <div class="map1"></div>
                         <div class="map2"></div>
                         <div class="map3"></div>
                         <div class="map4"><maps></maps></div>
                    </div>
                </div>
                </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple content-right">
                  <div ><dv-border-box-12 style="width:100%;height:100%">dv-border-box-9</dv-border-box-12></div>
                  <div ><dv-border-box-12 style="width:100%;height:100%;">dv-border-box-9</dv-border-box-12></div>
                  <div ><dv-border-box-12 style="width:100%;height:100%;">dv-border-box-9</dv-border-box-12></div>
                </div>
                </el-col>
         </el-row>


    </dv-full-screen-container>
   </div>
  
</template>
 

<script>
     import lineTable1 from '@/components/echart/Label/lineTable1'
     import maps from '@/components/echart/Label/maps'
    export default {
      
        data() {
            return {
                  nowTime: "", // 当前时间
                  nowYear: "", // 当前年份
                  dialogTableVisible: false
            };
        },
        created(){
            this.hiddenTags()
        },
        mounted() {
          this.currentTime();
          this.refresh(600);
        },
        destroyed(){
            this.$store.commit('displayTag')
        },
        methods:{
            hiddenTags(){
                 this.$store.commit('hiddenTag','label')
            },
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
              } 
          },
        beforeDestroy: function() {
           if (this.getDate) {
              console.log("销毁定时器");
              clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
       }
   },
    components:{
       maps,
       lineTable1
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
    background: url("@/utils/bg1.jpg");
    background-size: 100%;
   }
   .header{
       height: 15vh;
      
        div{
        height: 100%;
        }
      .title1{
        height: 50%;
        p{
           height: 100%;
           width: 100%;
           font-size: 440%;
           text-align:center;
           font-family:'electronicFont';
           color: #99def9;
        }
      }
      .title2{
         height: 50%;
      }
   }
   .content{
       height: 85vh;
    
       .content-left,.content-right{
         
        div{
          z-index: 1;
          position: relative;
          display: inline-block;
           width: 95%;
           height:16%;
           margin: 4px;
           padding: 0;
          
        }
       }
   }
    .el-row { 
    &:last-child {
      margin-bottom: 0;
    }
  }
   .bg-purple {

     height:100vh;
    
  }
  .bg-purple-light {
      height: 100vh;
     .numberDisplay{
       position: relative;
       top:-5%;
       height: 15%;
         div{
            position:relative;
            width: 98%;
            height: 93%;
            left:1%;
            top:3%;
            font-size: 190%;
            font-family:'electronicFont';
            color: #f4f2f2; 
          
         }
     }
     .map{
         height: 85%;
         top:-4%;
         position: relative;
         .map1{
              z-index:1;
              position: absolute;
              padding: 0;
              margin: 0;
              width: 98%;
              height: 90%;
              background: url('@/utils/map.png') 50% 10%  no-repeat;
              background-size:50% ;
              display: inline-block;
              opacity: .3;
              }
            .map2{
                display: inline-block;
                position:absolute;
                background: url('@/utils/jt.png') 50% 60%  no-repeat;
                background-size:55% ;
                display: inline-block;
                z-index: 2;
                width: 100%;
                height: 50%;
                opacity: 1;
               
                animation: rotate1 15s linear infinite reverse;
               }
    
            .map3{
                position: absolute;
                display: inline-block;
                width: 98%;
                height: 45%;
                background: url('@/utils/lbx.png') 50% 60%  no-repeat;
                background-size:62% ;
                z-index: 3;
                animation: rotate 60s linear infinite reverse;
                opacity: .4;
              }
              .map4{
                  position: absolute;
                  display: inline-block;
                  width: 98%;
                  height: 45%;
                  z-index: 5;
              }
         }
}
 
  .grid-content {
   
    min-height: 36px;
  }
  .row-bg {
   padding: 10px 0;
 
  }
  
  @keyframes rotate1 {
     from{
           
            rotate: 0deg
             
        }
     to{
       
            rotate: 360deg;
      }
  }
 
    
 </style>