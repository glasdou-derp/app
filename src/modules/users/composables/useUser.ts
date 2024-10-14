import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { createUpdateUserAction, deleteRestoreUserAction } from '../actions'
import type { DeleteRestoreUser } from '../interfaces'

export const useUser = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    data: updatedUser
  } = useMutation({
    mutationFn: createUpdateUserAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    data: deletedUser
  } = useMutation({
    mutationFn: ({ userId, isDeleted }: DeleteRestoreUser) =>
      deleteRestoreUserAction(userId, isDeleted),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.setQueryData(['user', data.username], data)
    }
  })

  return {
    //* Props
    updateMutation,
    deleteMutation,
    isUpdateError,
    isDeleteError,

    //! Getters
    isPending: computed(() => isUpdatePending.value || isDeletePending.value),
    isSuccess: computed(() => {
      if (!updatedUser.value && !deletedUser.value) return null

      if (isUpdateSuccess.value)
        return { msg: 'Usuario actualizado correctamente', user: updatedUser.value }
      if (isDeleteSuccess.value)
        return {
          msg: `Usuario ${deletedUser.value?.deletedAt ? 'eliminado' : 'restaurado'} correctamente`,
          user: deletedUser.value
        }

      return null
    })

    //? Methods
  }
}
