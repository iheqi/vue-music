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

  setMode(state) {
    if (state.mode === 4) {
      state.mode = 1
      return
    }
    state.mode++
  },
  randomMode(state) {
    state.mode = 4
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index
    state.playing = true // 因为改变了currentSong会自动播放，所以必须设置为true
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
  },

  setFavoriteList(state, list) {
    state.favoriteList = list
  }
}