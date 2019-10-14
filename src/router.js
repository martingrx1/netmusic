import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: '/find'
    },
    {
      path: '/find',
      name: 'findRouter',
      component: () => import('./views/Find')
    },

    {
      path: '/mine',
      name: 'mineRouter',
      component: () => import('./views/Mine'),
      children: [{
        path: '/mine',
        redirect: '/mine/plv'
      }, {
        path: 'pld',
        name: 'pldRouter',
        component: () => import('./components/PlaylistDetail'),
        meta: {
          requireAuth: true
        }
      }, {
        path: 'plv',
        name: 'plvRouter',
        component: () => import('./components/PlaylistView'),
        meta: {
          requireAuth: true
        }
      }],
    }, 

    {
      path: '/video',
      name: 'videoRouter',
      component: () => import('./views/Video')
    }, {
      path: '/search',
      name: 'searchRouter',
      component: () => import('./components/SearchPage')
    }, {
      path: '/player',
      name: 'playerRouter',
      component: () => import('./components/Player')
    }, {
      path: '/account',
      name: 'accountRouter',
      component: () => import('./views/Account')
    }
  ]
})