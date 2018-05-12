import jsonp from './jsonp'
import { ParamsModel, options } from './config'
import axios from 'axios'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const query = Object.assign({}, ParamsModel, {
    g_tk: 1391294004,
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
  })

  return jsonp(url, query, options)
  
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, ParamsModel, {
    topid,
    g_tk: 162538494,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top'
  })

  return jsonp(url, data, options)
}