import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getAccessTokenOverTime } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

export default {
  namespace: 'login',
  state: {

  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data, status } = yield call(fakeAccountLogin, payload);
      // 登录成功
      if (status === 200) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        // 把传过来的token的信息保存到本地
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('accessTokenExpiresAt', data.accessTokenExpiresAt);
        // 登录成功后，把用户名保存到本地
        localStorage.setItem('username', payload.username);
        yield put(routerRedux.replace(redirect || '/welcome'))
      }
    },
    *logout(_, { put }) {
      // 把本地的token和用户名，清除
      localStorage.clear();
      yield put(routerRedux.replace('/user/login'))
    },
  },
  reducers: {
    // saveCurrentAdminSuccess(state, { data }) {
    //   return {
    //     ...state,
    //     loginAdmin: data,
    //   }
    // },
  },
}
