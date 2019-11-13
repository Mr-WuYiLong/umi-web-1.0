// import request from 'umi-request';
import request from '../utils/request'

export async function fakeAccountLogin(params) {
  return request('/login', {
    method: 'post',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
