import type { RouteRecordRaw } from 'vue-router'

export const CUSTOMER_ROUTES: RouteRecordRaw[] = [
  {
    path: '/customer',
    name: 'customer.list',
    component: () => import('../views/CustomersView.vue')
  },
  {
    path: '/customer/:code',
    name: 'customer.detail',
    component: () => import('../views/CustomerView.vue')
  }
]
