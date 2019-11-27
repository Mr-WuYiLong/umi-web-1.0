import { getAdminList } from '@/services/admin';

export default {
  namespace: 'admin',
  state: {
      adminList: {
        data: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
      },
  },
  effects: {
    *getAdminList({ params }, { call, put }) {
      const res = yield call(getAdminList, params);
      if (res.code === 0) {
        yield put({
          type: 'getAdminListSuccess',
          data: res.data,
        })
      }
    },
  },
  reducers: {
    getAdminListSuccess(state, { data }) {
      return {
        ...state,
        adminList: data,
      }
    },
  },
}
