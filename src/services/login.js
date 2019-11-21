// import request from 'umi-request';
import request from '../utils/request'
import defaultSetting from '../../config/defaultSettings'

export async function fakeAccountLogin(params) {
  return request('/login', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 因为登录时，需要获取oauth2的token，因此设置请求头为form表单的提交
    },
    method: 'POST',
    data: { ...params, grantType: 'password', clientId: defaultSetting.oauth2.clientId, clientSecret: defaultSetting.oauth2.clientSecret },
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
