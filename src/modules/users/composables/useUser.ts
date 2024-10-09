import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUpdateUserAction, deleteRestoreUserAction } from '../actions'
import type { DeleteRestoreUser } from '../interfaces'

export const useUser = () => {
  const queryClient = useQueryClient()

  const {
    mutate: updateMutation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    data: updatedUser
  } = useMutation({
    mutationFn: createUpdateUserAction
  })

  const {
    mutate: deleteMutation,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
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
    isUpdatePending,
    isUpdateSuccess,
    updatedUser,

    deleteMutation,
    isDeletePending,
    isDeleteSuccess,
    deletedUser

    //! Getters

    //? Methods
  }
}
