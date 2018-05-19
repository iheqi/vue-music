import { saveSearch, deleteSearch, clearSearch } from '@/providers/cache'

//  ES2015 的 参数解构 来简化代码，取出context中的commit方法，context相当于store。
export default {
  selectPlay,
  insertSong,
  setSearchHistory,
  deleteSearchHistory,
  clearSearchHistory
}

function selectPlay({ commit }, { list, index }) {
  commit('setSequenceList', list)
  commit('setCurrentIndex', index)
  commit('setFullScreen', true)
  commit('setPlaying', true)
  commit('setPlaylist', list)

}

function insertSong({commit, state}, song) {  // 搞那么多逻辑
  let playlist = state.playlist.slice()      // 不要在mutation之外修改state的属性
  let currentIndex = state.currentIndex

  let currentSong = playlist[currentIndex]

  let fpIndex = findIndex(playlist, song)    // 查找列表中是否已有待插入的歌曲，返回其索引

  currentIndex++                              // 要插入的位置

  playlist.splice(currentIndex, 0, song)     // 插入

  if (fpIndex > -1) {                         // 然后删除原有的歌曲
    if (currentIndex > fpIndex) {             // 插入位置在已有待插入的歌曲的后面
      playlist.splice(fpIndex, 1) 
      currentIndex-- 
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  commit('setCurrentIndex', currentIndex)
  commit('setPlaylist', playlist)
  commit('setFullScreen', true)
  commit('setPlaying', true)

}

function setSearchHistory({ commit, state }, song) {
  commit('setSearchHistory', saveSearch(song))
}

function findIndex(list, song) {
  return list.findIndex((item) => {   // ES6 findIndex参数是一个回调函数，而不是要查找的值
    return item.id === song.id
  })
}


function deleteSearchHistory({ commit, state }, query) {
  commit('setSearchHistory', deleteSearch(query))
}

function clearSearchHistory({commit}) {
  commit('setSearchHistory', clearSearch())
}


