<template>
    <div class="reigster4">
         <div><vantas-r></vantas-r></div>
         <div class="success">
              <div class="text">
             <h1>
                <!-- congratulations -->
                <span>c</span>
                <span>o</span>
                <span>n</span>
                <span>g</span>
                <span>r</span>
                <span>a</span>
                <span>t</span>
                <span>u</span>
                <span>l</span>
                <span>a</span>
                <span>t</span>
                <span>i</span>
                <span>o</span>
                <span>n</span>
                <span>s</span>
                <span>!</span>
          </h1>
        </div>
         </div>
    </div>
</template>

<script>
import vantasR from '@/utils/vantasR'
    export default {
        components:{
              vantasR
        }
    }
</script>

<style lang="less" scoped>
        .reigster4{
              position: relative;
         #vanta-r{
             width: 100%;
             height: 100%;
            
           }
          .success{
                position: relative;
                height: 16.1rem;
                .text{
      position: relative;
      top:6rem;
      text-align: center;
     // background-color: #1e3f57;
      h1 span {
            top: 20px; /*字符上下浮动*/
            position: relative;
            animation: loading 0.3s ease 0s infinite alternate; /*引用动画*/
            /* animation: 动画名称 动画时间 动画曲线 何时开始 播放次数 是否反方向; 
            alternate:表示动画先正常运行再反方向运行，并持续交替
            infinite:表示无限循环*/
            font-size: 2.4rem;
            color: rgb(117, 173, 196);
            text-shadow: 0 1px 0  #CCC,
                        0 2px 0 #CCC,
                        0 3px 0 #CCC,
                        0 4px 0 #CCC,
                        0 5px 0 #CCC,
                        0 6px 0 #CCC,
                        0 7px 0 #CCC,
                        0 8px 0 #CCC,
                        0 9px 0 #CCC,
                        0 10px 10px rgba(0, 0, 0, 0.5);
     /*text-shadow: 水平阴影位置(必须) 垂直阴影位置(必须) 模糊距离(可选) 阴影颜色(可选);
       text-shadow: h-shadow v-shadow blur color; */
        }
        h1 span:nth-child(2) { 
            animation-delay: 0.1s; 
        }
        h1 span:nth-child(3) { 
            animation-delay: 0.2s; 
        }
        h1 span:nth-child(4) { 
            animation-delay: 0.3s; 
        }
        h1 span:nth-child(5) { 
            animation-delay: 0.4s; 
        }
        h1 span:nth-child(6) { 
            animation-delay: 0.6s; 
        }
        h1 span:nth-child(7) { 
            animation-delay: 0.7s; 
        }
        h1 span:nth-child(8) { 
            animation-delay: 0.8s; 
        }
        h1 span:nth-child(9) { 
            animation-delay: 0.9s; 
        }
        h1 span:nth-child(10) { 
            animation-delay: 1.0s; 
        }
        h1 span:nth-child(11) { 
            animation-delay: 1.2s; 
        }
        h1 span:nth-child(12) { 
            animation-delay: 1.4s; 
        }
        h1 span:nth-child(13) { 
            animation-delay: 1.6s; 
        }
         h1 span:nth-child(14) { 
            animation-delay: 1.8s; 
        }
         h1 span:nth-child(15) { 
            animation-delay: 2s; 
        }
         h1 span:nth-child(16) { 
            animation-delay: 2.4s; 
        }
        @keyframes loading {  /* 定义动画*/
            100% {
                top: -20px;  /*字符上下浮动*/
                text-shadow: 0 1px 0 #CCC,
                     0 2px 0 #CCC,
                     0 3px 0 #CCC,
                     0 4px 0 #CCC,
                     0 5px 0 #CCC,
                     0 6px 0 #CCC,
                     0 7px 0 #CCC,
                     0 8px 0 #CCC,
                     0 9px 0 #CCC,
                     0 50px 25px rgba(0, 0, 0, 0.3);     
  /*上升的时候阴影要在文字下面一些，所以垂直阴影的位置坐标和模糊距离要大一些*/
            }
        }
   }
          }
        }
</style>