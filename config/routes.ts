export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
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
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/dish-manage',
                    name: 'dish-manage',
                    icon: 'smile',
                    component: './admin/dishManage',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/table-manage',
                    name: 'table-manage',
                    icon: 'smile',
                    component: './admin/tableManage',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/dipendente-manage',
                    name: 'dipendente-manage',
                    icon: 'smile',
                    component: './admin/dipendenteManage',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/profitChart',
                    name: 'profitChart',
                    icon: 'smile',
                    component: './admin/profitChart',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'mealTable',
                icon: 'BlockOutlined',
                path: '/mealTable',
                component: './mealTable',
              },
              {
                name: 'dishList',
                icon: 'ReconciliationOutlined',
                path: '/dishList',
                component: './dishList',
              },
              {
                name: 'shoppingCart',
                icon: 'ShoppingCartOutlined',
                path: '/shoppingCart',
                component: './shoppingCart',
              },
              {
                name: 'orderList',
                icon: 'BarsOutlined',
                path: '/orderList',
                component: './orderList',
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
    ],
  },
  {
    component: './404',
  },
];
