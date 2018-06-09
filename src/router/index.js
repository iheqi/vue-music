import Vue from 'vue'
import Router from 'vue-router'
/*import Recommend from '@/pages/Recommend/Recommend'*/  /* 改用懒加载 */

const Recommend = (resolve) => {
  import('@/pages/Recommend/Recommend').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('@/pages/Search/Search').then((module) => {
    resolve(module)
  })
}

const Detail = (resolve) => {
  import('@/pages/Detail/Detail').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve) => {
  import('@/pages/Disc/Disc').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('@/pages/Singer/Singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('@/pages/Rank/Rank').then((module) => {
    resolve(module)
  })
}
const User = (resolve) => {
  import('@/pages/User/User').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('@/components/top-list/TopList').then((module) => {
    resolve(module)
  })
}
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
    },
    {
      name: 'user',
      path: '/user',
      component: User
    }
  ]
})
