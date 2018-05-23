import LocalForage from 'localforage';

const MAX_LEN = 15
const PLAY_MAX_LEN = 30

function insertArray(arr, val, maxLen) {
  let index = 0
  console.log(typeof val, typeof val === 'object')
  if (typeof val === 'object') {
    index = arr.findIndex((a) => {
      console.log(a.id, val.id, index)
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
    console.log(searches)
    
    let s = searches

    console.log(s)

    LocalForage.setItem('searches', s).then(() => {   // 不知为何searches始终为undefined
      LocalForage.getItem('searches').then((err, searches) => {
        console.log(searches)
      })
      return searches
    })

  })
} */

export function saveSearch(query) {
  let searches = JSON.parse(localStorage.getItem('searches'))

  if (!searches) {
    searches = []
  }

  insertArray(searches, query, MAX_LEN)
  localStorage.setItem('searches', JSON.stringify(searches))

  return JSON.parse(localStorage.getItem('searches'))
}

export function loadSearch() {   // 用在state中
  return JSON.parse(localStorage.getItem('searches'))
}


export function deleteSearch(query) {
  let searches = loadSearch()
  let index = searches.indexOf(query)

  searches.splice(index, 1)

  localStorage.setItem('searches', JSON.stringify(searches))
  return JSON.parse(localStorage.getItem('searches'))
}

export function clearSearch() {
  localStorage.clear()
  return []
}

export function loadPlay() {
  return JSON.parse(localStorage.getItem('songs'))
}

export function savePlay(song) {
  let songs = loadPlay()
  if (!songs) {
    songs = []
  }

  insertArray(songs, song, PLAY_MAX_LEN)
  localStorage.setItem('songs', JSON.stringify(songs))

  return JSON.parse(localStorage.getItem('songs'))
}