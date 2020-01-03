import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from '@/components/SearchForm';
import WarpForm from '@/components/WarpForm';
import { connect } from 'dva';
import { Card, Table, Button, Row, Modal, Input, Tabs } from 'antd';
import columns from './_table';
import modals from './_modal';

const { TabPane } = Tabs;
@connect(({ loading, permission, modal }) => ({
  loading,
  permissionList: permission.permissionList,
  modal,
  permissions: permission.permissions,
}))
class Permission extends PureComponent {
  state = {

  }

  componentDidMount() {
    const { dispatch, permissionList: { pagination } } = this.props;
    dispatch({
      type: 'permission/getPermissionPage',
      params: pagination,
    })
  }


  showModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/showModal',
    })

    dispatch({
      type: 'permission/getPermissionList',
    })
  }

  handleOk = () => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'modal/hideModal',
    // })

    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'permission/addPermission',
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
  onChange = (status, record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/changeStatus',
      payload: { status, record, index },
    })
  }

  // 删除权限
  deletePermissionById = (record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'permission/deletePermissionById',
      payload: { record, index },
    })
  }

  tapsCallback = key => {
  console.log(key);
  }

  render() {
    const { permissions, permissionList: { data, pagination }, loading, modal } = this.props;
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
              <Table
                rowKey={record => record.id}
                columns={columns(this)}
                dataSource={data}
                pagination={pagination}
                loading={loading.effects['permission/getPermissionPage']}
              />
         </TabPane>

          </Tabs>,
            </Card>


        <Modal
          title="新增权限"
          visible={modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >

          <WarpForm formItem={modals(permissions)} ref={form => { this.form = form }} />

        </Modal>

      </PageHeaderWrapper>
    )
  }
}

export default Permission;
