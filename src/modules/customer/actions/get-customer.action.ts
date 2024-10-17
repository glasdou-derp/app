import { api } from '@/api'
import type { Customer } from '../interfaces'

export const getCustomerAction = async (code: number) => {
  try {
    const { data } = await api.get<Customer>(`/customer/code/${code}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
