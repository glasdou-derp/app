import type { UserSummary } from '@/modules/users'

export interface AuditInfo {
  user: UserSummary | null
  date: Date | null
  title: string
}
