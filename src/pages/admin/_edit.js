import React from 'react';
import { Input, Select } from 'antd';

export default (roles, record) => [
  {
    name: 'account',
    label: '账号',
    extra: {
      initialValue: record && record.account,
      rules: [{ required: true, message: '请填写账号' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
  {
    name: 'password',
    label: '密码',
    extra: {
      initialValue: record && record.password,
      rules: [{ required: true, message: '请填写密码' }],
    },
    content: <Input placeholder="密码" allowClear />,
  },
  {
    name: 'role_id',
    label: '角色',
    extra: {
      initialValue: record && record.role_id,
      rules: [{ required: true, message: '请填写角色' }],
    },
    content: <Select allowClear placeholder="请选择角色">
      {roles.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
    </Select>,
  },
];
