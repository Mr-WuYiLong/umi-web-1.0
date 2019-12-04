import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Row } from 'antd';
import SearchForm from '@/components/SearchForm';
import { connect } from 'dva';
import columns from './_table';
import searchItem from './_search';

@connect(({ loading, admin, role }) => ({
  loading,
  adminList: admin.adminList,
  roles: role.roles,
}))
class Admin extends PureComponent {
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

  render() {
    const { roles, adminList: { data, pagination }, loading } = this.props;
    return (<PageHeaderWrapper>
        <Button type="primary" icon="plus">新增</Button>
        <Card>
        <SearchForm searchItem={searchItem} />
        <Table
          rowKey={record => record.id}
          columns={columns(roles)}
          dataSource={data}
          pagination={pagination}
          loading={loading.effects['admin/getAdminList']}
        />
        </Card>
    </PageHeaderWrapper>)
  }
}

export default Admin;
