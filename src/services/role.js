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

/**
 * 添加角色
 * @param {} payload
 */
export async function addRole(payload) {
  return request('/role/addRole', {
    method: 'post',
    data: payload,
  })
}

/**
 * 更新角色
 * @param {*} payload
 */
export async function updateRole(payload) {
  return request('/role/updateRole', {
    method: 'put',
    data: payload,
  })
}

// 删除角色
export async function deleteRoleId(payload) {
  return request('/role/deleteRoleId', {
    method: 'delete',
    data: payload,
  })
}
