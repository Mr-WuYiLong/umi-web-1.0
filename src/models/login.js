import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

export default {
  namespace: 'login',
  state: {
    loginAdmin: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data, status } = yield call(fakeAccountLogin, payload);
      // 把传过来的token的信息保存到本地
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
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

        // 登录成功后，把用户名保存到本地
        localStorage.setItem('username', payload.username);
        yield put(routerRedux.replace(redirect || '/welcome'))
      }
    },
    *logout(_, { put }) {
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
