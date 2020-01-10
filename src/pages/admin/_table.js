import React from 'react';
import { Button, Row, Popconfirm } from 'antd';

export default (roles, self) => [
  {
    title: '姓名',
    dataIndex: 'account',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '角色',
    dataIndex: 'role_id',
    render: text => (roles.map(item => {
      if (item.id === text) {
        return item.name
      }
      return null;
    })),
  },
  {
    title: '操作',
    render: (_, record, index) => (<Row>

      <Button style={{ marginRight: '5px' }} type="primary" icon="edit" onClick={() => self.showEditModal(record, index)}>编辑</Button>
      <Popconfirm
        title="你确定要删除?"
        onConfirm={() => self.deleteAdminById(record.id, index)}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary" icon="delete">删除</Button>

      </Popconfirm>
    </Row>),
  },

]
