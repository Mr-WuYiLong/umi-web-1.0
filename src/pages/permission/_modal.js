import React from 'react';
import { Input } from 'antd';

export default [
  {
    name: 'name',
    label: '名称',
    extra: {
      rules: [{ required: true, message: '请输入名称' }],
    },
    content: <Input placeholder="名称" />,
  },
  {
    name: 'controller',
    label: '控制器',
    extra: {
      rules: [{ required: true, message: '请输入控制器' }],
    },
    content: <Input placeholder="控制器" />,
  },
  {
    name: 'action',
    label: '动作',
    extra: {
      rules: [{ required: true, message: '请输入动作' }],
    },
    content: <Input placeholder="动作" />,
  },
]
