<template>
     <div>
       
     </div>
</template>

<script>
    export default {
       
       data () {
      
     },

        mounted(){
              
        },
        methods:{
            init(){
                this.$axios.get('http://localhost:8080/text/lineTable1').then(res=>{
                    //  const data=Object.values(res.data)
                    // // console.log(data)
                    // this.category=data.map((i)=>{
                    //        return i.province
                    // })
                    //   console.log(this.category)
                    // this.lineData=data.map((i)=>{
                    //        return i.totalPeople
                    // })
                    //    console.log(this.lineData)
                    // this.barData=data.map((i)=>{
                    //        return i.onLinePeople+i.replyPeople
                    // })
                    //   console.log(this.barData)
                  
                })
            },
          
        }
    }
</script>

<style lang="less" scoped>
       .dv-scroll-board{
        width:295px;height:313px;left:2px;top:2px;
       }
</style>