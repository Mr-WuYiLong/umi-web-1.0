import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from '@/components/SearchForm';
import WarpForm from '@/components/WarpForm';
import { connect } from 'dva';
import { Card, Table, Button, Row, Modal, Input } from 'antd';
import columns from './_table';
import modals from './_modal';


@connect(({ loading, permission, modal }) => ({
  loading,
  permissionList: permission.permissionList,
  modal,
  permissions: permission.permissions,
}))
class Permission extends PureComponent {
  state = {
    modalArr: [],
    isTap: false,
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
    this.setState({ isTap: false });
  };

  handleChange = e => {
    const { permissions } = this.props;

    const data = {
      name: 'key',
      label: '键',
      extra: {
        rules: [{ required: true, message: '请输入唯一key' }],
      },
      content: <Input placeholder="唯一key" allowClear />,
    };

    const arr = modals(permissions, this);
    if (e.target.value === 2) {
      arr.splice(2, 0, data);
      this.setState({ modalArr: arr, isTap: true });
    } else {
      this.setState({ isTap: false });
    }
  }

  render() {
    const { permissions, permissionList: { data, pagination }, loading, modal } = this.props;
    const { modalArr, isTap } = this.state;
    return (
      <PageHeaderWrapper>
        <Card>
          {/* <SearchForm searchItem={searchItem} /> */}
          <Row>
            <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
          </Row>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading.effects['permission/getPermissionPage']}
          />
        </Card>

        <Modal
          title="新增权限"
          visible={modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >

          <WarpForm formItem={isTap ? modalArr : modals(permissions, this)} ref={form => { this.form = form }} />

        </Modal>

      </PageHeaderWrapper>
    )
  }
}

export default Permission;
