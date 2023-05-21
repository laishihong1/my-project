<template>
    <div>
        <el-row>
             <el-col :span="24"><div class="grid-content bg-purple-dark bar1" ref="bar1"></div></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
   
    data() {
        return {
                province:[],     //省份
                onlineSort:[],   //各省在线人数比率
                datas:[],
               
        }
    },
    mounted(){
        this.init()
    },
    methods:{
       init(){
        this.$axios.get("http://localhost:8080/text/lineTable1").then(res=>{
             const data = Object.values(res.data)
        
            for (const i in data) {
                 this.datas[i]=data[i]
            }
             
              //调用函数rate 计算各省份 在线人数比率
              this.rate()  
              //省份
              this.province=this.datas.map((i)=>{
                return i.province
              }) 
           
           var myChart=this.$echarts.init(this.$refs.bar1)  
           
           var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
           var option={
            grid: {
                left: -'1.25rem',
               
                right: '0%',
                bottom: '10%',
                width:'90%',
                height:'90%',
                containLabel: true
             },
             xAxis: [{
                 show: false,
             }],
             yAxis: [{
                axisTick: 'none',
                axisLine: 'none',
                offset: this.fontSize(10),
                axisLabel: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.fontSize(6),
                     }
                 },
         data: this.province
    }, {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: this.fontSize(6),
            }
        },
        data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
    }, {
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        data: [],
    }],
    series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: this.onlineSort,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: this.fontSize(7),
                    }
                }
            },
            barWidth: this.fontSize(6),
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                }
            },
            z: 2
        }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '100%',
           
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: this.fontSize(7),
            itemStyle: {
                normal: {
                    color: '#0e2147',
                    barBorderRadius: 5,
                }
            },
            z: 1
        }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '100%',
            
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            barWidth: this.fontSize(9),
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 5,
                }
            },
            z: 0
        },
        {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yAxisIndex: 2,
            symbolSize: this.fontSize(8),
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    opacity: 1,
                }
            },
            z: 2
        }
    ]
           }
           myChart.setOption(option);
           window.addEventListener("resize", () => {
           this.$echarts.resize;
      });
        })
        
       },

        rate:function(){

          for(var i=0;i<this.datas.length;i++){
             this.onlineSort[i]=Math.ceil((this.datas[i].onLinePeople+this.datas[i].replyPeople)/this.datas[i].totalPeople*100);
          }

           for(var j=0;j<this.datas.length;j++){
            for(var k=j;k>0;k--){
                if(this.onlineSort[k]<this.onlineSort[k-1]){

                     var temp=this.onlineSort[k];
                     this.onlineSort[k]=this.onlineSort[k-1];
                     this.onlineSort[k-1]=temp;

                     var temps=this.datas[k];
                     this.datas[k]=this.datas[k-1];
                     this.datas[k-1]=temps;
                }
            }
           }          
       },
    //    计算响应式屏幕占比
       fontSize:function(res){
        let docEl = document.documentElement,
            clientWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        if (!clientWidth) return;
      
        let fontSize = clientWidth / 1440;
        return res * fontSize;
      },  
    },
     beforeDestroy() {
          window.removeEventListener("resize", () => {
           this.$echarts.resize;
         })
       },
}
</script>
   
<style lang="less" scoped>
     .bar1{
        position: absolute;
        top: 0.15rem;
        
        height:3.40rem;
        width:100%;
     }
</style>

