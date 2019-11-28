// import request from 'umi-request';
import request from '../utils/request'
import defaultSetting from '../../config/defaultSettings'

const { oauth2 } = defaultSetting;
/**
 * 登录
 *
 * */
export async function fakeAccountLogin(params) {
  return request('/login/index', {
    method: 'POST',
    data: { data: { ...params, ...oauth2, grant_type: 'password' } },
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function getAccessTokenOverTime(params) {
  return request('/login/getAccessTokenOverTime', {
    method: 'GET',
    params,
  })
}
