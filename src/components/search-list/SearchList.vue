<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li class="search-item" v-for="item in searches" :key="item">
        <span class="text">{{ item }}</span>
        <span class="icon">
          <i class="iconfont delete">&#xe620;</i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SearchList',
  props: {
    searches: {
        type: Array,
        default() {
          return [1,2,3]
        }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"

  .search-list
    .search-item
      display : flex
      align-items : center
      height : .8rem
      overflow : hidden
      .text
        flex: 1
        color: $color-text-l
      .icon
        .delete
          font-size: $font-size-medium
          color: $color-text-d
</style>
