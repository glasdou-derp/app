import type { UserSummary } from '@/modules/users'

export interface ButtonsCardUser extends Partial<UserSummary> {
  date?: Date | string | null
}
