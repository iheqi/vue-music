export const playMixin = {
  computed: {
    iconMode() {
      let iconMode = '&#xe649;'
      switch (this.mode) {
        case 1: 
          iconMode = '&#xe649;'
          break
        case 2:
          iconMode = '&#xe721;'
          break
        case 3:
          iconMode = '&#xe613;'
      }
      return iconMode
    },
  },
}