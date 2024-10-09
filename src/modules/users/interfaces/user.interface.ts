export interface User {
  id: string
  username: string
  email: string
  roles: UserRole[]
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  createdBy: null | UserSummary
  updatedBy: null | UserSummary
  deletedBy: null | UserSummary
  password?: string | null
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Moderator = 'Moderator'
}

export interface UserSummary {
  id: string
  username: string
  email: string
}

export interface DeleteRestoreUser {
  userId: string
  isDeleted: boolean
}
