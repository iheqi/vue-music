<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
  </div>
  
</template>
<script>

import SearchBox from '@/components/search-box/SearchBox'

export default {
  name: 'Search',
  components: {
    SearchBox
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"
    .search-box-wrapper
      margin : .4rem
</style>

