import React from 'react';
import { Input, Icon } from 'antd';
/**
 * 表单元素
 */
export default [
  {
    name: 'account',
    extra: {
      rules: [{ required: true, message: '请输入你的账号!' }],
    },
    content: <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号"/>,
  },
  {
    name: 'password',
    extra: {
      rules: [{ required: true, message: '请输入你的密码!' }],
    },
    content: <Input type="password" autoComplete="true" size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码"/>,
  },
]
