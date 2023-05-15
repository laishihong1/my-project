<template>
     <!-- 轮播表格 -->
  <div class="carouseTable">
    <dv-scroll-board :config="config"/>
  </div>
</template>

<script>
export default {
  props:['AreaData'],
  data(){
    return {
      config:{
        header: ['地区','在线人数','注册人数'],
        indexHeader:'序号',
        rowNum: 23, // 表行数
        headerBGC: 'rgba(9, 16, 66)', // 表头背景色
        oddRowBGC: 'rgba(7, 140, 161)', // 奇数行背景色
        evenRowBGC: 'rgba(182, 189, 214)', // 偶数行背景色
        waitTime: 2000, // 轮播时间间隔(ms)
        align: ['center'],
        data: [],
      }
    }
  },
   mounted(){
           this.init()
         
   },
   methods:{
          init(){
                this.$axios.get('http://localhost:8080/text/lineTable1').then(res=>{
                       const data=Object.values(res.data)
                       
                       this.config.data[0]=data.map(i=>{
                        return i.province;
                       });
                      //   console.log( this.config.data[0])
                        this.config.data[1]=data.map(i=>{
                        return i.replyPeople;
                       });
                       // console.log(this.config.data[1])
                        this.config.data[2]=data.map(i=>{
                        return i.onLinePeople;
                       });
                      //  console.log( this.config.data[2])
                }) 
               // console.log(this.config.data)
          },
        fontSize:function(res){
        let docEl = document.documentElement,
        clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
        if (!clientWidth) return;
      
        let fontSize = clientWidth / 2600;
        return res * fontSize;
      }, 
      
   },
  watch:{
      AreaData(val){
      console.log(val)
      let arr = []
      if(val.length >0){
        for(let i in val){
          let code = val[i].area
          let name = val[i].name
          let num = val[i].num
          arr.push([code,name, `<div style="background:#67e0e3; white-space:nowrap; width:${num/1000}px !important">${num}</div>`])
        }
        let nowData = this.config
        nowData.data = arr
        this.config = {...nowData}
      }
    } 
  }
}
</script>
<style lang="less" scoped>
.carouseTable{
     position: absolute;
     height:3.8rem;
     width:100%;
     top:-0.1875rem;
     overflow: hidden;
      .dv-scroll-board{
    color:#333;
    /deep/ .header-item{
      font-size: .075rem;
      text-align: center;
      white-space: nowrap;
      color:#FFF !important;
    }
    .rows{
      .row-item{
        text-align: center;
        line-height: 2rem;
        .ceil{
          color:#3c3f52;
          font-size: 1em;
          i{
            font-size: 0.2em;
          }
        }
        .ceil:nth-child(2){
          color: #eb5a6d !important;
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
