<template>
    <div ref="echarts3" class="lineChart3">
         
    </div>
</template>

<script>
    export default {
        data() {
            return {
                month:[],
                onLinePeople:[],
                replysPeople:[],
                waitTakePeople:[],
            };
        },
        mounted(){
                this.init()
        },
        methods:{
              init(){
                this.$axios.get('http://localhost:8080/text/textInfo').then((res)=>{
                       const data=Object.values(res.data)
                       
                       this.month=data.map((i)=>{
                           return i.month
                       })
                       
                       this.onLinePeople= data.map((i) => {
                           return i.onLinePeople;
                           });
                        this.waitTakePeople= data.map((i) => {
                        return i.waitTakePeople;
                        });
                
                        this.replysPeople=data.map((i)=>{
                        return i.replyPeople;
                        })   

                            var myChart =this.$echarts.init(this.$refs.echarts3)
                             window.onresize = myChart.resize;
                             var option;
                              
                            option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                type: 'shadow'
                                }
                            },
                            legend: {
                                data: ['当月在线人数', '当月注册人数', '当月待服务处理人数']
                            },
                            toolbox: {
                                show: true,
                                orient: 'vertical',
                                left: 'right',
                                top: 'center',
                                feature: {
                                mark: { show: true },
                                dataView: { show: true, readOnly: false },
                                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                                restore: { show: true },
                                saveAsImage: { show: true }
                                }
                            },
                            xAxis: [
                                {
                                type: 'category',
                                axisTick: { show: false },
                                data: this.month
                                }
                            ],
                            yAxis: [
                                {
                                type: 'value'
                                }
                            ],
                            series: [
                                {
                                name: '当月在线人数',
                                type: 'bar',
                                barGap: 0,
                               
                                emphasis: {
                                    focus: 'series'
                                },
                                data: this.onLinePeople
                                },
                                {
                                name: '当月注册人数',
                                type: 'bar',
                                
                                emphasis: {
                                    focus: 'series'
                                },
                                data: this.replysPeople
                                },
                                {
                                name: '当月待服务处理人数',
                                type: 'bar',
                               
                                emphasis: {
                                    focus: 'series'
                                },
                                data: this.waitTakePeople
                                },
                               
                            ]
                            }; 
                            myChart.setOption(option);
              })
        }
    }
}
</script>

<style lang="less" scoped>
     .lineChart3{
             height: 330px;
             width: 100%;
   }
</style>