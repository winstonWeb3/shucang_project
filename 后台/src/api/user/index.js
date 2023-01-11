import { axios } from '@/utils/request'

/**
 * api接口列表
 */
const api = {
  list: '/user/list',
  detail: '/user/detail',
  recharge: '/user/recharge',
  grade: '/user/grade',
  delete: '/user/delete',
	back:'/Store/feedbackColl',
	mark:'/order/marketLog',
	balance:'/user.balance/log',
	examine:'/user.balance/examine',
	invite: 'user/list',
	rankList: '/user/rankingList'
	
}

/**
 * 排行榜列表
 */
export function rankList (params) {
  return axios({
    url: api.rankList,
    method: 'get',
	params
  })
}

/**
 * 列表记录
 */
export function list (params) {
  return axios({
    url: api.list,
    method: 'get',
    params
  })
}
/**
 * 二级市场列表记录
 */
export function mark (params) {
  return axios({
    url: api.mark,
    method: 'get',
    params
  })
}
/**
 * 二级市场列表记录
 */
export function balance (params) {
  return axios({
    url: api.balance,
    method: 'get',
    params
  })
}
/**
 * 列表记录
 */
export function back (params) {
  return axios({
    url: api.back,
    method: 'get',
    params
  })
}
/**
 * 详情记录
 */
export function detail (params) {
  return axios({
    url: api.detail,
    method: 'get',
    params
  })
}

/**
 * 会员充值
 * @param {*} data
 */
export function recharge (data) {
  return axios({
    url: api.recharge,
    method: 'post',
    data
  })
}
/**
 * 提现审核
 * @param {*} data
 */
export function examine (data) {
  return axios({
    url: api.examine,
    method: 'post',
    data
  })
}

/**
 * 修改会员等级
 * @param {*} data
 */
export function grade (data) {
  return axios({
    url: api.grade,
    method: 'post',
    data
  })
}

/**
 * 删除记录
 * @param {*} data
 */
export function deleted (data) {
  return axios({
    url: api.delete,
    method: 'post',
    data: data
  })
}

/**
 * 邀请列表
 * @param {*} data
 */
export function invite (data) {
  return axios({
    url: api.invite,
    method: 'post',
    data: data
  })
}

