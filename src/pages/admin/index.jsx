import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button } from 'antd';
import { connect } from 'dva';
import columns from './_table';

@connect(({ loadding, admin }) => ({
  loadding,
  adminList: admin.adminList,
}))
class Admin extends PureComponent {
  componentDidMount() {
    const { dispatch, adminList: { pagination } } = this.props;
    dispatch({
      type: 'admin/getAdminList',
      params: pagination,
    })
  }

  render() {
    const { adminList: { data, pagination } } = this.props;
    return (<PageHeaderWrapper title={false}>
      <Button type="primary">添加</Button>
      <Card>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={data}
          pagination={pagination}
        />
      </Card>
    </PageHeaderWrapper>)
  }
}

export default Admin;
