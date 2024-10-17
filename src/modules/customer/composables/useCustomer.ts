import type { DeleteRestoreRequest } from '@/modules/shared'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUpdateCustomerAction, deleteRestoreCustomerAction } from '../actions'
import { computed } from 'vue'

export const useCustomer = () => {
  const queryClient = useQueryClient()

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deletedCustomer,
    error: deleteError
  } = useMutation({
    mutationFn: ({ id, isDeleted }: DeleteRestoreRequest) =>
      deleteRestoreCustomerAction(id, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code], data)
    }
  })

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedCustomer,
    error: updateError
  } = useMutation({
    mutationFn: createUpdateCustomerAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.setQueryData(['customer', data.code], data)
    }
  })

  return {
    //* Props
    updateMutation,
    deleteMutation,

    //! Getters
    isPending: computed(() => isUpdatePending.value || isDeletePending.value),
    isSuccess: computed(() => {
      if (!updatedCustomer.value && !deletedCustomer.value) return null

      if (isUpdateSuccess.value)
        return { msg: 'Actualizado correctamente', user: updatedCustomer.value }

      if (isDeleteSuccess.value)
        return {
          msg: `${deletedCustomer.value?.deletedAt ? 'eliminado' : 'restaurado'} correctamente`,
          user: deletedCustomer.value
        }

      return null
    }),
    isError: computed<string | null>(() => {
      if (updateError.value) return updateError.value.message.split(':')[1].trim()
      if (deleteError.value) return deleteError.value.message.split(':')[1].trim()
      return null
    })

    //? Methods
  }
}
