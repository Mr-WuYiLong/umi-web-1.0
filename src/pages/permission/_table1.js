import React from 'react';
import { Button, Row, Popconfirm } from 'antd';

export default self => [
  {
    title: '描述路径的功能',
    dataIndex: 'description',
  },
   {
    title: '访问路径',
    dataIndex: 'path',
  },
  {
    title: '动作',
    dataIndex: 'action',
  },
  {
    title: '操作',
    render: (_, record, index) => (<Row>

      <Button style={{ marginRight: '5px' }} type="primary" icon="edit">编辑</Button>
      <Popconfirm
        title="你确定要删除?"
        onConfirm={() => self.deleteAccessPermissionById(record, index)}
        okText="确定"
        cancelText="取消"
      >
        <Button type="primary" icon="delete">删除</Button>

      </Popconfirm>
    </Row>),
  },
]
