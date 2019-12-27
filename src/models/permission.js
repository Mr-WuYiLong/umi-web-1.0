import { getPermissionPage, addPermission, getPermissionList } from '@/services/permission';


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
    permissions: [],
  },
  effects: {
    *getPermissionPage({ params }, { call, put }) {
      const res = yield call(getPermissionPage, params);
      if (res.code === 0) {
        yield put({
          type: 'getPermissionPageSuccess',
          data: res.data,
        })
      }
    },
    *addPermission({ payload }, { call, put }) {
      const res = yield call(addPermission, payload);
      if (res.code === 0) {
        yield put({
          type: 'addPermissionSuccess',
          payload,
        })

        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *getPermissionList(_, { call, put }) {
        const res = yield call(getPermissionList);
        if (res.code === 0) {
          yield put({
            type: 'getPermissionListSuccess',
            data: res.data,
          })
        }
      },
    },
  reducers: {
    getPermissionPageSuccess(state, { data }) {
      return {
        ...state,
        permissionList: data,
      }
    },
    addPermissionSuccess(state, { payload }) {
      payload.status = 0
      state.permissionList.data.unshift(payload);
      state.permissionList.pagination.total += 1;
      return state;
    },
    getPermissionListSuccess(state, { data }) {
      return {
        ...state,
        permissions: data,
      }
    },
  },
}
