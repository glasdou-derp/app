import { api } from '@/api'
import { exceptionHandlerHelper, ObjectManipulator } from '@/modules/shared'
import type { Customer } from '../interfaces'

export const createUpdateCustomerAction = async (customer: Partial<Customer>) => {
  const customerId = customer.id

  customer = cleanCustomer(customer)

  if (customerId && customerId !== '') return updateCustomer(customer, customerId)

  return createCustomer(customer)
}

const cleanCustomer = (customer: Partial<Customer>) => {
  const cleanedCustomer = { ...customer }

  ObjectManipulator.exclude(cleanedCustomer, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'createdBy',
    'updatedBy',
    'deletedBy'
  ])

  return cleanedCustomer
}

const createCustomer = async (customer: Partial<Customer>) => {
  try {
    const { data } = await api.post<Customer>('/customers', customer)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'createCustomer')
  }
}

const updateCustomer = async (customer: Partial<Customer>, id: string) => {
  try {
    const { data } = await api.put<Customer>(`/customers/${id}`, customer)

    return data
  } catch (error) {
    throw exceptionHandlerHelper(error, 'updateCustomer')
  }
}
