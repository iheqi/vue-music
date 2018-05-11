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