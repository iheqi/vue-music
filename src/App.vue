<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/MHeader'
import Tab from './components/tab/Tab'
import Player from '@/pages/Player/Player'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>

</style>
