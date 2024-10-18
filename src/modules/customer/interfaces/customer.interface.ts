import type { UserSummary } from '@/modules/users'

export interface CustomerList {
  id: string
  name: string
  email: string
  code: number
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
}

export interface Customer extends CustomerList {
  createdBy: UserSummary | null
  updatedBy: UserSummary | null
  deletedBy: UserSummary | null
}
