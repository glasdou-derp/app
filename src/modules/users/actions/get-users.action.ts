import { getLimitPaginationHelper } from '@/modules/shared/helpers'
import type { ApiListResponse } from '@/modules/shared/interfaces'
import type { User } from '../interfaces'
import { api } from '@/api'

export const getUsersAction = async (page: number = 1): Promise<ApiListResponse<User>> => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await api.get<ApiListResponse<User>>('/users', { params })

    return data
  } catch (error) {
    console.log(`Error: ${error}`)
    throw new Error('Unexpected error')
  }
}
