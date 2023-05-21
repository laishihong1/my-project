<template>
  <div style="carouseTable">
     <dv-scroll-board :config="config" style="width:100%;height:240px; font-size:10px; " />
  </div>
</template>

<script>
  export default {
         data() {
          return {
             onlineSort:[],
             config:{
                header: [
                  '<span style="font-size:10px;text-align:center">城市</span>',
                  '<span style="font-size:10px;text-align:center">在线人数</span>',
                  '<span style="font-size:10px;text-align:center">注册人数</span>',
                  '<span style="font-size:10px;text-align:center">总人数</span>',
                  ],
                data:[],
                index: true,
                indexHeader:'<span style="font-size:10px;text-align:center">序号</span>',
                columnWidth: [55],
                align: ['left'],
                headerHeight:[20],
               
                headerBGC: '', // 表头背景色
                oddRowBGC: '', // 奇数行背景色
                evenRowBGC:'', // 偶数行背景色
            },
          };
         },
      methods:{
            init(){
                  this.$axios.get("http://localhost:8080/text/lineTable1").then(res=>{
                        let array=Object.values(res.data)
                        for (const i in array) {
                          this.config.data[i]=array[i]
                        }

                        this.rate()
                        this.Area(this.config.data)
                  })
            },
            Area:function(val){
               let arr = []
      if(val.length >0){
        for(let i in val){
          let code = val[i].province
          let name = val[i].onLinePeople
          let num = val[i].replyPeople
          let total=val[i].totalPeople
          arr.push([
            '<span style="font-size:10px;line-height:10px;text-align:center">'+code+'</span>',
            '<span style="font-size:10px;line-height:10px;text-align:center">'+name+'</span>',
            '<span style="font-size:10px;line-height:10px;text-align:center">'+num+'</span>',
            '<span style="font-size:10px;line-height:10px;text-align:center">'+total+'</span>',
          ])
        }
            let nowData = this.config
        nowData.data = arr
        this.config = {...nowData}
    }
  },
   rate:function(){

          for(var i=0;i<this.config.data.length;i++){
             this.onlineSort[i]=Math.ceil((this.config.data[i].onLinePeople+this.config.data[i].replyPeople)/this.config.data[i].totalPeople*100);
          }

           for(var j=0;j<this.config.data.length;j++){
            for(var k=j;k>0;k--){
                if(this.onlineSort[k]<this.onlineSort[k-1]){

                     var temps=this.config.data[k];
                     this.config.data[k]=this.config.data[k-1];
                     this.config.data[k-1]=temps;
                }
            }
           }          
       },

       
      },
      mounted(){
            this.init()
      }
  }
</script>

<style lang="less" scoped>
               .carouseTable{
                   width: 100%;
                   
                  .dv-scroll-board{
    color:#333;
    /deep/ .header-item{
      font-size: 1em;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
     // color:#FFF !important;
    }
    .rows{
      .row-item{
        text-align: center;
        line-height: 2rem;
        .ceil{
          color:#3c3f52;
          font-size: 1em;
          i{
            font-size: 0.5em;
          }
        }
        .ceil:nth-child(2){
         // color: #eb5a6d !important;
          font-size: 1.1em;
          width: 25%;
        }
      }
    }
  }
  .test{
    width: 10px;
    background-size: 10% 10%;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
     background: #eb5a6d;
  }

               }  

</style>