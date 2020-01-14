import request from '@/utils/request';

/**
 * 根据名字查询管理员
 * @param {} username
 */
export async function getCurrentAdmin(username) {
  return request(`/admin/getAdmin?username=${username}`);
}

/**
 * 获得管理员的列表
 */
export async function getAdminList(params) {
  return request('/admin/getAdminList', {
    params,
  });
}

/**
 * 新增管理员
 * @param {*} payload
 */
export async function addAdmin(payload) {
  return request('/admin/addAdmin', {
    method: 'post',
    data: payload,
  });
}

/**
 * 更新管理员
 * @param {*} payload
 */
export async function updateAdmin(payload) {
  return request('/admin/updateAdmin', {
    method: 'put',
    data: payload,
  })
}

/**
 * 删除管理员
 */
export async function deleteAdminById(payload) {
  return request('/admin/deleteAdminById', {
    method: 'delete',
    data: payload,
  })
}

/**
 * 修改密码
 * @param {*} payload
 */
export async function updatePassword(payload) {
  return request('/admin/updatePassword', {
    method: 'put',
    data: payload,
  })
}
