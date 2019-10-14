import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Scroller from './components/Scroller' //注册全局组件
Vue.component('Scroller',Scroller);

import axios from 'axios'   //引入axios
Vue.prototype.axios = axios;

import ElementUI from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import 'lib-flexible/flexible' //引入flexible

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {  //路由守卫
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.islogined) { //判断用户是否登录
      next();
    } else {  //用户未登录
      alert('请先登录')
      next({  
        path: '/account'
      })
    }
  } else {  //不需要验证则直接跳转
    next();
  }
})

;
(function () {   //rem的配置 postcss
  var rem = document.createElement('script');
  rem.src = '../public/rem.js';
  document.body.appendChild(rem)
})()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')