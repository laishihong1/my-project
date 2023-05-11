<!--这里创建一个vantajs的挂载区域-->
<template>
    <div class="vanta_area" ref="Area">
       <p style="text-align:center;color:#fff;font-size:300%;top:70%">通讯录平台</p>
    </div>
</template>


<script>
//导入vanta.js和three.js
import * as THREE from 'three'
import Birds from 'vanta/src/vanta.birds'
export default {
    mounted(){
        this.vantaEffect=Birds({
            el:this.$refs.Area,
            THREE:THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            colorMode: "lerpGradient",
            birdSize: 1.30,
            wingSpan: 24.00,
            separation: 83.00,
            alignment: 5.00,
            cohesion: 14.00
        })
    },
    beforeDestroy(){
              if(this.vantaEffect){
              this.vantaEffect.destroy()
        }
    }
}
</script>


<style lang="less" scoped>
.vanta_area {
    position: absolute;
    width:100%;
    height:100%; 
    z-index: -1; 
}
</style>
