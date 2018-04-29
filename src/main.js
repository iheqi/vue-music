import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/base.styl'
import fastclick from 'fastclick'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
