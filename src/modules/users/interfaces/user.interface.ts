export interface User {
  id: string
  username: string
  email: string
  roles: UserRole[]
  createdAt: Date
  updatedAt: Date
  deletedAt: null | Date
  creator: null | UserSummary
  password: string | null | undefined
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
