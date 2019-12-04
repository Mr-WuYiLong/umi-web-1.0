import React from 'react';

export default roles => [
  {
    title: '姓名',
    dataIndex: 'account',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '角色',
    dataIndex: 'role_id',
    render: text => (roles.map(item => {
      if (item.id === text) {
        return item.name
      }
      return null;
    })),
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
]
