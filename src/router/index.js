import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/Recommend/Recommend'
import Singer from '@/pages/Singer/Singer'
import Rank from '@/pages/Rank/Rank'
import Search from '@/pages/Search/Search'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'     /* 重定向 */
    }, {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    }, {
      path: '/singer',
      name: 'Singer',
      component: Singer
    }, {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }, {
      path: '/search',
      name: 'Search',
      component: Search
  }]
})
