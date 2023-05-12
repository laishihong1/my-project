<template>
    <div class="lineTable1" ref="lineTable1"></div>
</template>
//排名Top10在线人数排名
<script>
    export default {
           data() {
            return {
                color:[],
                province:[],
                onLinePeople:[],
                replyPeople:[],
                total:[],
                sorts:[]
            };
           }, 
           mounted(){
                 this.init()
           },
           methods:{
                   init(){
                        this.$axios.get("http://localhost:8080/text/lineTable1").then(res=>{
                                 
                                const data=Object.values(res.data)
                              
                                this.province= data.map((i) => {
                                return i.province;
                                });
                                 
                                 this.onLinePeople= data.map((i) => {
                                 return i.onLinePeople;
                                 });

                                 this.replyPeople= data.map((i) => {
                                 return i.replyPeople;
                                 });
                                 
                                 this.total=data.map((i)=>{
                                     return i.totalPeople
                                 })
                                 
                                 this.color=data.map((i)=>{
                                     return i.color
                                 })

                                this.sort(this.onLinePeople,this.replyPeople)

                                console.log(this.sorts)

                                var myChart=this.$echarts.init(this.$refs.lineTable1)
                                window.onresize = myChart.resize;
                                var myColor =this.color
                                
 var myColor = ['#8aaafb']
  var option = {
 
    grid: {
        left: '12.5%',
        top: '10%',
        bottom: '-5%',
        right:'-5%',
        containLabel: true
    },
    xAxis: [{
        show: false,
    }],
    yAxis: [{
        axisTick: 'none',
        axisLine: 'none',
        offset: '27',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '10',
            }
        },
        data:this.province
    }, {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '10',
            }
        },
        data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
    }, {
        name: '在线统计TOP10',
        nameGap: '50',
        top:'-10%',
        nameTextStyle: {
            color: '#ffffff',
            fontSize: '50',
        },
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
            data: this.sorts,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '10',
                    }
                }
            },
            barWidth: 5,
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
            barGap: '-100%',
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 10,
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
            barGap: '-100%',
            left:'-10%',
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            barWidth: 13,
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
            symbolSize: 13,
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
};

                               myChart.setOption(option)
       })
    },
      sort:function(array1,array2){
          for(var i=0;i<array1.length;i++){
            this.sorts[i]=Math.ceil((array1[i]+array2[i])/this.total[i]*100)
          }
     }
    
 }
}
</script>

<style lang="less" scoped>
    
</style>