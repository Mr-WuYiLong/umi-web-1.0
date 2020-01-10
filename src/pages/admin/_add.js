import React from 'react';
import { Input, Select } from 'antd';

export default roles => [
  {
    name: 'account',
    label: '账号',
    extra: {
      rules: [{ required: true, message: '请填写账号' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
  {
    name: 'password',
    label: '密码',
    extra: {
      rules: [{ required: true, message: '请填写密码' }],
    },
    content: <Input placeholder="密码" allowClear />,
  },
  {
    name: 'role_id',
    label: '角色',
    extra: {
      rules: [{ required: true, message: '请填写角色' }],
    },
    content: <Select allowClear placeholder="请选择角色">
      {roles.map(item => <Select.Option key={item.id}>{item.name}</Select.Option>)}
    </Select>,
  },
];
