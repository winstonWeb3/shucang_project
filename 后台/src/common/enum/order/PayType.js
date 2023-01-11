import Enum from '../enum'

/**
 * 枚举类：订单支付方式
 * PayTypeEnum
 */
export default new Enum([
  { key: 'BALANCE', name: '余额支付', value: 10 },
  { key: 'WECHAT', name: '微信支付', value: 20 },
	{key:'APALY',name:'支付宝支付',value:30},
	{key:'INTERGRAL',name:'积分支付',value:40}
])
