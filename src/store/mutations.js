export default {
  setSinger(state, singer) {
    state.singer = singer
  },
  setPlaying(state, flag) {
    state.playing = flag
  },
  setFullScreen(state, flag) {
    state.fullScreen = flag
  },

  setPlaylist(state, flag) {
    state.playlist = flag
  },
  setSequenceList(state, flag) {
    state.sequenceList = flag
  },
  setMode(state) {
    if (state.mode === 3) {
      state.mode = 1
      return 
    }
    state.mode++
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  }
}