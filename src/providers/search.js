import jsonp from './jsonp'
import { ParamsModel, options } from './config'
import axios from 'axios'


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