import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/base.styl'
import '@/assets/iconfont/iconfont.css'
import fastclick from 'fastclick'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import VueLazyload from 'vue-lazyload'
import store from './store'


Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/imgs/logo@3x.png'),
  attempt: 1
})

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
