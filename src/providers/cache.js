import LocalForage from 'localforage';

const MAX_LEN = 15

function insertSearchHistory(arr, val, maxLen) {
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

export function saveSearchHistory(query) {
  let searchs = JSON.parse(localStorage.getItem('searchs'))

  console.log(searchs)

  if (!searchs) {
    searchs = []
  }

  insertSearchHistory(searchs, query, MAX_LEN)

  localStorage.setItem('searchs', JSON.stringify(searchs))

  console.log(JSON.parse(localStorage.getItem('searchs')))

  return JSON.parse(localStorage.getItem('searchs'))
}