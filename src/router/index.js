import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/Recommend/Recommend'
import Singer from '@/pages/Singer/Singer'
import Rank from '@/pages/Rank/Rank'
import Search from '@/pages/Search/Search'
import Detail from '@/pages/Detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend'     /* 重定向 */
    }, {
      path: '/recommend',
      component: Recommend
    }, {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: Detail
      }]
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/search',
      component: Search
  }]
})
