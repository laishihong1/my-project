<template>
  <div id="app">
        <router-view/>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
h3{
 text-align: center;
}
html,body,p{
     padding: 0;
     margin: 0;
     
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px; 
 
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #d1d4da;
  border-radius: 4px;
}










</style>
