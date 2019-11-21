import request from '@/utils/request';

export async function getCurrentAdmin() {
  return request('/admin');
}
