import request from '@/utils/request';

/**
 * 查询菜单权限管理的分页
 * @param {*} params
 */
export async function getPermissionPage(params) {
  return request('/permission/getPermissionPage', {
    params,
  })
}
/**
 * 查询访问权限管理的分页
 * @param {*} params
 */
export async function getAccessPermissionPage(params) {
  return request('/permission/getAccessPermissionPage', {
    params,
  })
}

/**
 * 添加菜单权限
 * @param {*} payload
 */
export async function addPermission(payload) {
  return request('/permission/addPermission', {
    method: 'post',
    data: payload,
  })
}
/**
 * 添加访问权限
 * @param {*} payload
 */
export async function addAccessPermission(payload) {
  return request('/permission/addAccessPermission', {
    method: 'post',
    data: payload,
  })
}

/**
 * 查询权限列表
 */
export async function getPermissionList() {
  return request('/permission/getPermissionList');
}

/**
 * 改变状态
 * @param {*} payload
 */
// export async function changeStatus(data) {
//   return request('/permission/changeStatus', {
//     method: 'put',
//     data,
//   })
// }

/**
 * 删除菜单权限
 * @param {} id
 */
export async function deletePermissionById(id) {
  return request('/permission/deletePermissionById', {
    method: 'delete',
    data: { id },
  })
}
/**
 * 删除访问权限
 * @param {} id
 */
export async function deleteAccessPermissionById(id) {
  return request('/permission/deleteAccessPermissionById', {
    method: 'delete',
    data: { id },
  })
}

/**
 * 查询菜单权限
 */
export async function getMenuPermissionList() {
  return request('/permission/getMenuPermissionList');
}
/**
 * 查询访问权限
 */
export async function getAccessPermissionList() {
  return request('/permission/getAccessPermissionList');
}

export async function autoImportAccessPermission() {
  return request('/permission/autoImportAccessPermission');
}
