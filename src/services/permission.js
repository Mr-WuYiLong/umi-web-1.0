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
