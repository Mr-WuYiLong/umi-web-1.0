import React from 'react';
import { Button, Row, Popconfirm } from 'antd';

export default self => [
  {
    title: '名称',
    dataIndex: 'name',
  },

  {
    title: '操作',
    render: (_, record, index) => (<Row>
      <Button style={{ marginRight: '5px' }} type="primary" icon="appstore" onClick={() => self.openAuthModal(record.id)}>分配权限</Button>
      <Button style={{ marginRight: '5px' }} type="primary" icon="edit" onClick={() => self.showEditModal(record, index)}>编辑</Button>
      <Popconfirm
      title="你确定要删除?"
      onConfirm={() => self.deleteRoleId(record, index)}
      okText="确定"
      cancelText="取消"
  >
        <Button type="primary" icon="delete">删除</Button>

      </Popconfirm>
      </Row>),
  },
]
