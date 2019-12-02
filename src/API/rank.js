import axios from './base.js'
// 排行榜单接口
export const getRankList = () => axios.get('/vatfs/baidu_top')
//查询接口
export const getSeach = params =>
  axios.get('/vatfs/resource_site_collect/search', { params: params })
//play接口
export const getDetail = params =>
  axios.get('/vatfs/resource_site_collect/getVDetail', { params: params })
