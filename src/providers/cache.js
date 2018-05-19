import LocalForage from 'localforage';

const MAX_LEN = 15

function insertSearch(arr, val, maxLen) {
  let index = arr.indexOf(val)

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
  LocalForage.getItem('searchs').then((err, searchs) => {  // 返回一个promise，回调函数两个参数为err， val
    console.log(searchs)
    console.log(typeof searchs)
    
    if (typeof searchs === 'undefined') {
      searchs = []
    }
    insertSearchHistory(searchs, query, MAX_LEN)
    console.log(searchs)
    
    let s = searchs

    console.log(s)

    LocalForage.setItem('searchs', s).then(() => {   // 不知为何searchs始终为undefined
      LocalForage.getItem('searchs').then((err, searchs) => {
        console.log(searchs)
      })
      return searchs
    })

  })
} */

export function saveSearch(query) {
  let searchs = JSON.parse(localStorage.getItem('searchs'))

  if (!searchs) {
    searchs = []
  }

  insertSearch(searchs, query, MAX_LEN)
  localStorage.setItem('searchs', JSON.stringify(searchs))

  return JSON.parse(localStorage.getItem('searchs'))
}

export function loadSearch() {   // 用在state中
  return JSON.parse(localStorage.getItem('searchs'))
}


export function deleteSearch(query) {
  let searchs = loadSearch()
  let index = searchs.indexOf(query)

  searchs.splice(index, 1)

  localStorage.setItem('searchs', JSON.stringify(searchs))
  return JSON.parse(localStorage.getItem('searchs'))
}

export function clearSearch() {
  localStorage.clear
  return []
}