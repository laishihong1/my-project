<template>
    <div ref="echarts1" class="lineChart1">
    </div>
</template>

<script>
    export default {
        name:'lineChart',
        data() {
            return {
                month:[],
                onLinePeople:[],
                replysPeople:[],
                waitTakePeople:[]
            };
        },
        mounted(){
             this.init()
        },

        methods:{
            init(){
               
                 this.$axios.get('http://localhost:8080/text/textInfo').then((res)=>{
                          
                          const data=Object.values(res.data)
                       
                         this.month= data.map((i) => {
                           return i.month;
                           });
                        
                           this.onLinePeople= data.map((i) => {
                           return i.onLinePeople;
                           });
                        
                           this.waitTakePeople= data.map((i) => {
                           return i.waitTakePeople;
                           });
                          

                           this.replysPeople=data.map((i)=>{
                             return i.replyPeople;
                           })
                     
                          
                            var myChart =this.$echarts.init(this.$refs.echarts1)
                  
                 var option;

                option = {
                title: {
                    text: '数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [ '在线人数', '注册人数', '待服务处理人数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:this.month
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: '在线人数',
                    type: 'line',
                    stack: 'Total',
                    data: this.onLinePeople
                    },
                    {
                    name: '注册人数',
                    type: 'line',
                    stack: 'Total',
                    data: this.replysPeople
                    },
                    {
                    name: '待服务处理人数',
                    type: 'line',
                    stack: 'Total',
                    data: this.waitTakePeople
                    },
                    
                ]
                };
                myChart.setOption(option);
                window.onresize = myChart.resize;
                  })
                

    }
}

}
        
</script>
<style lang="less" scoped>
   .lineChart1{
             height: 100%;
             width: 100%;
        }
</style>
