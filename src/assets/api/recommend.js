import jsonp from '../js/jsonp'
import { ParamsModel, options } from './config'

export function getRecommendData() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, ParamsModel, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getSongList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, ParamsModel, {
    platform: 'yqq',
    uin: 0,
    hostUin: 0,
    sin: 0,
    ein: 0,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  })
  return jsonp(url, data, options)
  
}