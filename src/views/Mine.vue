<template>
  <div id="mine">
    <div class="mine-content">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </div>

    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from "../components/TabBar";
import headers from "../components/Headers";
import search from "../components/Search";
export default {
  name: "mine",
  components: {
    tabBar,
    headers,
    search
  },
  data() {
    return {
      keepAlive: "main-keep-alive", //需要缓存的页面 例如首页
      transitionName: "slide-right" //初始过渡动画方向
    };
  },
  watch: {
    $route(to, from) {
      // 切换动画
      let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
      if (isBack) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
      this.$router.isBack = false;
    }
  }
};
</script>

<style lang="scss">
#mine {
  padding: 6px;
  height: 100%;
}
.mine-content {
  
  width: 100%;
  height: 100%;
  
}
.child-view {
  /* position: absolute;  */
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>