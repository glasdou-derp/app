import { UserRole } from '@/modules/users/interfaces'
import { PrimeIcons as icons } from '@primevue/core/api'
import { hasRole } from '@shared/helpers'
import type { MenuItem } from 'primevue/menuitem'

const filterMenuItems = (items: MenuItem[], userRoles: UserRole[]) => {
  return items
    .filter((item) => hasRole(item.roles, userRoles))
    .map((item) => {
      const newItem = { ...item }
      if (item.items) {
        newItem.items = filterMenuItems(item.items, userRoles)
      }
      return newItem
    })
}

export const getMenuOptions = (userRoles: UserRole[]) => {
  const menuItems = [
    { icon: icons.HOME, label: 'Inicio', route: { name: 'home' } },
    {
      roles: [UserRole.Admin],
      label: 'Usuarios',
      icon: icons.USERS,
      route: { name: 'user.list' }
    },
    {
      roles: [UserRole.Admin, UserRole.Moderator],
      label: 'Clientes',
      icon: icons.USERS,
      route: { name: 'customer.list' }
    }
  ]

  return filterMenuItems(menuItems, userRoles)
}
