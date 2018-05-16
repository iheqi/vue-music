import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/Recommend/Recommend'
import Singer from '@/pages/Singer/Singer'
import Rank from '@/pages/Rank/Rank'
import Search from '@/pages/Search/Search'
import Detail from '@/pages/Detail/Detail'
import Disc from '@/pages/Disc/Disc'
import TopList from '@/components/top-list/TopList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'     /* 重定向 */
    }, 
    {
      path: '/recommend',
      component: Recommend,
    }, 
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: Detail
      }]
    }, 
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    }, 
    {
      path: '/search',
      component: Search,
      children: [{
        path: ':id',
        component: Detail    // 由搜索跳到歌手详情
      }]
    }, 
    {
      name: 'disc',
      path: '/disc/:id',
      component: Disc
    }
  ]
})
