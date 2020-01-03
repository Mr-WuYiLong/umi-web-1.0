import request from '@/utils/request';

/**
 * 查询权限管理的分页
 * @param {*} params
 */
export async function getPermissionPage(params) {
  return request('/permission/getPermissionPage', {
    params,
  })
}

/**
 * 添加权限
 * @param {*} payload
 */
export async function addPermission(payload) {
  return request('/permission/addPermission', {
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
export async function changeStatus(data) {
  return request('/permission/changeStatus', {
    method: 'put',
    data,
  })
}

/**
 * 删除权限
 * @param {} id
 */
export async function deletePermissionById(id) {
  return request('/permission/deletePermissionById', {
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
