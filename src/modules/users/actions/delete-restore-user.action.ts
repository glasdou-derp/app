import { api } from '@/api'
import type { User } from '../interfaces'

export const deleteRestoreUserAction = async (userId: string, isDeleted: boolean) => {
  if (isDeleted) return await restoreUser(userId)

  return await deleteUser(userId)
}

const restoreUser = async (userId: string) => {
  try {
    const { data } = await api.patch<User>(`/users/${userId}/restore`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}

const deleteUser = async (userId: string) => {
  try {
    const { data } = await api.delete<User>(`/users/${userId}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
