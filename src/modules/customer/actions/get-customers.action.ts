import { api } from '@/api'
import {
  exceptionHandlerHelper,
  getLimitPaginationHelper,
  type ApiListResponse
} from '@/modules/shared'
import type { CustomerList } from '../interfaces'

export const getCustomersAction = async (
  page: number = 1
): Promise<ApiListResponse<CustomerList>> => {
  try {
    const limit = getLimitPaginationHelper()
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const { data } = await api.get<ApiListResponse<CustomerList>>(`/customer`, { params })

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'getCustomersAction')
  }
}
