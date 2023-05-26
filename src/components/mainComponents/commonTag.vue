<template>
    <div class="tabs ">
          <el-tag
            size="small"
            v-for="(item,index) in tags"
            :key="item.path"
            :closable="(item.name!=='home')"
            :effect="$route.name===item.name?'dark':'plain'"
            @click="changeMenu(item)"
            @close="handerChange(item,index)">
            {{ item.label }}
          </el-tag>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
         name:'commonTag',
         data() {
            return {
            };
         },
         computed:{
             ...mapState({
                tags:state=>state.tabs.tabList
             })
         },
         methods:{
            //判断标签跳转界面
             changeMenu(item){
                 this.$router.push({name:item.name})
             },
             //删除对应标签
             handerChange(item,index){
                //调用store的mutation 内的方法
                this.$store.commit('closeTag',item)
                  const length=this.tags.length-1
                 console.log(length)
                //删除之后的跳转逻辑
                if(item.name!==this.$route.name){
                    return
                }
                //表示删除最后一个标签后，页面指向对应删除标签的前一个标签对应页面
                  if(index===length){
                    this.$router.push({
                        name:this.tags[index].name
                    })
                }
                //删除除最后一条标签时，标签对应页面跳转
                else{
                    this.$router.push({
                        name:this.tags[index-1].name
                    })
                }
             }
         },
    }
</script>

<style lang="less" scoped>
     .tabs{
      
        padding: 20px;
        .el-tag{
            margin-right: 20px;
            cursor: pointer;
        }
     }
</style>