<template>
    <div class="columnTable4" ref="columnTable4">
     
    </div>
</template>

<script>
export default {
   
    data() {
        return {
              datas:[]
        }
    },
    mounted(){
        this.init()
    },
    methods:{
       init(){
               this.$axios.get("http://localhost:8080/text/lineTable1").then(res=>{
                         
                        const data=Object.values(res.data)
                        this.datas[0]=data.map(i=>{
                            return i.province
                         })
                        this.datas[1]=data.map(i=>{
                            return i.replyPeople
                         })
                        this.datas[2]=data.map(i=>{
                            return i.onLinePeople
                         })
                        this.datas[3]=data.map(i=>{
                            return i.totalPeople
                         })

                        var myChart=this.$echarts.init(this.$refs.columnTable4)  
                        var option = {
                              tooltip: {
                              trigger: 'axis',
                              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '2%',
                                right: '4%',
                                bottom: '14%',
                                top:'20%',
                                width:'310px',
                                containLabel: true
                            },
                              legend: {
                                data: ['在线人数', '注册人数', '总人数'],
                                right: 100,
                                top:12,
                                textStyle: {
                                    color: "#fff"
                                },
                                itemWidth: 12,
                                itemHeight: 10,
                                // itemGap: 35
                            },
                                xAxis: {
                                type: 'category',
                                data: this.datas[0],
                                axisLine: {
                                    
                                    lineStyle: {
                                    color: 'white',
                                    },
                                     
                                },
                                axisLabel: {
                                    // interval: 0,
                                    // rotate: 40,
                                    textStyle: {
                                    fontFamily: 'Microsoft YaHei',
                                    fontSize:'10'
                                    }
                                },
                                },
                                  yAxis: {
                                    type: 'value',
                                    max:'100000',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                        color: 'white'
                                        }
                                    },
                                    splitLine: {
                                        show: true,
                                        lineStyle: {
                                        color: 'rgba(255,255,255,0.3)'
                                        }
                                    },
                                    axisLabel: {}
                                    },
                                      "dataZoom": [{
                                        "show": true,
                                        "height": 12,
                                        "xAxisIndex": [
                                            0
                                        ],
                                        bottom:'8%',
                                        "start": 10,
                                        "end": 90,
                                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                                        handleSize: '40%',  //柱形图间距
                                        handleStyle:{
                                            color:"#d3dee5",

                                        },
                                        textStyle:{
                                            color:"#fff"},
                                        borderColor:"#90979c"
                                        }, {
                                        "type": "inside",
                                        "show": true,
                                        "height": 15,
                                        "start": 1,
                                        "end": 35
                                        }],
                                           series: [{
                                            name: '1',
                                            type: 'bar',
                                            barWidth: '15%',
                                            itemStyle: {
                                                normal: {
                                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: '#fccb05'
                                                    }, {
                                                        offset: 1,
                                                        color: '#f5804d'
                                                    }]),
                                                    barBorderRadius: 12,
                                                },
                                            },
                                            data: this.datas[1]
                                            },
                                            {
                                            name: '2',
                                            type: 'bar',
                                            barWidth: '15%',
                                            itemStyle: {
                                                normal: {
                                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: '#8bd46e'
                                                    }, {
                                                        offset: 1,
                                                        color: '#09bcb7'
                                                    }]),
                                                    barBorderRadius: 11,
                                                }
                                                
                                            },
                                            data: this.datas[2]
                                            },
                                            {
                                            name: '3',
                                            type: 'bar',
                                            barWidth: '15%',
                                            itemStyle: {
                                                normal: {
                                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                        offset: 0,
                                                        color: '#248ff7'
                                                    }, {
                                                        offset: 1,
                                                        color: '#6851f1'
                                                    }]),
                                                barBorderRadius: 11,
                                                }
                                            },
                                            data: this.datas[3]
                                            }]
                        } ;
                          var app = {
                            currentIndex: -1,
                        };
                        setInterval(function () {
                            var dataLen = option.series[0].data.length;

                            // 取消之前高亮的图形
                            myChart.dispatchAction({
                            type: 'downplay',
                            seriesIndex: 0,
                            dataIndex: app.currentIndex
                            });
                            app.currentIndex = (app.currentIndex + 1) % dataLen;
                            //console.log(app.currentIndex);
                            // 高亮当前图形
                            myChart.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: app.currentIndex,
                            });
                            // 显示 tooltip
                            myChart.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: app.currentIndex
                            });
                        }, 1000);
                        myChart.setOption(option);
                        window.addEventListener("resize", () => {
                        this.$echarts.resize;
                      });  
               })
             
       },
 
        //    计算响应式屏幕占比
            fontSize:function(res){
            let docEl = document.documentElement,
                clientWidth =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            if (!clientWidth) return;
        
            let fontSize = clientWidth / 3440;
            return res * fontSize;

      },
    },

     beforeDestroy() {
          window.removeEventListener("resize", () => {
           this.$echarts.resize;
         })
       }
}
</script>
   
<style lang="less" scoped>
     .columnTable4{
        position: absolute;
        top: -0.35rem;
        height:3.40rem;
        width:7rem;
     }
</style>

