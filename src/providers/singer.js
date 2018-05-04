import josnp from './jsonp'
import { ParamsModel, options } from './config'
import jsonp from './jsonp';
import SingerModel from './SingerModel'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, ParamsModel, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, ParamsModel, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}

export function normalizeSinger(list) {
  let singers = {
    hotSingers: {
      letter: '热门',
      items: []
    }
  }
    
  list.forEach((item, index) => {
    if (index > 0 && index < 10) {
      singers.hotSingers.items.push(new SingerModel({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    }
    const key = item.Findex
    if (!singers[key]) {
      singers[key] = {
        letter: key,
        items: []
      }
    }

    singers[key].items.push(new SingerModel({
      id: item.Fsinger_mid,
      name: item.Fsinger_name
    }))
  })

  // 为了得到有序列表，我们需要处理 map
  let ret = []
  let hot = []
  for (let key in singers) {
    let val = singers[key]
    if (val.letter.match(/[a-zA-Z]/g)) {
      ret.push(val)
    } else if (val.letter === '热门') {
        hot.push(val)
    }
  }
  ret.sort((a, b) => {
    return a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
  })
  return hot.concat(ret)
}

/* 
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, ParamsModel, {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: '002J4UUk29y8BY'
  })

  return jsonp(url, data, options)
}

*/