import type { UserRole } from '@/modules/users/interfaces'

/**
 * Determines if a user has at least one of the specified roles.
 *
 * @param {UserRole[]} userRoles - The roles assigned to the user.
 * @param {UserRole[] | UserRole} roles - The required roles to check, can be a single role or an array of roles.
 * @returns {boolean} - Returns `true` if the user has at least one of the specified roles, otherwise `false`.
 */
export const hasRole = (userRoles: UserRole[], roles: UserRole[] | UserRole): boolean => {
  if (!userRoles) return true

  return Array.isArray(roles) // Check if roles is an array
    ? userRoles.some((role) => roles.includes(role)) // Check if userRoles has some role in roles
    : userRoles.includes(roles) // Check if userRoles has the role
}
