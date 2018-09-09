import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '@/providers/cache'

//  ES2015 的 参数解构 来简化代码，取出context中的commit方法，context相当于store。
export default {
  selectPlay,
  insertSong,
  setSearchHistory,
  deleteSearchHistory,
  clearSearchHistory,
  deleteSong,
  clearPlayList,
  setPlayHistory,
  setFavoriteList,
  deleteFavoriteList
}

function selectPlay({ commit }, { list, index }) {
  commit('setCurrentIndex', index)
  commit('setFullScreen', true)
  commit('setPlaying', true)
  commit('setPlaylist', list)
}

function insertSong({commit, state}, song) { // 搞那么多逻辑
  let playlist = state.playlist.slice() // 不要在mutation之外修改state的属性
  let currentIndex = state.currentIndex

  let index = findIndex(playlist, song) // 查找列表中是否已有待插入的歌曲，返回其索引

  currentIndex++ // 要插入的位置

  playlist.splice(currentIndex, 0, song) // 插入

  if (index > -1) { // 然后删除原有的歌曲
    if (currentIndex > index) { // 插入位置在已有待插入的歌曲的后面
      playlist.splice(index, 1)
      currentIndex--
    } else {
      playlist.splice(index + 1, 1)
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
  return list.findIndex((item) => { // ES6 findIndex参数是一个回调函数，而不是要查找的值
    return item.id === song.id
  })
}

function deleteSearchHistory({ commit, state }, query) {
  commit('setSearchHistory', deleteSearch(query))
}

function clearSearchHistory({commit}) {
  commit('setSearchHistory', clearSearch())
}

function deleteSong({commit, state}, song) {
  let playlist = state.playlist.slice() // 不要在mutation之外修改state的属性
  let currentIndex = state.currentIndex
  let index = findIndex(playlist, song)

  playlist.splice(index, 1)

  if (currentIndex > index || currentIndex === playlist.length) { // 讲得不清不楚（如果删除最后一首，且正在播放）
    currentIndex--
  }

  commit('setCurrentIndex', currentIndex)
  commit('setPlaylist', playlist)

  if (playlist.length === 0) {
    commit('setPlaying', false)
  }
}

function clearPlayList({commit}) {
  commit('setCurrentIndex', -1)
  commit('setPlaylist', [])
  commit('setPlaying', false)
}

function setPlayHistory({commit}, song) {
  commit('setPlayHistory', savePlay(song))
}

/* 收藏列表 */
function setFavoriteList({commit}, song) {
  commit('setFavoriteList', saveFavorite(song))
}

function deleteFavoriteList({commit}, song) {
  commit('setFavoriteList', deleteFavorite(song))
}
