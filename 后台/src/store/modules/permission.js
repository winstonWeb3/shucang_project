import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole (roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

/**
 * 递归过滤有访问权限的路由
 * @param {*} routerMap 路由表 router.config.js
 * @param {*} roles 角色权限
 */
function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

/**
 * 根据角色获取有访问权限的路由
 * @param {*} routerMap
 * @param {*} roles
 */
function getAccessRouter (routerMap, roles) {
  // isSuper 代表超级管理员, 拥有所有权限
  // roles.isSuper = false
  // 根据角色过滤有访问权限的路由
  const accessedRouters = roles.isSuper ? routerMap : filterAsyncRouter(routerMap, roles)
  // 动态设置一级菜单的redirect
  return setPrimaryMenuRedirect(accessedRouters)
}

/**
 * 动态设置一级菜单的redirect
 * @param {*} routers
 * @param {*} roles
 */
function setPrimaryMenuRedirect (routerMap) {
  const oneList = routerMap[0].children
  oneList.forEach(oneItem => {
    // 设置二级菜单的redirect
    const twoList = oneItem.children != null ? oneItem.children : []
    twoList.forEach(twoItem => {
      const treeList = twoItem.children != null ? twoItem.children : []
      const childrenPaths = treeList.map(item => item.path)
      if (childrenPaths.length > 0) {
        if (!twoItem.redirect || childrenPaths.indexOf(twoItem.redirect) === -1) {
          twoItem.redirect = childrenPaths[0]
        }
      }
    })
    // 设置一级菜单的redirect
    const childrenPaths = oneItem.children != null ? oneItem.children.map(item => item.path) : []
    if (childrenPaths.length > 0) {
      // 如果未设置redirect, 则默认取第一个path
      // 如果设置了redirect, 判断是否有权限, 无权限则取第一个path
      if (!oneItem.redirect || childrenPaths.indexOf(oneItem.redirect) === -1) {
        oneItem.redirect = childrenPaths[0]
      }
    }
  })

  // 默认的首页
  return setIndexRedirect(routerMap)
}

/**
 * 设置默认的首页
 * @param {*} routerMap
 */
function setIndexRedirect (routerMap) {
  const root = routerMap[0]
  if (root.children && root.children.length) {
    const item = root.children[0]
    root.redirect = item.redirect != null ? item.redirect : item.path
  } else {
    root.redirect = '/404'
  }
  return routerMap
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {

    /**
     * 生成路由表
     * @param {*} param
     * @param {*} data
     */
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // 根据角色获取有访问权限的路由
        const accessedRouters = getAccessRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }

  }
}

export default permission
