import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchForm from '@/components/SearchForm';
import WarpForm from '@/components/WarpForm';
import { connect } from 'dva';
import { Card, Table, Button, Row, Modal } from 'antd';
import columns from './_table';
import modals from './_modal';


@connect(({ loading, permission, modal }) => ({
  loading,
  permissionList: permission.permissionList,
  modal,
}))
class Permission extends PureComponent {
  state = {
    isShow: false,
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
  }

  handleOk = () => {
    this.setState({ isShow: false });
  };

  handleCancel = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { permissionList: { data, pagination }, loading, modal } = this.props;

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
            loading={loading.effects['permission/getPermissionList']}
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

          <WarpForm formItem={modals} ref={form => { this.form = form }} />

        </Modal>

      </PageHeaderWrapper>
    )
  }
}

export default Permission;
