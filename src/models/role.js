// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { getRolePage, getRoleList, getRoleById, assignPermissionById, addRole, updateRole, deleteRoleId } from '@/services/role';

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
    accessCodes: [], // 访问菜单权限是否选中
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
        // setAuthority(payload.checkedKeys);
        // reloadAuthorized();
        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *addRole({ payload }, { call, put }) {
      const res = yield call(addRole, payload);
      if (res.code === 0) {
        yield put({
          type: 'addRoleSuccess',
          data: res.data,
        })

        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *updateRole({ payload }, { call, put }) {
      const res = yield call(updateRole, payload);
      if (res.code === 0) {
        yield put({
          type: 'role/updateRoleSuccess',
          data: payload,
        })
        yield put({
          type: 'modal/hideModal',
        })
      }
    },
    *deleteRoleId({ payload }, { call, put }) {
      const res = yield call(deleteRoleId, payload);
      if (res.code === 0) {
        yield put({
          type: 'deleteRoleIdSuccess',
          data: payload,
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
    getRoleByIdSuccess(state, { data }) {
      return {
        ...state,
        // role: data,
        checkedKeys: data.newArr,
        accessCodes: data.accessArr,
      }
    },
    changeMenuKeys(state, { payload }) {
      return {
        ...state,
        checkedKeys: payload,
      }
    },
    changeAccessKeys(state, { payload }) {
      return {
        ...state,
        accessCodes: payload,
      }
    },
    addRoleSuccess(state, { data }) {
      state.roleList.data.unshift(data);
      state.roleList.pagination.total += 1;
      return state;
    },
    updateRoleSuccess(state, { data }) {
      state.roleList.data.splice(data.editIndex, 1, data.record);
      return state;
    },
    deleteRoleIdSuccess(state, { data }) {
      state.roleList.data.splice(data.index, 1);
      return state;
    },
  },
}
