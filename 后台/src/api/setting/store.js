import { axios } from '@/utils/request'

/**
 * api接口列表
 */
const api = {
  detail: '/setting/detail',
  update: '/setting/update',
  boxInt: '/Store/drawBoxint',
  getKf:'/Setting/chakeAbout',
  setKf:'/Setting/aboutUsValue',
  getIntergral:'/Store/seleIntegrals',
  getAir:'/Store/getAirdrop',
  setAir:'/Store/setAirdrop',
  getGive:'/Store/chaGiveDay',
  setGive:'/Store/dayUp',
  getBlind:'/Goods/getBoxMoney',
  setBlind:'/Goods/setBoxMoney',
	getPoster:'/setting/detail&key=poster',
	getBox:'/setting/detail&key=box',
	blind:'/setting/detail&key=box_bg',
	getSetting:'/setting/detail&key=setting',
	getList:'/goods/allList',
	getsyNum: '/goods/chakDebrisSum'
}

// 获取设置的合成数量

export function getsyNum (key) {
  return axios({
    url: api.getsyNum,
    method: 'post',
    data: { 'goods_id': key.goods_id }
  })
}

/**
 * 获取积分海报
 */
export function getPoster (key) {
  return axios({
    url: api.getPoster,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取盲盒图片
 */
export function blind (key) {
  return axios({
    url: api.blind,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取全部商品
 */
export function getList (key) {
  return axios({
    url: api.getList,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取积分海报
 */
export function getBox (key) {
  return axios({
    url: api.getBox,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取分销设置
 */
export function getSetting (key) {
  return axios({
    url: api.getSetting,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取盲盒价钱设置
 */
export function getBlind (key) {
  return axios({
    url: api.getBlind,
    method: 'get',
    params: { key }
  })
}
/**
 * 更盲盒价钱设置
 * @param {*} data
 */
export function setBlind (data) {
  return axios({
    url: api.setBlind,
    method: 'post',
    data: {...data }
  })
}
/**
 * 获取转赠设置
 */
export function getGive (key) {
  return axios({
    url: api.getGive,
    method: 'get',
    params: { key }
  })
}
/**
 * 更新转赠设置
 * @param {*} data
 */
export function setGive (data) {
  return axios({
    url: api.setGive,
    method: 'post',
    data: {...data }
  })
}
/**
 * 获取设置
 */
export function detail (key) {
  return axios({
    url: api.detail,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取积分设置
 */
export function getIntergral (key) {
  return axios({
    url: api.getIntergral,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取空投设置
 */
export function getAir (key) {
  return axios({
    url: api.getAir,
    method: 'get',
    params: { key }
  })
}
/**
 * 获取设置
 */
export function getKf (key) {
  return axios({
    url: api.getKf,
    method: 'get',
    params: { key }
  })
}
/**
 * 更新设置
 * @param {*} data
 */
export function update (key, data) {
  return axios({
    url: api.update,
    method: 'post',
    data: { key, ...data }
  })
}
/**
 * 更新设置
 * @param {*} data
 */
export function setKf (data) {
  return axios({
    url: api.setKf,
    method: 'post',
    data: {...data }
  })
}
/**
 * 更新空投设置
 * @param {*} data
 */
export function setAir (data) {
  return axios({
    url: api.setAir,
    method: 'post',
    data: {...data }
  })
}
/**
 * 积分抽盲盒
 * @param {*} data
 */
export function boxInt (data) {
  return axios({
    url: api.boxInt,
    method: 'post',
    data: {...data }
  })
}
