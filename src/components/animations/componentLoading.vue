<template>
    <div>
        <div class="cssloader">
            <div class="sh1"></div>
            <div class="sh2"></div>
            <div class="text">
             <h1>
                <span>.</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
          </h1>
        </div>
        </div>
    </div>
</template>


<style lang="less" scoped>

// @import url('https://fonts.googleapis.com/css?family=Roboto:100');
body {
  background: #eee;
}

/** page **/
.cssloader {
  padding-top: calc(45vh - 25px);
}

/** loader **/
.sh1 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px 100px 0 0;
  border-color: #8fbbd0 transparent transparent transparent;
  margin: 0 auto;
  animation: shk1 1s ease-in-out infinite normal;
}

.sh2 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 100px 100px;
  border-color: transparent  transparent #bd5574 transparent ;
  margin: -100px auto 0;
  animation: shk2 1s ease-in-out infinite alternate;
}

/** animation starts here **/
@keyframes shk1 {
  0% {
    transform: rotate(-360deg);
  }  
  
  100% {
  }
}

@keyframes shk2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
  }
}


  .text{
      position: relative;
   
      text-align: center;
     // background-color: #1e3f57;
      h1 span {
            top: 20px; /*字符上下浮动*/
            position: relative;
            animation: loading 0.3s ease 0s infinite alternate; /*引用动画*/
            /* animation: 动画名称 动画时间 动画曲线 何时开始 播放次数 是否反方向; 
            alternate:表示动画先正常运行再反方向运行，并持续交替
            infinite:表示无限循环*/
            font-size: .8rem;
            color: rgb(149, 201, 224);
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




</style>