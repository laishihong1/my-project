<template>
    <div ref="echarts2" class="lineChart2">
          
    </div>
</template>

<script>
 import cookies from 'js-cookie';
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
            
                   var loginData = JSON.parse(window.localStorage.getItem('param'))
                   var Cookies=cookies.get('token')
                   var userStatistics=JSON.parse(window.localStorage.getItem('userStatistics'));

                    if(Cookies&&loginData&&userStatistics){
                     
                          const data = Object.values(userStatistics.user_statistics)
                           this.onLinePeople= data.map((i) => {
                           return i.onlinePeople;
                           });
                        this.waitTakePeople= data.map((i) => {
                        return (i.replyPeople-i.replyPassNumber) ;
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
                                  text: '扇形统计/百分率',
                                  left: 'center'
                              },
                              
                              legend: {
                                      left: 'center',
                                      top: 'bottom',
                                      data: [
                                      '本年总在线人数'+this.perTotalOnLinePeople+'%',
                                      '本年总注册人数'+this.perTotalReplyPeople+'%',
                                      '本年待服务处理人数'+this.perTotalWaitTakePeople+'%',
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
                                      { value: this.perTotalOnLinePeople, name: '本年总在线人数'+this.perTotalOnLinePeople+'%' },
                                      { value: this.perTotalReplyPeople, name:  '本年总注册人数'+this.perTotalReplyPeople+'%' },
                                      { value: this.perTotalWaitTakePeople, name:  '本年待服务处理人数'+this.perTotalWaitTakePeople+'%' },
                                  ]
                                  },
                                
                              ]
                      };
                      myChart.setOption(option);
                        myChart.setOption(option);
                        window.addEventListener("resize", () => {
                        this.$echarts.resize;
                    });
                  }
                  else{
                       this.$axios.get('http://localhost:8080/text/textInfo').then((res)=>{
                          
                          const data=Object.values(res.data)
                          
                           this.onLinePeople= data.map((i) => {
                           return i.onlinePeople;
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
                                  text: '扇形统计/百分率',
                                  left: 'center'
                              },
                             
                              legend: {
                                      left: 'center',
                                      top: 'bottom',
                                      data: [
                                      '本年总在线人数'+this.perTotalOnLinePeople+'%',
                                      '本年总注册人数'+this.perTotalReplyPeople+'%',
                                      '本年待服务处理人数'+this.perTotalWaitTakePeople+'%',
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
                                      { value: this.perTotalOnLinePeople, name: '本年总在线人数'+this.perTotalOnLinePeople+'%' },
                                      { value: this.perTotalReplyPeople, name:  '本年总注册人数'+this.perTotalReplyPeople+'%' },
                                      { value: this.perTotalWaitTakePeople, name:  '本年待服务处理人数'+this.perTotalWaitTakePeople+'%' },
                                  ]
                                  },
                                
                              ]
                      };
                      myChart.setOption(option);
                        myChart.setOption(option);
                        window.addEventListener("resize", () => {
                        this.$echarts.resize;
                    });         
                 })
                  }
       
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
      },
     
     //拿取每月对应信息
     


}, 
   computed:{
    user_statistics(){
        return this.$store.tabs.state.user_statistics
    }
   }
  
    }
</script>

<style lang="less" scoped>
   .lineChart2{
            position: relative;
            top:0.8rem;
            height: 300px;
   }
 
</style>