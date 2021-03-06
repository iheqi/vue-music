import jsonp from './jsonp'
import { ParamsModel, options } from './config'
// import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, ParamsModel, {
    g_tk: 5381,
    uin: 0,
    w: query, // 搜索数据
    p: page, // 请求的第几页
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf8',
    sem: 1,
    aggr: 0,
    perpage, // 每次请求的数据量
    n: perpage
  })

  return jsonp(url, data, options)
}