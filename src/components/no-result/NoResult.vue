<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variables"

  .no-result
    text-align: center
    .no-result-icon
      width: 1.72rem
      height: 1.8rem
      margin: 0 auto
      background : url('~@/assets/imgs/no-result@2x.png')
      background-size: 1.72rem 1.8rem
    .no-result-text
      margin-top: .6rem
      font-size: $font-size-medium
      color: $color-text-d
</style>
