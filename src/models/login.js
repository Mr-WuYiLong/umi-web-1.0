import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';

export default {
  namespace: 'login',
  state: {
    data: 'eee',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fakeAccountLogin, payload);
      // 登录成功
      if (res.code === 0) {
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
        yield put(routerRedux.replace(redirect || '/welcome'))
      }
    },
    *logout(_, { put }) {
      yield put(routerRedux.replace('/user/login'))
    },
  },
  reducers: {

  },
}
