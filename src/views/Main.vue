<template>
    <div>
<el-container>
           <el-aside style="width:auto height:100vh"><commom-aside/></el-aside>
    <el-container>
        <el-header><commom-header/></el-header>
          <common-tag></common-tag>
        <el-main><router-view></router-view></el-main>
    </el-container>
</el-container>
    </div>
</template>
 
<script>
import CommomAside from "../components/CommomAside.vue"
import CommomHeader from "../components/CommomHeader.vue"
import commonTag from '@/components/commonTag'
    export default {
        data() {
            return {
                property: 'value',
            };
        },
        components: {
            CommomAside,
            CommomHeader,
            commonTag
        }
    }
</script>
<style lang="less" scoped>
    
    .el-container{
        height: 100vh;
    }
     .el-header{
        padding: 0;
    }.el-main{
        padding: 0;
    }
</style>

