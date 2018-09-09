import originJSONP from 'jsonp' // 导入安装的jsonp包

export default function jsonp(url, data, option) {
  url += (url.includes('?') ? '&' : '?') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var key in data) {
    let value = (data[key] === undefined) ? '' : data[key]
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : '' // 去掉最前面的&
}