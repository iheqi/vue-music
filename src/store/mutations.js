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
    state.playing = true          // 因为改变了currentSong会自动播放，所以必须设置为true
  },

  setDisc(state, songs) {
    state.disc = songs
  },

  setTopList(state, topList) {
    state.topList = topList
  },

  setSearchHistory(state, history) {
    state.searchHistory = history
  },

  setPlayHistory(state, history) {
    state.playHistory = history
  }
}