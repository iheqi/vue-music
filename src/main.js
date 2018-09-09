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

// import '@/assets/styles/variables.styl'   这样导入全局用不了
// require('styles/variables.styl')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/imgs/logo@3x.png'),
  attempt: 1
})

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

Vue.prototype.bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
