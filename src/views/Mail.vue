<template>
    <div>
      <com-management></com-management>
    </div>
</template>
 
<script>
import comManagement from '@/components/comManagement'
    export default {
        data() {
          return {
            property: 'value',
          };
        },
        components:{
          comManagement
        }
    }
</script>

<style lang="scss" scoped>

</style>