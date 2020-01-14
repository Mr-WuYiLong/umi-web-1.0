import React from 'react';
import { Input } from 'antd';

export default [
  {
    name: 'password',
    label: '新密码',
    extra: {
      rules: [{ required: true, message: '请填写密码' }],
    },
    content: <Input placeholder="密码" allowClear />,
  },
]
