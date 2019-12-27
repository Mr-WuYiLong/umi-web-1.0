import React from 'react';
import { Input, Select, Radio } from 'antd';

export default (permissions, self) => [
  {
    name: 'pid',
    label: '顶级目录',
    content:
      <Select allowClear placeholder="请选择">
       {permissions.map(item => <Select.Option key={item.id}>{item.name}</Select.Option>)}
      </Select>
    ,
  },

  {
    name: 'type',
    label: '类型',
    extra: {
      rules: [{ required: true, message: '请选择类型' }],
    },
    content:
      <Radio.Group onChange={self.handleChange}>
        <Radio value={1}>目录</Radio>
        <Radio value={2}>菜单</Radio>
        <Radio value={3}>按钮</Radio>
      </Radio.Group>,
  },
  {
    name: 'name',
    label: '名称',
    extra: {
      rules: [{ required: true, message: '请输入名称' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
  {
    name: 'path',
    label: '路径',
    content: <Input placeholder="路径" allowClear />,
  },
  {
    name: 'action',
    label: '动作',
    content: <Input placeholder="动作" allowClear />,
  },
]
