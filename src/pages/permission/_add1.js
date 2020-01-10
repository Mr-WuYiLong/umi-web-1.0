import React from 'react';
import { Input } from 'antd';

export default () => [
  {
    name: 'description',
    label: '描述',
    extra: {
      rules: [{ required: true, message: '请填写描述' }],
    },
    content: <Input placeholder="描述请求路径的功能" allowClear />,
  },
  {
    name: 'path',
    label: '路径',
    extra: {
      rules: [{ required: true, message: '请填写路径' }],
    },
    content: <Input placeholder="路径" allowClear />,
  },
  {
    name: 'action',
    label: '动作',
    extra: {
      rules: [{ required: true, message: '请填写动作' }],
    },
    content: <Input placeholder="动作" allowClear />,
  },
]
