// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { getAdminList, addAdmin, updateAdmin, deleteAdminById } from '@/services/admin';

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
    *addAdmin({ payload }, { call, put }) {
      const res = yield call(addAdmin, payload);
      if (res.code === 0) {
        yield put({
          type: 'addAdminSuccess',
          data: res.data,
        })

        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *updateAdmin({ payload }, { call, put }) {
      const res = yield call(updateAdmin, payload);
      if (res.code === 0) {
        yield put({
          type: 'updateAdminSuccess',
          data: payload,
        })

        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *deleteAdminById({ payload }, { call, put }) {
      const res = yield call(deleteAdminById, payload);
      if (res.code === 0) {
        yield put({
          type: 'deleteAdminByIdSuccess',
          data: payload,
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
    addAdminSuccess(state, { data }) {
      state.adminList.data.unshift(data);
      state.adminList.pagination.total += 1;
      return state;
    },
    updateAdminSuccess(state, { data }) {
      state.adminList.data.splice(data.editIndex, 1, data.record);
      return state;
    },
    deleteAdminByIdSuccess(state, { data }) {
      state.adminList.data.splice(data.index, 1);
      state.adminList.pagination.total -= 1;
      return state;
    },
  },
}
