<template>
<!-- 雷达图 -->
    <div>
      <div ref="makeapice" class="makepiace"></div>
    </div>
</template>


<script>
    export default {
        data() {
          return{
             data:[]
          }
        },
        mounted(){
               this.init()
        },
        methods:{
            init(){
                  
                        var myChart=this.$echarts.init(this.$refs.makeapice) 
                    this.$axios.get('http://localhost:8080/text/textequipment').then(res=>{
                          this.data=Object.values(res.data)  
                        //  console.log(this.data)
                var option={
    tooltip: {
         
    },
    legend: {
        show: true,
        icon: "circle",
        bottom: 10,
        center: 0,
        itemWidth: 7,
        itemHeight: 7,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowBlur: 15,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        // itemGap: 30,
        orient: "horizontal",
        data: ['设备使用分布'],
        textStyle: {
            fontSize: 10,
            color: '#fff'
        },
    },

    radar: {
        // shape: 'circle',
        radius: '60%',
        center: ['50%', '50%'],
        startAngle: 0,
        triggerEvent: true,
        name: {
            textStyle: {
                color: '#fff',
                fontSize: '10',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        nameGap: '2',
        indicator: [{
                name: '手机',
                max: 10000
            },
            {
                name: '智能平板',
                max: 10000
            },
            {
                name: '其它设备',
                max: 10000
            },
            {
                name: '台式电脑',
                max: 10000
            },
            {
                name: '笔记本',
                max: 10000
            },
        ],
        splitArea: {
            areaStyle: {
                color: [
                    'rgba(0,255,255, 0.1)', 'rgba(0,255,255, 0.2)',
                    'rgba(0,255,255, 0.3)', 'rgba(0,255,255, 0.4)',
                    'rgba(0,255,255, 0.5)', 'rgba(0,255,255, 0.6)',
                ].reverse(),
                shadowColor: 'rgba(0, 0, 0, 1)',
                shadowBlur: 15,
                shadowOffsetX: 5,
                shadowOffsetY: 5
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0,206,209, 0.3)'
            }
        },
        splitLine: {
            lineStyle: {
                width: 1,
                color: [
                    'rgba(0,206,209, 0.1)', 'rgba(0,206,209, 0.2)',
                    'rgba(0,206,209, 0.3)', 'rgba(0,206,209, 0.4)',
                    'rgba(0,206,209, 0.5)', 'rgba(0,206,209, 0.6)'
                ].reverse()
            }
        }

    },
    series: [{
            name: '设备使用分布',
            type: 'radar',
            areaStyle: {
                normal: {
                    color: 'rgba(127,255,210, 0.5)'
                }
            },
            symbol: 'circle',
            symbolSize: 3,
            itemStyle: {
                color: 'rgba(127,255,210,0.8)',
                borderColor: 'rgba(127,255,210,0.2)',
                borderWidth: 1,
            },
            lineStyle: {
                color: 'rgba(127,255,210, 0.6)',
                width: 2
            },
            label: {
                show: true,
            },
            data: [
               this.data
            ]
        }
    ]
            }
                myChart.setOption(option);
                     window.addEventListener("resize", () => {
                     this.$echarts.resize;
                });
    })

 
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
       .makepiace{
            position: absolute;
            top: -0.325rem;
            height:3.40rem;
            width:100%;
       }
</style>