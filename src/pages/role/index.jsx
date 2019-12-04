import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Row, Modal, Col } from 'antd';
import SearchForm from '@/components/SearchForm';
import { connect } from 'dva';
import columns from './_table';

import searchItem from './_search';

@connect(({ loading, role }) => ({
  loading,
  roleList: role.roleList,
}))
class Role extends PureComponent {
  state ={
    visible: false,
  }

  componentDidMount() {
    const { dispatch, roleList: { pagination } } = this.props;
    dispatch({
      type: 'role/getRolePage',
      params: pagination,
    })
  }

  openAuthModal = () => {
    this.setState({ visible: true })
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.setState({ visible: false })
  }


  render() {
    const { roleList: { data, pagination }, loading } = this.props;
    return (
      <PageHeaderWrapper>

        <Card>
          <SearchForm searchItem={searchItem}/>
          <Row>
            <Button type="primary" icon="plus">新增</Button>
          </Row>
          <Table
            rowKey={record => record.id}
            columns={columns(this)}
            dataSource={data}
            pagination={pagination}
            loading={loading.effects['role/getRolePage']}
          />
          </Card>

        <Modal
          title="分配权限"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >


        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default Role;
