import type { User } from '@/modules/users'

export interface LoginError {
  ok: false
  message: string
}

export interface LoginSuccess {
  ok: true
  message: string
  user: User
  token: string
}

export interface LoginForm {
  username: string
  password: string
}
