import LocalForage from 'localforage';

const MAX_LEN = 15
const PLAY_MAX_LEN = 30
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, maxLen) {
  let index = 0
  if (typeof val === 'object') {
    index = arr.findIndex((a) => {
      return a.id === val.id
    })
    
  } else {
    index = arr.indexOf(val)
  }

  if (index === 0) {
    return 
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {   // 设置最多存储maxLen条历史
    arr.pop()
  }
}

/* export function saveSearchHistory(query) {
  LocalForage.getItem('searches').then((err, searches) => {  // 返回一个promise，回调函数两个参数为err， val
    console.log(searches)
    console.log(typeof searches)
    
    if (typeof searches === 'undefined') {
      searches = []
    }
    insertArrayHistory(searches, query, MAX_LEN)
    
    let s = searches


    LocalForage.setItem('searches', s).then(() => {   // 不知为何searches始终为undefined
      LocalForage.getItem('searches').then((err, searches) => {
      })
      return searches
    })

  })
} */

export function loadCache(key) {
  let result = JSON.parse(localStorage.getItem(key))
  if (!result) {
    result = []
  }
  return result
}

/* 搜索历史 */
export function saveSearch(query) {
  let searches = loadCache('searches')

  insertArray(searches, query, MAX_LEN)
  localStorage.setItem('searches', JSON.stringify(searches))

  return loadCache('searches')
}

export function deleteSearch(query) {
  let searches = loadCache('searches')
  let index = searches.indexOf(query)

  searches.splice(index, 1)

  localStorage.setItem('searches', JSON.stringify(searches))
  return loadCache('searches')
}

export function clearSearch() {
  localStorage.clear()
  return []
}

/* 播放历史 */

export function savePlay(song) {
  let songs = loadCache('songs')

  insertArray(songs, song, PLAY_MAX_LEN)
  localStorage.setItem('songs', JSON.stringify(songs))

  return loadCache('songs')
}

/* 收藏列表 */


export function saveFavorite(song) {
  let songs = loadCache('favorite')

  insertArray(songs, song, FAVORITE_MAX_LEN)
  localStorage.setItem('favorite', JSON.stringify(songs))
  return loadCache('favorite')
}

export function deleteFavorite(song) {
  let songs = loadCache('favorite')
  let index = songs.findIndex((s) => {
    return s.id = song.id
  })
  if (index > -1) {
    songs.splice(index, 1)
  }
  localStorage.setItem('favorite', JSON.stringify(songs))
  return loadCache('favorite')
}