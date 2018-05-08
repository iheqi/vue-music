import { ParamsModel, options } from './config'
import jsonp from './jsonp';
import axios from 'axios'

export function getSongLyric(mid) {
  const url = '/api/getLyric'

  //const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  const data = Object.assign({}, ParamsModel, {
    format: 'json',
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date()  // 毫秒数
  })
  
  return axios.get(url, {    // 对歌词做了referer的限制，用axios欺骗一下
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}