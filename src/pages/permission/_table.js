import React from 'react';
import { permissionType, permissionTypeColor, statusType } from '@/utils/meta';
import { Tag, Switch } from 'antd';


export default [
  {
    title: '名称',
    dataIndex: 'name',
    render: (name, record) => (record.pid !== 0 ? `----${name}` : name),
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
    title: '类型',
    dataIndex: 'type',
    render: type => <Tag color={permissionTypeColor[type]}>{permissionType[type]}</Tag>,

  },
  {
    title: 'key',
    dataIndex: 'key',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: status => <Switch onChange checkedChildren="开" unCheckedChildren="关" defaultChecked />,
  },
];
