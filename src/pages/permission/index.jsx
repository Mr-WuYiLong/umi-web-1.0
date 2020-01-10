import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from '@/components/SearchForm';
import WarpForm from '@/components/WarpForm';
import { connect } from 'dva';
import { Card, Table, Button, Row, Modal, Input, Tabs, Tooltip } from 'antd';
import columns from './_table';
import columns1 from './_table1';
import addItem from './_add';
import addItem1 from './_add1';

const { TabPane } = Tabs;
@connect(({ loading, permission, modal }) => ({
  loading,
  permissionList: permission.permissionList,
  accessPermissionList: permission.accessPermissionList,
  modal,
  permissions: permission.permissions,
}))
class Permission extends PureComponent {
  state = {

  }

  // 初始化
  componentDidMount() {
    this.init();
    this.initAccess();
  }

  init = () => {
    const { dispatch, permissionList: { pagination } } = this.props;
    dispatch({
      type: 'permission/getPermissionPage',
      params: pagination,
    })
  }

  initAccess = (page = 1) => {
    const { dispatch, accessPermissionList: { accessPagination } } = this.props;
    dispatch({
      type: 'permission/getAccessPermissionPage',
      params: { ...accessPagination, current: page },
    })
  }


  showModal = () => {
    const { dispatch } = this.props;
    const arr = [];
    dispatch({
      type: 'modal/showModal',
      key: 'addPermission',
    })

    dispatch({
      type: 'permission/getPermissionList',
    })
  }

  showAccessModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/showModal',
      key: 'addAccessPermission',
    })

    // dispatch({
    //   type: 'permission/getPermissionList',
    // })
  }

  handleOk = () => {
    const { dispatch } = this.props;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'permission/addPermission',
          payload: values,
        })
      }
    })
  };

  handleAccessOk = () => {
    const { dispatch } = this.props;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'permission/addAccessPermission',
          payload: values,
        })
      }
    })
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/hideModal',

    })
  };

  // // 处理新增是否显示key输入框
  // handleChange = e => {
  //   const { permissions } = this.props;

  //   const data =

  //   const arr = modals(permissions, this);
  //   if (e.target.value === 1) {
  //     arr.splice(2, 0, data);
  //     this.setState({ modalArr: arr, isTap: true });
  //   } else {
  //     this.setState({ isTap: false });
  //   }
  // }

  // 启用，停用
  // onChange = (status, record, index) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'permission/changeStatus',
  //     payload: { status, record, index },
  //   })
  // }

  // 删除菜单权限
  deletePermissionById = (record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/deletePermissionById',
      payload: { record, index },
    })
  }


  // 删除访问权限
  deleteAccessPermissionById = (record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/deleteAccessPermissionById',
      payload: { record, index },
    })
  }

  // 访问权限页码切换
  onAccessChange = page => {
    this.initAccess(page);
  }

  // 自动导入访问权限
  autoImportAccessPermission = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/autoImportAccessPermission',
    })
  }

  render() {
    const { permissions, accessPermissionList: { accessData, accessPagination }, permissionList: { data, pagination }, loading, modal } = this.props;
    return (
      <PageHeaderWrapper>

            <Card>
              {/* <SearchForm searchItem={searchItem} /> */}
          <Tabs defaultActiveKey="1" onChange={this.tapsCallback}>
            <TabPane tab="菜单权限" key="1">
              <Row>
                <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
              </Row>
              <Table
                rowKey={record => record.id}
                columns={columns(this)}
                dataSource={data}
                pagination={pagination}
                loading={loading.effects['permission/getPermissionPage']}
              />
            </TabPane>
            <TabPane tab="访问权限" key="2">
              <Row>

                <Button type="primary" icon="plus" onClick={this.showAccessModal}>新增</Button>
                <Tooltip title="会删除原有的访问权限，重新载入新的访问权限">
                  <Button type="danger" style={{ float: 'right' }} icon="import" onClick={this.autoImportAccessPermission}>自动导入访问权限</Button>
                </Tooltip>

              </Row>
              <Table
                rowKey={record => record.id}
                columns={columns1(this)}
                dataSource={accessData}
                pagination={{

                  ...accessPagination,
                  onChange: this.onAccessChange,
                  showTotal: total => `共有${total}条记录`,
                }}
                loading={loading.effects['permission/getAccessPermissionPage']}
              />
         </TabPane>

          </Tabs>,
            </Card>


        <Modal
          title="新增菜单权限"
          visible={modal.modalShow && modal.modalShow.addPermission}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >

          <WarpForm formItem={addItem(permissions)} ref={form => { this.form = form }} />

        </Modal>
        <Modal
          title="新增访问权限"
          visible={modal.modalShow && modal.modalShow.addAccessPermission}
          onOk={this.handleAccessOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >

          <WarpForm formItem={addItem1()} ref={form => { this.form = form }} />

        </Modal>

      </PageHeaderWrapper>
    )
  }
}

export default Permission;
