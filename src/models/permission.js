import { getPermissionPage } from '@/services/permission';

export default {
  namespace: 'permission',
  state: {
    permissionList: {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    },
  },
  effects: {
    *getPermissionPage({ params }, { call, put }) {
      const res = yield call(getPermissionPage, params);
      if (res.code === 0) {
        yield put({
          type: 'getRolePageSuccess',
          data: res.data,
        })
      }
    },
  },
  reducers: {
    getPermissionPageSuccess(state, data) {
      return {
        ...state,
        permissionList: data,
      }
    },
  },
}
