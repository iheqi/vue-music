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
  setMode(state, mode) {
    state.mode = mode
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
  }
}