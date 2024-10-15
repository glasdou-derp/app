import { api } from '@/api'
import type { User } from '../interfaces'

const emptyUser: User = {
  id: '',
  username: '',
  email: '',
  roles: [],
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
  createdBy: null,
  updatedBy: null,
  deletedBy: null
}

export const getUserByUsernameAction = async (username: string): Promise<User> => {
  if (username === 'nuevo') return emptyUser

  try {
    const { data } = await api.get<User>(`/users/username/${username}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
