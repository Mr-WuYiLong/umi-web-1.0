import React from 'react';
import { Input, Select, Radio } from 'antd';

export default permissions => [
  {
    name: 'pid',
    label: '顶级菜单',
    content:
      <Select allowClear placeholder="默认顶级菜单">
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
      <Radio.Group>

        <Radio value={1}>顶级菜单</Radio>
        <Radio value={2}>二级菜单</Radio>
      </Radio.Group>,
  },
  {
    name: 'code',
    label: '键',
    extra: {
      rules: [{ required: true, message: 'code' }],
    },
    content: <Input placeholder="有二级菜单的顶级菜单必须要大写T开头" allowClear />,
  },
  {
    name: 'name',
    label: '名称',
    extra: {
      rules: [{ required: true, message: '请输入名称' }],
    },
    content: <Input placeholder="名称" allowClear />,
  },
  // {
  //   name: 'path',
  //   label: '路径',
  //   content: <Input placeholder="路径" allowClear />,
  // },
  // {
  //   name: 'action',
  //   label: '动作',
  //   content: <Input placeholder="动作" allowClear />,
  // },
]
