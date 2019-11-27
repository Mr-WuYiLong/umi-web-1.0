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
