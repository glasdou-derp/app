import { api } from '@/api'
import type { Customer } from '../interfaces'

const emptyCustomer: Customer = {
  code: 0,
  createdAt: null,
  createdBy: null,
  deletedAt: null,
  deletedBy: null,
  email: '',
  id: '',
  name: '',
  updatedAt: null,
  updatedBy: null
}

export const getCustomerAction = async (code: string): Promise<Customer> => {
  if (code === 'nuevo') return emptyCustomer

  try {
    const { data } = await api.get<Customer>(`/customer/code/${code}`)

    return data
  } catch (error) {
    console.log('Error: ', error)
    throw new Error('Unexpected error')
  }
}
