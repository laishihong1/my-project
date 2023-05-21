<template>
    <div>
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>

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
</template>
<script>
export default {
    name:"mainLoading"
}
</script>

<style lang="less" scoped>

body {
  text-align: center;
  background-color: #eee;
}

* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}


/* The loader container */
.loader {
  position: absolute;
  top: 40%;
  left: 50%;
  
  width: 200px;
  height: 200px;
  
  margin-top: -100px;
  margin-left: -100px;
}


/* The dot */
.loader > .dot {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  width: 160px;
  height: 100px;
  
  margin-top: -50px;
  margin-left: -80px;

  border-radius: 5px;

  background-color: #1e3f57;

  transform-style: preserve-3d;
  animation: dot1 3s cubic-bezier(.55,.3,.24,.99) infinite;
}

.loader > .dot:nth-child(2) {
  z-index: 11;
  
  width: 150px;
  height: 90px;
  
  margin-top: -45px;
  margin-left: -75px;
  
  border-radius: 3px;
  
  background-color: #3c617d;
  
  animation-name: dot2;
}

.loader > .dot:nth-child(3) {
  z-index: 12;
  
  width: 40px;
  height: 20px;
  
  margin-top: 50px;
  margin-left: -20px;
  
  border-radius: 0 0 5px 5px;
  
  background-color: #6bb2cd;
  
  animation-name: dot3;
}

@keyframes dot1 {
  3%, 97% {
    width: 160px;
    height: 100px;

    margin-top: -50px;
    margin-left: -80px;
  }
  30%, 36% {
    width: 80px;
    height: 120px;

    margin-top: -60px;
    margin-left: -40px;
  }
  63%, 69% {
    width: 40px;
    height: 80px;

    margin-top: -40px;
    margin-left: -20px;
  }
}

@keyframes dot2 {
  3%, 97% {
    width: 150px;
    height: 90px;

    margin-top: -45px;
    margin-left: -75px;
  }
  30%, 36% {
    width: 70px;
    height: 96px;

    margin-top: -48px;
    margin-left: -35px;
  }
  63%, 69% {
    width: 32px;
    height: 60px;

    margin-top: -30px;
    margin-left: -16px;
  }
}

@keyframes dot3 {
  3%, 97% {
    width: 40px;
    height: 20px;

    margin-top: 50px;
    margin-left: -20px;
  }
  30%, 36% {
    width: 8px;
    height: 8px;

    margin-top: 49px;
    margin-left: -5px;
    
    border-radius: 8px;
  }
  63%, 69% {
    width: 16px;
    height: 4px;

    margin-top: -37px;
    margin-left: -8px;
    
    border-radius: 10px;
  }
}

   .text{
      position: relative;
      top:9rem;
      text-align: center;
     // background-color: #1e3f57;
      h1 span {
            top: 20px; /*字符上下浮动*/
            position: relative;
            animation: loading 0.3s ease 0s infinite alternate; /*引用动画*/
            /* animation: 动画名称 动画时间 动画曲线 何时开始 播放次数 是否反方向; 
            alternate:表示动画先正常运行再反方向运行，并持续交替
            infinite:表示无限循环*/
            font-size: 1.1rem;
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