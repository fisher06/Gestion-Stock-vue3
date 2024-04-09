export const stockRoute = {
  path: '/stock',
  component: () => import('./views/StockView.vue'),
  children: [
    {
      path: '',
      name: 'stockList',
      component: () => import('./views/ListView.vue')
    },
    {
      path: 'add',
      name: 'stockAdd',
      component: () => import('./views/AddView.vue')
    }
  ]
}
