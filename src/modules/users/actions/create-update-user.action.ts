import { api } from '@/api'
import type { User } from '@/modules/users/interfaces'

export const createUpdateUserAction = async (user: Partial<User>): Promise<User> => {
  const userId = user.id

  user = cleanUser(user)

  if (userId && userId !== '') return await updateUser(userId, user)

  return await createUser(user)
}

const cleanUser = (user: Partial<User>) => {
  delete user.id
  delete user.createdAt
  delete user.updatedAt
  delete user.deletedAt
  delete user.createdBy
  delete user.updatedBy
  delete user.deletedBy
  if (!user.password) delete user.password

  return user
}

const createUser = async (user: Partial<User>) => {
  try {
    const { data } = await api.post<User>('/users', user)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const updateUser = async (userId: string, user: Partial<User>) => {
  try {
    const { data } = await api.patch<User>(`/users/${userId}`, user)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
