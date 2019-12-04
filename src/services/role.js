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
 * 根据id查询角色信息
 * @param {} params
 */
export async function getRoleList() {
  return request('/role/getRoleList')
}
