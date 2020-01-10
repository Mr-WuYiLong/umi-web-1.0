import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Row, Modal } from 'antd';
import SearchForm from '@/components/SearchForm';
import { connect } from 'dva';
import columns from './_table';
import searchItem from './_search';
import WarpForm from '@/components/WarpForm';
import addItem from './_add';
import editItem from './_edit';

@connect(({ loading, admin, role, modal }) => ({
  loading,
  modal,
  adminList: admin.adminList,
  roles: role.roles,
}))
class Admin extends PureComponent {
  state = {
    editRecord: null,
    editIndex: null,
  }

  componentDidMount() {
    const { dispatch, adminList: { pagination } } = this.props;
    dispatch({
      type: 'admin/getAdminList',
      params: pagination,
    })

    dispatch({
      type: 'role/getRoleList',
    })
  }

  // 新增modal
  showAddModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/showModal',
      key: 'addAdmin',
    })
  }

  // 关闭modal
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/hideModal',
    })
  }

  // 新增管理员
  addAdmin = () => {
    const { dispatch } = this.props;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'admin/addAdmin',
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
      key: 'updateAdmin',
    })
  }

  // 更新管理员
  updateAdmin = () => {
    const { dispatch } = this.props;
    const { editRecord, editIndex } = this.state;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'admin/updateAdmin',
          payload: { record: { ...editRecord, ...values }, editIndex },
        })
      }
    })
  }

  // 删除管理员
  deleteAdminById = (id, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/deleteAdminById',
      payload: { id, index },
    })
  }

  render() {
    const { roles, adminList: { data, pagination }, loading, modal } = this.props;
    const { editRecord } = this.state;
    return (<PageHeaderWrapper>

        <Card>

        <SearchForm searchItem={searchItem} />
        <Row>
          <Button type="primary" icon="plus" onClick={this.showAddModal}>新增</Button>
        </Row>
        <Table
          rowKey={record => record.id}
          columns={columns(roles, this)}
          dataSource={data}
          pagination={pagination}
          loading={loading.effects['admin/getAdminList']}
        />
        </Card>


      <Modal
        title="新增"
        visible={modal.modalShow && modal.modalShow.addAdmin}
        onCancel={this.handleCancel}
        onOk={this.addAdmin}
        destroyOnClose
        maskClosable={false}
      >
        <WarpForm formItem={addItem(roles)} ref={form => { this.form = form }} />
      </Modal>

      <Modal
        title="编辑"
        visible={modal.modalShow && modal.modalShow.updateAdmin}
        onCancel={this.handleCancel}
        onOk={this.updateAdmin}
        destroyOnClose
        maskClosable={false}
      >
        <WarpForm formItem={editItem(roles, editRecord)} ref={form => { this.form = form }} />
      </Modal>
    </PageHeaderWrapper>)
  }
}

export default Admin;
