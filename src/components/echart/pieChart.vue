<template>
    <div ref="echarts2" class="lineChart2">
          
    </div>
</template>

<script>
    export default {
         data() {
            return {
                onLinePeople:[],
                replysPeople:[],
                waitTakePeople:[],
                perTotalOnLinePeople:0,
                perTotalReplyPeople:0,
                perTotalWaitTakePeople:0,
                total:0,
            };
         },
           mounted(){
             this.init()
        },
          methods:{
            init(){
               
                 this.$axios.get('http://localhost:8080/text/textInfo').then((res)=>{
                          
                          const data=Object.values(res.data)
                          
                           this.onLinePeople= data.map((i) => {
                           return i.onLinePeople;
                           });
                        
                              this.waitTakePeople= data.map((i) => {
                             return i.waitTakePeople;
                             });
                        
                             this.replysPeople=data.map((i)=>{
                               return i.replyPeople;
                             })
                        
                              
                              this.perTotalOnLinePeople =this.estimate(this.itemTotal(this.onLinePeople),this.Total(this.itemTotal(this.onLinePeople),this.itemTotal(this.replysPeople),this.itemTotal(this.waitTakePeople)))
                            
                              this.perTotalReplyPeople = this.estimate(this.itemTotal(this.replysPeople),this.Total(this.itemTotal(this.onLinePeople),this.itemTotal(this.replysPeople),this.itemTotal(this.waitTakePeople)))
                             
                              this.perTotalWaitTakePeople = this.estimate(this.itemTotal(this.waitTakePeople),this.Total(this.itemTotal(this.onLinePeople),this.itemTotal(this.replysPeople),this.itemTotal(this.waitTakePeople)))
                             

                            var myChart =this.$echarts.init(this.$refs.echarts2)
                        
                             window.onresize = myChart.resize;
                             var option;

                option = {
                          title: {
                            text: '扇形统计',
                            left: 'center'
                        },
                         legend: {
                                left: 'center',
                                top: 'bottom',
                                data: [
                                '本年总在线人数',
                                '本年总注册人数',
                                '本年待服务处理人数',
                                ]
                            },
                             toolbox: {
                            show: true,
                            feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                            }
                        },
                          series: [
                            {
                            name: 'Radius Mode',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            itemStyle: {
                                borderRadius: 5
                            },
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                show: true
                                }
                            },
                            data: [
                                { value: this.perTotalOnLinePeople, name: '本年总在线人数' },
                                { value: this.perTotalReplyPeople, name: '本年总注册人数' },
                                { value: this.perTotalWaitTakePeople, name: '本年待服务处理人数' },
                            ]
                            },
                           
                        ]
                };
                myChart.setOption(option);
        })
    },
      itemTotal: function(array){
             this.total=0;
           Object.keys(array).forEach((item) => {
                     this.total+=array[item]
                })
                  return this.total
      },
      Total:function(item1,item2,item3){
            return item1+item2+item3
      },
      estimate:function(item,itemtotal){
         return  Math.ceil((item/ itemtotal)*100)
      }
}, 
  
    }
</script>

<style lang="less" scoped>
   .lineChart2{
             height: 300px;
             width: 100%;
   }
</style>