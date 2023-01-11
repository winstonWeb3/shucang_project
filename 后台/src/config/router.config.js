// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import * as Icons from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/**
 * 路由配置说明：
 * 建议：sider menu 请不要超过三级菜单，若超过三级菜单，则应该设计为顶部主菜单 配合左侧次级菜单
// {
//   redirect: noredirect,  //重定向
//   name: 'router-name',   //路由名称
//   hidden: true,          //可以在菜单中不展示这个路由，包括子路由。效果可以查看 other 下的路由配置。
//   meta: {
//     title: 'title',      //菜单项名称
//     icon: 'a-icon',      //菜单项图标
//     keepAlive: true,     //缓存页面
//     permission：[string]   //用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示 *（默认情况下）
//   }
// }
 **/
export const asyncRouterMap = [

  {
    path: '/',
    name: 'root',
    component: BasicLayout,
    children: [

      // 后台首页
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/Index'),
        meta: { title: '首页', keepAlive: true, icon: Icons.home, permission: ['/index'] }
      },

      // 管理员
      {
        path: '/manage',
        name: 'manage',
        component: RouteView,
        redirect: '/manage/user/index',
        meta: { title: '管理员', icon: Icons.manage, permission: ['/manage'] },
        children: [
          {
            path: '/manage/user/index',
            component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/user/Index'),
            meta: { title: '管理员列表', keepAlive: false, permission: ['/manage/user/index'] }
          },
          {
            path: '/manage/role/index',
            component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/role/Index'),
            meta: { title: '角色管理', keepAlive: false, permission: ['/manage/role/index'] }
          }
        ]
      },

      // 店铺管理
      {
        path: '/store',
        name: 'store',
        component: RouteView,
        redirect: '/store/setting',
        meta: { title: '数藏商城管理', icon: Icons.shop, permission: ['/store'] },
        children: [
          {
            path: '/store/setting',
            component: () => import(/* webpackChunkName: "store" */ '@/views/store/Setting'),
            meta: { title: '数藏商城设置', keepAlive: false, permission: ['/store/setting'] }
          },
          // {
          //   path: '/store/address/index',
          //   component: () => import(/* webpackChunkName: "store" */ '@/views/store/address/Index'),
          //   meta: { title: '地址管理', keepAlive: false, permission: ['/store/address/index'] }
          // },
          {
            path: '/page',
            component: RouteView,
            redirect: '/page/index',
            meta: { title: '首页轮播图', keepAlive: false, permission: ['/page'] },
            children: [
              {
                path: '/page/index',
                component: () => import(/* webpackChunkName: "page" */ '@/views/page/Index'),
                meta: { title: '轮播设计', keepAlive: false, permission: ['/page/index'] },
                // 访问其他页面时激活该菜单(router-link-active)
                activePath: ['/page/create', '/page/update']
              },
              // {
              //   path: '/page/create',
              //   component: () => import(/* webpackChunkName: "page" */ '@/views/page/Create'),
              //   meta: { title: '新增页面', keepAlive: false, permission: ['/page/create'] },
              //   hidden: true
              // },
              {
                path: '/page/update',
                component: () => import(/* webpackChunkName: "page" */ '@/views/page/Update'),
                meta: { title: '编辑页面', keepAlive: false, permission: ['/page/update'] },
                hidden: true
              },
              // {
              //   path: '/page/category',
              //   component: () => import(/* webpackChunkName: "page" */ '@/views/page/category/Index'),
              //   meta: { title: '分类模板', keepAlive: false, permission: ['/page/category'] }
              // }
            ]
          }
        ]
      },

      // 商品管理
      {
        path: '/goods',
        name: 'goods',
        component: RouteView,
        redirect: '/goods/index',
        meta: { title: '藏品管理', icon: Icons.goods, permission: ['/goods'] },
        children: [
          {
            path: '/goods/index',
            component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/Index'),
            meta: { title: '藏品列表', keepAlive: false, permission: ['/goods/index'] },
            // 访问其他页面时激活该菜单(router-link-active)
            activePath: ['/goods/create', '/goods/update']
          },
          {
            path: '/goods/create',
            component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/Create'),
            meta: { title: '创建藏品', keepAlive: false, permission: ['/goods/create'] },
            hidden: true
          },
          {
            path: '/goods/update',
            component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/Update'),
            meta: { title: '编辑藏品', keepAlive: false, permission: ['/goods/update'] },
            hidden: true
          },
          {
            path: '/goods/category/index',
            component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/category/Index'),
            meta: { title: '藏品分类', keepAlive: false, permission: ['/goods/category/index'] }
          },
          // {
          //   path: '/goods/spec-template/index',
          //   component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/service/Index'),
          //   meta: { title: '规格模板', keepAlive: false, permission: ['/goods/spec-template/index'] }
          // },
          // {
          //   path: '/goods/service/index',
          //   component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/service/Index'),
          //   meta: { title: '服务承诺', keepAlive: false, permission: ['/goods/service/index'] }
          // },
          // {
          //   path: '/goods/comment/index',
          //   component: () => import(/* webpackChunkName: "goods" */ '@/views/goods/comment/Index'),
          //   meta: { title: '商品评价', keepAlive: false, permission: ['/goods/comment/index'] }
          // }
        ]
      },
	  // 商品管理
	  {
	    path: '/fragments',
	    name: 'fragments',
	    component: RouteView,
	    redirect: '/fragments/index',
	    meta: { title: '稀有合成藏品', icon: Icons.goods, permission: ['/fragments'] },
	    children: [
	      {
	        path: '/fragments/index',
	        component: () => import(/* webpackChunkName: "goods" */ '@/views/fragments/Index'),
	        meta: { title: '合成藏品列表', keepAlive: false, permission: ['/fragments/index'] },
	        // 访问其他页面时激活该菜单(router-link-active)
	        activePath: ['/fragments/create', '/fragments/update']
	      },
	      {
	        path: '/fragments/create',
	        component: () => import(/* webpackChunkName: "goods" */ '@/views/fragments/Create'),
	        meta: { title: '创建合成藏品', keepAlive: false, permission: ['/fragments/create'] },
	        hidden: true
	      },
	      {
	        path: '/fragments/update',
	        component: () => import(/* webpackChunkName: "goods" */ '@/views/fragments/Update'),
	        meta: { title: '编辑藏品', keepAlive: false, permission: ['/fragments/update'] },
	        hidden: true
	      },
	      {
	        path: '/fragments/category/index',
	        component: () => import(/* webpackChunkName: "goods" */ '@/views/fragments/category/Index'),
	        meta: { title: '合成等级分类', keepAlive: false, permission: ['/fragments/category/index'] }
	      },
	    ]
	  },
			//盲盒管理
			{
				path: '/blind',
				name: 'blind',
				component: RouteView,
				redirect: '/blind/index',
				meta: { title: '盲盒管理', icon: Icons.content, permission: ['/blind'] },
				children: [
					{
					  path: '/blind/index',
					  component: () => import(/* webpackChunkName: "goods" */ '@/views/blind/Index'),
					  meta: { title: '盲盒列表', keepAlive: false, permission: ['/blind/index'] },
					  // 访问其他页面时激活该菜单(router-link-active)
					  activePath: ['/blind/create', '/blind/update']
					},
					{
					  path: '/blind/create',
					  component: () => import(/* webpackChunkName: "goods" */ '@/views/blind/Create'),
					  meta: { title: '创建盲盒', keepAlive: false, permission: ['/blind/create'] },
					  hidden: true
					},
					{
					  path: '/blind/update',
					  component: () => import(/* webpackChunkName: "goods" */ '@/views/blind/Update'),
					  meta: { title: '编辑藏品', keepAlive: false, permission: ['/blind/update'] },
					  hidden: true
					},
					{
					  path: '/blind/poster',
					  component: () => import(/* webpackChunkName: "setting" */ '@/views/blind/poster'),
					  meta: { title: '默认盲盒图片', keepAlive: false, permission: ['/blind/poster'] }
					},
				]
			},

      // 订单管理
      {
        path: '/order',
        name: 'order',
        component: RouteView,
        redirect: '/order/list/all',
        meta: { title: '订单管理', icon: Icons.order, permission: ['/order'] },
        children: [
          {
            path: '/order/list/all',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '全部订单', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/list/delivery',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '待发货', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/list/receipt',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '待收货', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/list/pay',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '待付款', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/list/complete',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '已完成', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/list/cancel',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Index'),
            meta: { title: '已取消', keepAlive: false, permission: ['/order/list/all'] }
          },
          {
            path: '/order/detail',
            component: () => import(/* webpackChunkName: "order" */ '@/views/order/Detail'),
            meta: { title: '订单详情', keepAlive: false, permission: ['/order/detail'] },
            hidden: true
          },
          // {
          //   path: '/order/refund/index',
          //   component: () => import(/* webpackChunkName: "order" */ '@/views/order/refund/Index'),
          //   meta: { title: '售后管理', keepAlive: false, permission: ['/order/refund/index'] },
          //   activePath: ['/order/refund/detail']
          // },
          // {
          //   path: '/order/refund/detail',
          //   component: () => import(/* webpackChunkName: "order" */ '@/views/order/refund/Detail'),
          //   meta: { title: '售后单详情', keepAlive: false, permission: ['/order/refund/detail'] },
          //   hidden: true
          // },
          // {
          //   path: '/order/tools',
          //   component: RouteView,
          //   meta: { title: '订单处理', keepAlive: false, permission: ['/order/tools'] },
          //   children: [
          //     {
          //       path: '/order/tools/export',
          //       component: () => import(/* webpackChunkName: "order" */ '@/views/order/tools/Export'),
          //       meta: { title: '订单导出', keepAlive: false, permission: ['/order/tools/export'] }
          //     },
          //   ]
          // },
        ]
      },

      // 会员管理
      {
        path: '/user',
        name: 'user',
        component: RouteView,
        meta: { title: '藏家管理', icon: Icons.user, permission: ['/user'] },
        children: [
          {
            path: '/user/index',
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/Index'),
            meta: { title: '藏家列表', keepAlive: false, permission: ['/user/index'] }
          },
          {
            path: '/user/grade/index',
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/grade/Index'),
            meta: { title: '会员等级', keepAlive: false, permission: ['/user/grade/index'] }
          },
			{
			  path: '/user/indexRank',
			  component: () => import(/* webpackChunkName: "user" */ '@/views/user/indexRank'),
			  meta: { title: '藏家排行榜', keepAlive: false, permission: ['/user/indexRank'] }
			},
          {
            path: '/user/balance',
            component: RouteView,
            redirect: '/user/balance/index',
            meta: { title: '余额记录', keepAlive: false, permission: ['/user/balance'] },
            children: [
              // {
              //   path: '/user/recharge/index',
              //   component: () => import(/* webpackChunkName: "content" */ '@/views/user/recharge/Index'),
              //   meta: { title: '充值记录', keepAlive: false, permission: ['/user/recharge/index'] }
              // },
              {
                path: '/user/balance/index',
                component: () => import(/* webpackChunkName: "content" */ '@/views/user/balance/Index'),
                meta: { title: '余额明细', keepAlive: false, permission: ['/user/balance/index'] }
              }
            ]
          }
        ]
      },
	  // 二级市场
	  {
	    path: '/mark',
	    name: 'mark',
	    component: RouteView,
	    meta: { title: '二级市场', icon: Icons.user, permission: ['/mark'] },
	    children: [
	      {
	        path: '/mark/index',
	        component: () => import(/* webpackChunkName: "user" */ '@/views/mark/Index'),
	        meta: { title: '市场列表', keepAlive: false, permission: ['/mark/index'] }
	      },
	      // {
	      //   path: '/user/grade/index',
	      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/grade/Index'),
	      //   meta: { title: '会员等级', keepAlive: false, permission: ['/user/grade/index'] }
	      // },
	      // {
	      //   path: '/user/balance',
	      //   component: RouteView,
	      //   redirect: '/user/balance/index',
	      //   meta: { title: '余额记录', keepAlive: false, permission: ['/user/balance'] },
	      //   children: [
	      //     // {
	      //     //   path: '/user/recharge/index',
	      //     //   component: () => import(/* webpackChunkName: "content" */ '@/views/user/recharge/Index'),
	      //     //   meta: { title: '充值记录', keepAlive: false, permission: ['/user/recharge/index'] }
	      //     // },
	      //     {
	      //       path: '/user/balance/index',
	      //       component: () => import(/* webpackChunkName: "content" */ '@/views/user/balance/Index'),
	      //       meta: { title: '余额明细', keepAlive: false, permission: ['/user/balance/index'] }
	      //     }
	      //   ]
	      // }
	    ]
	  },
	  // 提现列表
	  {
	    path: '/withdraw',
	    name: 'withdraw',
	    component: RouteView,
	    meta: { title: '提现列表', icon: Icons.user, permission: ['/withdraw'] },
	    children: [
	      {
	        path: '/withdraw/index',
	        component: () => import(/* webpackChunkName: "user" */ '@/views/withdraw/Index'),
	        meta: { title: '提现列表', keepAlive: false, permission: ['/withdraw/index'] }
	      },
	      // {
	      //   path: '/user/grade/index',
	      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/grade/Index'),
	      //   meta: { title: '会员等级', keepAlive: false, permission: ['/user/grade/index'] }
	      // },
	      // {
	      //   path: '/user/balance',
	      //   component: RouteView,
	      //   redirect: '/user/balance/index',
	      //   meta: { title: '余额记录', keepAlive: false, permission: ['/user/balance'] },
	      //   children: [
	      //     // {
	      //     //   path: '/user/recharge/index',
	      //     //   component: () => import(/* webpackChunkName: "content" */ '@/views/user/recharge/Index'),
	      //     //   meta: { title: '充值记录', keepAlive: false, permission: ['/user/recharge/index'] }
	      //     // },
	      //     {
	      //       path: '/user/balance/index',
	      //       component: () => import(/* webpackChunkName: "content" */ '@/views/user/balance/Index'),
	      //       meta: { title: '余额明细', keepAlive: false, permission: ['/user/balance/index'] }
	      //     }
	      //   ]
	      // }
	    ]
	  },
	  // 反馈管理
	  {
	    path: '/feedback',
	    name: 'feedback',
	    component: RouteView,
	    meta: { title: '用户反馈', icon: Icons.statistics, permission: ['/feedback'] },
	    children: [
	      {
	        path: '/feedback/index',
	        component: () => import(/* webpackChunkName: "user" */ '@/views/feedback/Index'),
	        meta: { title: '反馈列表', keepAlive: false, permission: ['/feedback/index'] }
	      },
	    ]
	  },

      // 内容管理
      {
        path: '/content',
        name: 'content',
        component: RouteView,
        meta: { title: '内容精选', icon: Icons.content, permission: ['/content'] },
        children: [
          {
            path: '/content/article',
            component: RouteView,
            redirect: '/content/article/index',
            meta: { title: '文章管理', keepAlive: false, permission: ['/content/article'] },
            children: [
              {
                path: '/content/article/index',
                component: () => import(/* webpackChunkName: "content" */ '@/views/content/article/Index'),
                meta: { title: '文章列表', keepAlive: false, permission: ['/content/article/index'] }
              },
              {
                path: '/content/article/category/index',
                component: () => import(/* webpackChunkName: "content" */ '@/views/content/article/category/Index'),
                meta: { title: '文章分类', keepAlive: false, permission: ['/content/article/category/index'] }
              }
            ]
          },
          // {
          //   path: '/content/files',
          //   component: RouteView,
          //   redirect: '/content/files/index',
          //   meta: { title: '文件库管理', keepAlive: false, permission: ['/content/files'] },
          //   children: [
          //     {
          //       path: '/content/files/index',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/content/files/Index'),
          //       meta: { title: '文件列表', keepAlive: false, permission: ['/content/files/index'] }
          //     },
          //     {
          //       path: '/content/files/group/index',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/content/files/group/Index'),
          //       meta: { title: '文件分组', keepAlive: false, permission: ['/content/files/group/index'] }
          //     }
          //   ]
          // },
          // {
          //   path: '/content/help/index',
          //   component: () => import(/* webpackChunkName: "content" */ '@/views/content/help/Index'),
          //   meta: { title: '帮助中心', keepAlive: false, permission: ['/content/help/index'] }
          // }
        ]
      },

      // 营销管理
      {
        path: '/market',
        name: 'market',
        component: RouteView,
        meta: { title: '积分设置', icon: Icons.market, permission: ['/market'] },
        children: [
          // {
          //   path: '/market/coupon',
          //   component: RouteView,
          //   redirect: '/market/coupon/index',
          //   meta: { title: '优惠券', keepAlive: false, permission: ['/market/coupon'] },
          //   children: [
          //     {
          //       path: '/market/coupon/index',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/coupon/Index'),
          //       meta: { title: '优惠券列表', keepAlive: false, permission: ['/market/coupon/index'] },
          //       // 访问其他页面时激活该菜单(router-link-active)
          //       activePath: ['/market/coupon/create', '/market/coupon/update']
          //     },
          //     {
          //       path: '/market/coupon/create',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/coupon/Create'),
          //       meta: { title: '创建优惠券', keepAlive: false, permission: ['/market/coupon/create'] },
          //       hidden: true
          //     },
          //     {
          //       path: '/market/coupon/update',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/coupon/Update'),
          //       meta: { title: '编辑优惠券', keepAlive: false, permission: ['/market/coupon/update'] },
          //       hidden: true
          //     },
          //     {
          //       path: '/market/coupon/receive/index',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/coupon/Receive'),
          //       meta: { title: '领券记录', keepAlive: false, permission: ['/market/coupon/receive/index'] }
          //     }
          //   ]
          // },
          // {
          //   path: '/market/recharge',
          //   component: RouteView,
          //   redirect: '/market/recharge/plan/index',
          //   meta: { title: '会员充值', keepAlive: false, permission: ['/market/recharge'] },
          //   children: [
          //     {
          //       path: '/market/recharge/plan/index',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/recharge/plan/Index'),
          //       meta: { title: '充值套餐', keepAlive: false, permission: ['/market/recharge/plan/index'] }
          //     },
          //     {
          //       path: '/market/recharge/setting',
          //       component: () => import(/* webpackChunkName: "market" */ '@/views/market/recharge/Setting'),
          //       meta: { title: '充值设置', keepAlive: false, permission: ['/market/recharge/setting'] }
          //     }
          //   ]
          // },
          {
            path: '/market/points',
            component: RouteView,
            redirect: '/market/points/setting',
            meta: { title: '积分管理', keepAlive: false, permission: ['/market/points'] },
            children: [
              {
                path: '/market/points/setting',
                component: () => import(/* webpackChunkName: "market" */ '@/views/market/points/Setting'),
                meta: { title: '积分设置', keepAlive: false, permission: ['/market/points/setting'] }
              },
              {
                path: '/market/points/log',
                component: () => import(/* webpackChunkName: "market" */ '@/views/market/points/Log'),
                meta: { title: '积分明细', keepAlive: false, permission: ['/market/points/log'] }
              }
            ]
          },
          // {
          //   path: '/market/full-free',
          //   component: () => import(/* webpackChunkName: "market" */ '@/views/market/FullFree'),
          //   meta: { title: '满额包邮', keepAlive: false, permission: ['/market/full-free'] }
          // }
        ]
      },

      // 数据统计
      // {
      //   path: '/statistics',
      //   name: 'statistics',
      //   component: () => import(/* webpackChunkName: "statistics" */ '@/views/statistics/Index'),
      //   meta: { title: '数据统计', keepAlive: true, icon: Icons.statistics, permission: ['/statistics'] }
      // },

      // 客户端
		  // {
		  //   path: '/client',
		  //   name: 'client',
		  //   component: RouteView,
		  //   meta: { title: '客户端', keepAlive: true, icon: Icons.mpweixin, iconStyle: { fontSize: '17.2px', color: '#36b313' }, permission: ['/client'] },
		  //   children: [
		  //     {
		  //       path: '/client/register',
		  //       component: () => import(/* webpackChunkName: "client" */ '@/views/client/Register'),
		  //       meta: { title: '注册设置', keepAlive: false, permission: ['/client/register'] }
		  //     },
		  //     // {
		  //     //   path: '/client/wxapp',
		  //     //   component: RouteView,
		  //     //   redirect: '/client/wxapp/setting',
		  //     //   meta: { title: '微信小程序', keepAlive: false, permission: ['/client/wxapp'] },
		  //     //   children: [
		  //     //     {
		  //     //       path: '/client/wxapp/setting',
		  //     //       component: () => import(/* webpackChunkName: "client" */ '@/views/client/wxapp/Setting'),
		  //     //       meta: { title: '小程序设置', keepAlive: false, permission: ['/client/wxapp/setting'] }
		  //     //     }
		  //     //   ]
		  //     // },
		  //     {
		  //       path: '/client/h5',
		  //       component: RouteView,
		  //       redirect: '/client/h5/setting',
		  //       meta: { title: 'H5端', keepAlive: false, permission: ['/client/h5'] },
		  //       children: [
		  //         {
		  //           path: '/client/h5/setting',
		  //           component: () => import(/* webpackChunkName: "client" */ '@/views/client/h5/Setting'),
		  //           meta: { title: '站点设置', keepAlive: false, permission: ['/client/h5/setting'] }
		  //         }
		  //       ]
		  //     },
		  //   ]
		  // },

      // 设置
      {
        path: '/setting',
        name: 'setting',
        component: RouteView,
        redirect: '/setting/store/basic',
        meta: { title: '设置', icon: Icons.setting, permission: ['/setting'] },
        children: [
          // {
          //   path: '/setting/trade',
          //   component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/Trade'),
          //   meta: { title: '交易设置', keepAlive: false, permission: ['/setting/trade'] }
          // },
          {
            path: '/setting/storage',
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/Storage'),
            meta: { title: '上传设置', keepAlive: false, permission: ['/setting/storage'] }
          },
          {
            path: '/setting/sms',
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/Sms'),
            meta: { title: '短信通知', keepAlive: false, permission: ['/setting/sms'] }
          },
		  {
		    path: '/setting/aridrop',
		    component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/aridrop'),
		    meta: { title: '空投设置', keepAlive: false, permission: ['/setting/aridrop'] }
		  },
		  {
		    path: '/setting/give',
		    component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/give'),
		    meta: { title: '转赠时间', keepAlive: false, permission: ['/setting/give'] }
		  },
		  {
		    path: '/setting/blind',
		    component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/blind'),
		    meta: { title: '产品设置', keepAlive: false, permission: ['/setting/blind'] }
		  },
			{
			  path: '/setting/service',
			  component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/service'),
			  meta: { title: '客服设置', keepAlive: false, permission: ['/setting/service'] }
			},
			{
			  path: '/setting/distribution',
			  component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/distribution'),
			  meta: { title: '分销/优先购', keepAlive: false, permission: ['/setting/distribution'] }
			},
			{
			  path: '/setting/mark',
			  component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/mark'),
			  meta: { title: '二级市场', keepAlive: false, permission: ['/setting/mark'] }
			},
			{
			  path: '/setting/sale',
			  component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/sale'),
			  meta: { title: '转赠功能', keepAlive: false, permission: ['/setting/sale'] }
			},
			{
			  path: '/setting/invitePoster',
			  component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/invitePoster'),
			  meta: { title: '邀请海报', keepAlive: false, permission: ['/setting/invitePoster'] }
			},
          // {
          //   path: '/setting/delivery',
          //   component: RouteView,
          //   redirect: '/setting/delivery/setting',
          //   meta: { title: '配送设置', keepAlive: false, permission: ['/setting/delivery'] },
          //   children: [
          //     {
          //       path: '/setting/delivery/setting',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/setting/delivery/Setting'),
          //       meta: { title: '配送方式', keepAlive: false, permission: ['/setting/delivery/setting'] }
          //     },
          //     {
          //       path: '/setting/delivery/template/index',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/setting/delivery/template/Index'),
          //       meta: { title: '运费模板', keepAlive: false, permission: ['/setting/delivery/template/index'] },
          //       // 访问其他页面时激活该菜单(router-link-active)
          //       activePath: ['/setting/delivery/template/create', '/setting/delivery/template/update']
          //     },
          //     {
          //       path: '/setting/delivery/template/create',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/setting/delivery/template/Create'),
          //       meta: { title: '新增运费模板', keepAlive: false, permission: ['/setting/delivery/template/create'] },
          //       hidden: true
          //     },
          //     {
          //       path: '/setting/delivery/template/update',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/setting/delivery/template/Update'),
          //       meta: { title: '编辑运费模板', keepAlive: false, permission: ['/setting/delivery/template/update'] },
          //       hidden: true
          //     },
          //     {
          //       path: '/setting/delivery/express/index',
          //       component: () => import(/* webpackChunkName: "content" */ '@/views/setting/delivery/express/Index'),
          //       meta: { title: '物流公司', keepAlive: false, permission: ['/setting/delivery/express/index'] }
          //     }
          //   ]
          // },
          {
            path: '/setting/other',
            component: RouteView,
            redirect: '/setting/other/clear',
            meta: { title: '其他设置', keepAlive: false, permission: ['/setting/other'] },
            children: [
              {
                path: '/setting/other/clear',
                component: () => import(/* webpackChunkName: "content" */ '@/views/setting/other/Clear'),
                meta: { title: '清理缓存', keepAlive: false, permission: ['/setting/other/clear'] }
              }
            ]
          }
        ]
      }

    ]
  },

  // 更新账户信息
  {
    name: 'renew',
    path: '/manage',
    redirect: '/manage/renew',
    component: BasicLayout,
    hidden: true,
    meta: { title: '更新账户信息', keepAlive: false },
    children: [
      {
        path: 'renew',
        component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/renew')
      }
    ]
  },

  {
    path: '*', redirect: '/404', hidden: true
  }

]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [

  // 用户登录页
  {
    path: '/passport',
    component: UserLayout,
    redirect: '/passport/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "passport" */ '@/views/passport/Login')
      }
    ]
  },

  // 404页
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "exception" */ '@/views/exception/404')
  }

]
