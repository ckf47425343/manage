<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
import   './assets/icon/iconfont.less'
export default {
  name:'App'
}
</script>
<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #2c3e50;
}
div,body{
  padding: 0px;
  margin: 0px;

}

.iconfont{
  font-size: 14px;
  color: #409EFF;
}

.auto_img{
   display: block;
   width:100%;
   height:100%;
}
.fixed{
  position: fixed;
  left:0px;
  top:0px;
  right:0px;
  bottom:0px;
  // margin: auto;
}


</style>
