import React from 'react';
import { Input } from 'antd';

export default record => [
  {
    name: 'name',
    label: '名称',
    extra: {
      initialValue: record && record.name,
      rules: [{ required: true, message: '请填写名称' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
]
