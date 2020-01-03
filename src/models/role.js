import { getRolePage, getRoleList, getRoleById, assignPermissionById } from '@/services/role';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'role',
  state: {
    roleList: { // 角色分页
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    },
    roles: [], // 角色列表
    // role: {}, // 角色
    checkedKeys: [], // 菜单权限是否选中
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
    *getRoleById({ payload }, { call, put }) {
      const res = yield call(getRoleById, payload);
      if (res.code === 0) {
       yield put({
         type: 'getRoleByIdSuccess',
         data: res.data,
       })
      }
    },
    *assignPermissionById({ payload }, { call, put }) {
      const res = yield call(assignPermissionById, payload);
      if (res.code === 0) {
        // 重新加载权限，要重新登录
        setAuthority(payload.checkedKeys);
        reloadAuthorized();
        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    // *changeMenuKeys({ payload }, { call, put }) {
    //   yield put()
    // },
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
    getRoleByIdSuccess(state, { data }) {
      return {
        ...state,
        // role: data,
        checkedKeys: data,
      }
    },
    changeMenuKeys(state, { payload }) {
      return {
        ...state,
        checkedKeys: payload,
      }
    },
    // assignPermissionByIdSuccess(state, { payload }) {
    //   // eslint-disable-next-line array-callback-return
    //   state.roleList.map(item => {
    //     if (item.id === payload.roleId) {
    //       item.codes = payload.checkedKeys
    //     }
    //   });

    //   return state;
    // },
  },
}
