<template>
  <div id="video">
       <headers>
          <template v-slot:top1><i class="el-icon-microphone"></i></template>
          <template v-slot:top2><search></search></template>
      </headers>
      <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '../components/TabBar'
import headers from '../components/Headers'
import search from '../components/Search'
export default {
    name:'video',
    components:{
        tabBar,headers,search
    }
}
</script>

<style>
#video{
    padding: 6px;
}
</style>