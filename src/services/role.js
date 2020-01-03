import request from '@/utils/request';

/**
 * 查询角色的分页
 * @param {*} params
 */
export async function getRolePage(params) {
  return request('/role/getRolePage', {
    params,
  })
}

/**
 * 查询角色列表
 * @param {} params
 */
export async function getRoleList() {
  return request('/role/getRoleList')
}

/**
 * 根据id查询角色信息
 * @param {*} id
 */
export async function getRoleById(id) {
  return request('/role/getRoleById', {
    params: { id },
  })
}

/**
 * 根据角色id分配权限
 * @param {*} payload
 */
export async function assignPermissionById(payload) {
  return request('/role/assignPermissionById', {
    method: 'put',
    data: payload,
  })
}
