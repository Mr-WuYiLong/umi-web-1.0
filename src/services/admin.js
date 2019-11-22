import request from '@/utils/request';

/**
 * 根据名字查询管理员的信息
 * @param {} username
 */
export async function getCurrentAdmin(username) {
  return request(`/admin/getAdmin?username=${username}`);
}
