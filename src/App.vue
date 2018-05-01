<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
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

</style>
