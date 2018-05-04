//  ES2015 的 参数解构 来简化代码，取出context中的commit方法，context相当于store。

const actions = {
  selectPlay({ commit }, { list, index }) {
    commit('setSequenceList', list)
    commit('setCurrentIndex', index)
    commit('setFullScreen', true)
    commit('setPlaying', true)
    commit('setPlaylist', list)

  }
}

export default actions

