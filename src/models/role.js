import { getRolePage, getRoleList } from '@/services/role';

export default {
  namespace: 'role',
  state: {
    roleList: {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    },
    roles: [],
  },
  effects: {
    *getRolePage({ params }, { call, put }) {
      const res = yield call(getRolePage, params);
      if (res.code === 0) {
        yield put({
          type: 'getRolePageSuccess',
          data: res.data,
        })
      }
    },
    *getRoleList(_, { call, put }) {
      const res = yield call(getRoleList);
      if (res.code === 0) {
        yield put({
          type: 'getRoleListSuccess',
          data: res.data,
        })
      }
    },
  },
  reducers: {
    getRolePageSuccess(state, { data }) {
      return {
        ...state,
        roleList: data,
      }
    },
    getRoleListSuccess(state, { data }) {
      return {
        ...state,
        roles: data,
      }
    },
  },
}
