<template>
    <div class="lineTable2" ref="lineTable2">
     
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
           
        this.$axios.get("http://localhost:8080/text/mockDayData").then(res=>{
              const data = Object.values(res.data)
              this.datas[0]=data.map(i=>{
                return i.time
              })
              this.datas[1]=data.map(i=>{
                return i.replyPeople
              })
              this.datas[2]=data.map(i=>{
                return i.onLinePeople
              })

          var charts = {
        unit: '人数',
        names: ['当前在线总人数', '当前注册总人数'],
        lineX: this.datas[0],
        value: [
           this.datas[1],
           this.datas[2]
        ]

    }
       
           
       
          var color = ['rgba(23, 255, 243', 'rgba(255,100,97']
var lineY = []

for (var i = 0; i < charts.names.length; i++) {
    var x = i
    if (x > color.length - 1) {
        x = color.length - 1
    }
    var dataes = {
        name: charts.names[i],
        type: 'line',
        color: color[x] + ')',
        smooth: true,
        areaStyle: {
            normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color[x] + ', 0.3)'
                }, {
                    offset: 0.8,
                    color: color[x] + ', 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 5
            }
        },
        symbol: 'circle',
        symbolSize: this.fontSize(0),
        data: charts.value[i]
    }
    lineY.push(dataes)
}

lineY[0].markLine = {
    silent: true,
    
    data: [{
        yAxis: 5000
    }, {
        yAxis: 1000
    }, {
        yAxis: 2000
    }, {
        yAxis: 3000
    }, {
        yAxis: 4000  
    }]
}

 var myChart=this.$echarts.init(this.$refs.lineTable2)  
var option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: charts.names,
        textStyle: {
            fontSize: this.fontSize(13),
            color: 'rgb(0,253,255,0.6)'
        },
        right: '4%'
    },
    grid: {
        top: '14.5%',
        left: '4%',
        right: '4%',
        bottom: '12%',
        width:'280px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: charts.lineX,
      
        axisLabel: {
            textStyle: {
                color: 'rgb(0,253,255,0.6)',
                  fontSize:this.fontSize(11),
            },
            formatter: function(params) {
                return params.split(' ')[0] + '\n' + params.split(' ')[1]
            }
        }
    },
    yAxis: {
        name: charts.unit,
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: 'rgb(0,253,255,0.6)',
                 fontSize:this.fontSize(10),
                
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgb(23,255,243,0.3)',
                
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgb(0,253,255,0.6)'
            }
        }
    },
    series: lineY
}
setInterval(() => {
    myChart.setOption({
      legend: {
        selected: {
          '当前在线总人数': true,
          '当前注册总人数': true
        }
      }
    })
    myChart.setOption({
      legend: {
        selected: {
          '当前在线总人数': true,
          '当前注册总人数': true
        }
      }
    })
},10000)

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
     .lineTable2{
        position: absolute;
        top: -0.15rem;
        height:3.40rem;
        width:6.25rem;
     }
</style>

