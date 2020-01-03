// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import {
    getPermissionPage,
    addPermission,
      getPermissionList,
      changeStatus,
      deletePermissionById,
      getMenuPermissionList,

    } from '@/services/permission';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority } from '@/utils/authority';

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
    menuPermissions: [],
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
    *addPermission({ payload }, { call, put, select }) {
      const res = yield call(addPermission, payload);
      if (res.code === 0) {
        const pagination = yield select(state => state.permission.permissionList.pagination);
        // console.log('permissionList', pagination)
        yield put({
            type: 'getPermissionPage',
            params: pagination,
        })

        // 隐藏模态框
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
    *changeStatus({ payload }, { call, put }) {
      const data = {
        status: payload.status,
        id: payload.record.id,
      }
      const res = yield call(changeStatus, data);
      if (res.code === 0) {
        const authorities = JSON.parse(localStorage.getItem('antd-pro-authority'));
        // const filtArr = authorities.filter(item => item !== payload.record.code);
        if (payload.status === 1) {
          authorities.push(payload.record.code);
          setAuthority(authorities);
        } else {
          const filtArr = authorities.filter(item => item !== payload.record.code);
          setAuthority(filtArr);
        }

        reloadAuthorized();
        yield put({
          type: 'changeStatusSuccess',
          data: payload,

        })
      }
    },
    *deletePermissionById({ payload }, { call, put }) {
      const res = yield call(deletePermissionById, payload.record.id);
      if (res.code === 0) {
        yield put({
          type: 'deletePermissionByIdSuccess',
          data: payload,
        })
      }
    },
    *getMenuPermissionList(_, { call, put }) {
      const res = yield call(getMenuPermissionList);
      if (res.code === 0) {
        yield put({
          type: 'getMenuPermissionListSuccess',
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
    // addPermissionSuccess(state, { payload }) {
    //   payload.status = 0
    //   state.permissionList.data.unshift(payload);
    //   state.permissionList.pagination.total += 1;
    //   return state;
    // },
    getPermissionListSuccess(state, { data }) {
      return {
        ...state,
        permissions: data,
      }
    },
    changeStatusSuccess(state, { data }) {
      if (data.status === 1) {
        data.record.status = 0;
      } else {
        data.record.status = 1;
      }
      state.permissionList.data.splice(data.index, 1, data.record);
      return state;
    },
    deletePermissionByIdSuccess(state, { data }) {
      state.permissionList.data.splice(data.index, 1);
      return state;
    },
    getMenuPermissionListSuccess(state, { data }) {
      return {
        ...state,
        menuPermissions: data,
      }
    },
  },
}
