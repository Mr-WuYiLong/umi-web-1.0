
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Row, Modal, Col, Tag } from 'antd';
import SearchForm from '@/components/SearchForm';
import { connect } from 'dva';
import columns from './_table';
import searchItem from './_search';
import AuthTree from './components/AuthTree';
import AccessTree from './components/AccessTree';
import WarpForm from '@/components/WarpForm';
import addItem from './_add';
import editItem from './_edit';

@connect(({ loading, role, modal, permission }) => ({
  loading,
  roleList: role.roleList,
  checkedKeys: role.checkedKeys,
  accessCodes: role.accessCodes,
  modal,
  menuPermissions: permission.menuPermissions,
  accessPermissions: permission.accessPermissions,
}))
class Role extends PureComponent {
  state = {
    authKeys: [], // 真正需要提交的菜单权限key
    roleId: null, // 角色id
    isAble: true, // 分配权限的提交按钮的状态
    accessId: 1, // 0: 被点，1:没有被点,
    menuId: 1, // 0: 被点，1:没有被点,
    editRecord: null, // 编辑记录
    editIndex: null, // 编辑行数
    searchItems: null, // 搜索的内容
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.init();

    // 获得菜单权限数据
    dispatch({
      type: 'permission/getMenuPermissionList',
    })

    // 获得访问权限列表
    dispatch({
      type: 'permission/getAccessPermissionList',
    })
  }

  // 初始化
  init = (page = 1, values) => {
    const { dispatch, roleList: { pagination } } = this.props;
    dispatch({
      type: 'role/getRolePage',
      params: {
        ...pagination,
        ...values,
        current: page,
      },
    })
  }

  // 搜索
  onSearch = values => {
    this.setState({ searchItems: values })
    this.init(1, values);
  }

  // 页码跳转
  onChange = page => {
    const { searchItems } = this.state;
    this.init(page, searchItems)
  }

  openAuthModal = id => {
    const { dispatch } = this.props;
    this.setState({ roleId: id })
    // 查询单个角色
    dispatch({
      type: 'role/getRoleById',
      payload: id,
    })
    // 显示模态框
    dispatch({
      type: 'modal/showModal',
      key: 'assignPermissionById',
    })
  }

  // 分配权限
  handleOk = () => {
    const { dispatch, accessCodes } = this.props;
    const { roleId, authKeys, menuId, accessId } = this.state;
    dispatch({
      type: 'role/assignPermissionById',
      payload: { checkedKeys: authKeys, roleId, accessCodes, menuId, accessId },
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/hideModal',
    })
    this.setState({ isAble: true })
  }

  // 菜单权限
  onMenuCheck = (checkedKeys, info) => {
    const { dispatch } = this.props;
    const keys = [...checkedKeys, ...info.halfCheckedKeys];
    this.setState({ authKeys: keys, isAble: false, menuId: 0 })
    dispatch({
      type: 'role/changeMenuKeys',
      payload: checkedKeys,
    })
  };

  // 访问权限
  onAccessCheck = checkedKeys => {
    const { dispatch } = this.props;
    this.setState({ isAble: false, accessId: 0 })
    dispatch({
      type: 'role/changeAccessKeys',
      payload: checkedKeys,
    })
  }

  // 添加modal
  showAddModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/showModal',
      key: 'addRole',
    })
  }

  // 添加角色
  addRole = () => {
    const { dispatch } = this.props;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'role/addRole',
          payload: values,
        })
      }
    })
  }

  // 编辑modal
  showEditModal = (record, index) => {
    const { dispatch } = this.props;
    this.setState({ editRecord: record, editIndex: index })
    dispatch({
      type: 'modal/showModal',
      key: 'updateRole',
    })
  }

  // 更新角色
  updateRole = () => {
    const { dispatch } = this.props;
    const { editRecord, editIndex } = this.state;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'role/updateRole',
          payload: { record: { ...editRecord, ...values }, editIndex },
        })
      }
    })
  }

  // 删除角色
  deleteRoleId = (record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/deleteRoleId',
      payload: { id: record.id, index },
    })
  }

  render() {
    const { roleList: { data, pagination }, loading, modal, menuPermissions, checkedKeys, accessPermissions, accessCodes } = this.props;
    const { isAble, editRecord } = this.state;
    return (
      <PageHeaderWrapper>

        <Card>
          <SearchForm searchItem={searchItem} onSearch = {this.onSearch} />
          <Row>
            <Button type="primary" icon="plus" onClick={this.showAddModal}>新增</Button>
          </Row>
          <Table
            rowKey={record => record.id}
            columns={columns(this)}
            dataSource={data}
            pagination={{
             ...pagination,
             onChange: this.onChange,
             showTotal: total => `共有${total}条记录`,
            }}
            loading={loading.effects['role/getRolePage']}
          />
          </Card>

        <Modal
          width={800}
          title="分配权限"
          visible={modal.modalShow && modal.modalShow.assignPermissionById}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: isAble }}
        >
         <Row gutter={24}>
           <Col span={6}>
              <Tag color="#2db7f5">菜单权限</Tag>

              <AuthTree self={this} menuPermissions={menuPermissions} roleKeys={checkedKeys} />
           </Col>
           <Col span={18}>
              <Tag color="#87d068">访问权限</Tag>
              <AccessTree self={this} accessPermissions={accessPermissions} accessKeys={accessCodes} />
           </Col>
         </Row>

        </Modal>

        <Modal
          title="新增"
          visible={modal.modalShow && modal.modalShow.addRole}
          onCancel={this.handleCancel}
          onOk={this.addRole}
          destroyOnClose
          maskClosable={false}
        >
          <WarpForm formItem={addItem} ref={form => { this.form = form }} />
        </Modal>

        <Modal
          title="编辑"
          visible={modal.modalShow && modal.modalShow.updateRole}
          onCancel={this.handleCancel}
          onOk={this.updateRole}
          destroyOnClose
          maskClosable={false}
        >
          <WarpForm formItem={editItem(editRecord)} ref={form => { this.form = form }} />
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default Role;
