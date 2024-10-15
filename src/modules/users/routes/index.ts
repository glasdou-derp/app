import isAdminGuard from '@/modules/auth/guards/is-admin.guard'
import type { RouteRecordRaw } from 'vue-router'

export const USERS_ROUTES: RouteRecordRaw[] = [
  {
    path: '/usuarios',
    name: 'user.list',
    beforeEnter: [isAdminGuard],
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/usuarios/u/:id',
    name: 'user.detail',
    props: true,
    beforeEnter: [isAdminGuard],
    component: () => import('../views/UserView.vue')
  }
]
