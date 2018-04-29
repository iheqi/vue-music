<template>
  <div id="app">
    <template class="header-fixed">
      <m-header></m-header>
      <tab></tab>
    </template>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/m-header/MHeader'
import Tab from './components/tab/Tab'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }, 
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
  .header-fixed
    position : fixed
    left : 0
    top : 0
</style>
