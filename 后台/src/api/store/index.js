import { axios } from '@/utils/request'

const api = {
  info: '/store/info',
  update: '/Store/aboutUpColl',
	coll:'/Store/aboutUsColl',
	chekTextColl:'/Store/chekTextColl',
	upTextColl:'/Store/upTextColl',
}

/**
 * 获取当前登录的商城信息
 */
export function info (params) {
  return axios({
    url: api.info,
    method: 'get',
    params
  })
}
/**
 * 获取当前登录的商城信息
 */
export function coll (params) {
  return axios({
    url: api.coll,
    method: 'get',
    params
  })
}

/**
 * 获取 隐私政策 使用条款
 */
export function chekTextColl () {
  return axios({
    url: api.chekTextColl,
    method: 'post',
  })
}
// 修改
export function upTextColl (data) {
  return axios({
    url: api.upTextColl,
    method: 'post',
	data
  })
}

/**
 * 更新商城信息
 * @param {*} data
 */
export function update (data) {
  return axios({
    url: api.update,
    method: 'post',
    data
  })
}
