
import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Row, Modal, Col, Tag } from 'antd';
import SearchForm from '@/components/SearchForm';
import { connect } from 'dva';
import columns from './_table';
import searchItem from './_search';
import AuthTree from './components/AuthTree';


@connect(({ loading, role, modal, permission }) => ({
  loading,
  roleList: role.roleList,
  checkedKeys: role.checkedKeys,
  modal,
  menuPermissions: permission.menuPermissions,
}))
class Role extends PureComponent {
  state = {
    // authKeys: [],
    roleId: null, // 角色id
  }

  componentDidMount() {
    const { dispatch, roleList: { pagination } } = this.props;
    dispatch({
      type: 'role/getRolePage',
      params: pagination,
    })

    // 获得菜单权限数据
    dispatch({
      type: 'permission/getMenuPermissionList',
    })
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
    })


    // if (role.codes != null) {
    //   this.setState({ checkedKeys: role.codes.split(',') })
    // }
  }

  // 分配权限
  handleOk = () => {
    const { dispatch, checkedKeys } = this.props;
    const { roleId } = this.state;
    dispatch({
      type: 'role/assignPermissionById',
      payload: { checkedKeys, roleId },
    })
  }

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/hideModal',
    })
  }

  // 菜单权限
  onMenuCheck = checkedKeys => {
    const { dispatch } = this.props;
    // const keys = [...checkedKeys, ...info.halfCheckedKeys];
    // this.setState({ authKeys: keys })

    dispatch({
      type: 'role/changeMenuKeys',
      payload: checkedKeys,
    })
  };


  render() {
    const { roleList: { data, pagination }, loading, modal, menuPermissions, checkedKeys } = this.props;
    // const { checkedKeys } = this.state;
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
          visible={modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <Row gutter={24}>
           <Col span={12}>
              <Tag color="#2db7f5">菜单权限</Tag>

              <AuthTree self={this} menuPermissions={menuPermissions} roleKeys={checkedKeys} />
           </Col>
           <Col span={12}>
              <Tag color="#87d068">访问权限</Tag>

           </Col>
         </Row>

        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default Role;
