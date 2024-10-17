import { api } from '@/api'
import { exceptionHandlerHelper } from '@/modules/shared'
import type { Customer } from '../interfaces'

export const deleteRestoreCustomerAction = async (id: string, isDeleted: boolean) => {
  return isDeleted ? restoreCustomer(id) : deleteCustomer(id)
}

const deleteCustomer = async (id: string) => {
  try {
    const { data } = await api.delete<Customer>(`/customer/${id}`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'deleteUser')
  }
}

const restoreCustomer = async (id: string) => {
  try {
    const { data } = await api.patch<Customer>(`/customer/${id}/restore`)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'restoreUser')
  }
}
