<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>

    <router-link class="tab-item" tag="div" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>

    <router-link class="tab-item" tag="div" to="/rank">
      <span class="tab-link">排行</span>
    </router-link> 

    <router-link class="tab-item" tag="div" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Tab'
}
</script>
<style lang="stylus" scoped>
  @import "~styles/variables.styl"
    .tab
      display: flex
      height: .88rem
      line-height: .88rem
      font-size: $font-size-medium
      .tab-item
        flex: 1       /* 让所有弹性盒模型对象的子元素都有相同的长度 */
        text-align: center 
        .tab-link
          padding-bottom: .1rem
          color: $color-text-l
        &.router-link-active
          .tab-link
            color: $color-theme
            border-bottom: 2px solid $color-theme
</style>
