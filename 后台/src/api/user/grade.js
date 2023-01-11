import {
	axios
} from '@/utils/request'

/**
 * api接口列表
 */
const api = {
	list: '/user.grade/list',
	all: '/user.grade/all',
	add: '/user.grade/add',
	edit: '/user.grade/edit',
	delete: '/user.grade/delete',
	back: '/Store/feedbackColl/all',
	grade: '/reward/add',
	gradeIndex: '/reward/list',
	deletedJl:'/reward/delete',
	rewEdit:'/reward/edit',
	getPl:'/goods/airdropList',
	member: '/User/addUser',
	coll:'user/userColls'
}


/**
 * 添加会员
 * @param {*} data
 */
export function member(data) {
	return axios({
		url: api.member,
		method: 'post',
		data
	})
}

/**
 * 列表记录
 */
export function list(params) {
	return axios({
		url: api.list,
		method: 'get',
		params
	})
}
/**
 * 列表记录
 */
export function coll(params) {
	return axios({
		url: api.coll,
		method: 'get',
		params
	})
}
/**
 * 批量空投藏品
 */
export function getPl(params) {
	return axios({
		url: api.getPl,
		method: 'get',
		params
	})
}
/**
 * 奖励列表记录
 */
export function gradeIndex(params) {
	return axios({
		url: api.gradeIndex,
		method: 'get',
		params
	})
}
/**
 * 反馈列表记录
 */
export function back(params) {
	return axios({
		url: api.back,
		method: 'get',
		params
	})
}
/**
 * 全部记录
 */
export function all(params) {
	return axios({
		url: api.all,
		method: 'get',
		params
	})
}

/**
 * 新增记录
 * @param {*} data
 */
export function add(data) {
	return axios({
		url: api.add,
		method: 'post',
		data
	})
}

/**
 * 编辑奖励等级
 * @param {*} data
 */
export function rewEdit(data) {
	return axios({
		url: api.rewEdit,
		method: 'post',
		data
	})
}
/**
 * 编辑记录
 * @param {*} data
 */
export function edit(data) {
	return axios({
		url: api.edit,
		method: 'post',
		data
	})
}
/**
 * 添加奖励记录
 * @param {*} data
 */
export function grade(data) {
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
export function deleted(data) {
	return axios({
		url: api.delete,
		method: 'post',
		data: data
	})
}
/**
 * 删除记录
 * @param {*} data
 */
export function deletedJl(data) {
	return axios({
		url: api.deletedJl,
		method: 'post',
		data: data
	})
}
