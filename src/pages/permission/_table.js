import React from 'react';
import { permissionType, permissionTypeColor, statusType } from '@/utils/meta';
import { Tag, Switch, Row, Button, Popconfirm, Input } from 'antd';


export default self => [
  {
    title: '名称',
    dataIndex: 'name',
    render: (name, record) => {
      if (record.pid !== 0) {
        return `----${name}`;
      }
      return name;
    },
  },


  {
    title: '类型',
    dataIndex: 'type',
    render: type => <Tag color={permissionTypeColor[type]}>{permissionType[type]}</Tag>,
  },
  {
    title: 'code',
    dataIndex: 'code',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status, record, index) => <Switch onChange={() => self.onChange(status, record, index)} checkedChildren="启用" unCheckedChildren="停用" checked={statusType[status]} />,
  },
  {
    title: '操作',
    render: (_, record, index) => (<Row>

      <Button style={{ marginRight: '5px' }} type="primary" icon="edit">编辑</Button>
      <Popconfirm
        title="你确定要删除?"
        onConfirm={() => self.deletePermissionById(record, index)}
        okText="确定"
        cancelText="取消"
    >
        <Button type="primary" icon="delete">删除</Button>

      </Popconfirm>
    </Row>),
  },
];
