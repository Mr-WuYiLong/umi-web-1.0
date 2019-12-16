export default
  [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: 'login',
          component: './login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              key: '1001',
              path: '/welcome',
              name: '欢迎页',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/manage',
              name: '系统管理',
              icon: 'setting',
              routes: [
                {
                  key: '2001',
                  path: '/manage/admin',
                  name: '用户管理',
                  icon: 'user',
                  component: './admin',
                },
                {
                  key: '2002',
                  path: '/manage/role',
                  name: '角色管理',
                  icon: 'team',
                  component: './role',
                },
                {
                  key: '2003',
                  path: '/manage/permission',
                  name: '权限管理',
                  icon: 'safety',
                  component: './permission',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ]
