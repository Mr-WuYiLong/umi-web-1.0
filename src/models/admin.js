import { getCurrentAdmin } from '@/services/admin';

export default {
  namespace: 'admin',
  state: {
    currentAdmin: null,
  },
  effects: {
    *getCurrentAdmin({ username }, { call, put }) {
      const res = yield call(getCurrentAdmin, username);
      if (res.code === 0) {
        yield put({
          type: 'getCurrentAdminSuccess',
          data: res.data,
        })
      }
    },
  },
  reducers: {
    getCurrentAdminSuccess(state, { data }) {
      return {
        ...state,
        currentAdmin: data,
      }
    },
  },
}
