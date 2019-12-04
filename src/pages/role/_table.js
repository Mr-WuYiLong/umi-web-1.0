import React from 'react';
import { Button, Row } from 'antd';

export default self => [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    render: () => (<Row>
      <Button style={{ marginRight: '5px' }} type="primary" icon="appstore" onClick={self.openAuthModal}>分配权限</Button>
        <Button style={{ marginRight: '5px' }} type="primary" icon="edit">编辑</Button>
        <Button type="primary" icon="delete">删除</Button>
      </Row>),
  },
]
