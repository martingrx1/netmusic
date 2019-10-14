<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <videoTag></videoTag>
  </div>
</template>
<script>
import videoTag from './components/videoTag';
export default {
  name: "app",
  components:{
    videoTag,
  }
 
};
</script>
<style >
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  height: 100%;
}
</style>
