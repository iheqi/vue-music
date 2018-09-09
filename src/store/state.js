import { loadCache } from '@/providers/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  mode: 1, // 1：顺序播放   2：列表循环   3：单曲循环
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadCache('searches'),
  playHistory: loadCache('songs'),
  favoriteList: loadCache('favorite')
}

export default state