import React from 'react';
import { Input } from 'antd';

export default [
  {
    name: 'name',
    label: '名称',
    extra: {
      rules: [{ required: true, message: '请填写名称' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
]
