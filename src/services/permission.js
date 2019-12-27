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
