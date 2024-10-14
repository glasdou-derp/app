import { PrimeIcons as icons } from '@primevue/core/api'
import { useQuery } from '@tanstack/vue-query'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import EntityDetail from '@/modules/shared/components/EntityDetail.vue'
import { UserRole, type UserRelatedMeta } from '@/modules/users/interfaces'
import BaseCard from '@shared/components/BaseCard.vue'
import CustomButton from '@shared/components/CustomButton.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import MenuPopup from '@shared/components/MenuPopup.vue'
import { Formatter } from '@shared/helpers/formatter.helper'
import { useConfigStore } from '@shared/stores/config.store'
import { getUserByUsernameAction } from '../actions'
import UserCredentialDialog from '../components/UserCredentialDialog.vue'
import { useUser } from '../composables'
import { userSchema } from '../schemas/user.schema'

export default defineComponent({
  props: { id: { type: String, required: true } },
  components: {
    BaseCard,
    CustomInputText,
    CustomButton,
    MenuPopup,
    UserCredentialDialog,
    EntityDetail
  },
  setup: (props) => {
    const router = useRouter()
    const { notifySuccess, notifyInfo } = useNotification()
    const isVisible = ref(false)
    const password = ref('')
    const { deleteMutation, updateMutation, isPending, isSuccess, isDeleteError, isUpdateError } =
      useUser()

    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: userSchema
    })
    const [username, usernameAttrs] = defineField('username')
    const [email, emailAttrs] = defineField('email')
    const { fields: roles, remove: removeRole, push: pushRoles } = useFieldArray<UserRole>('roles')

    const {
      data: user,
      isError,
      isLoading,
      refetch
    } = useQuery({
      queryKey: ['user', props.id],
      queryFn: () => getUserByUsernameAction(props.id),
      retry: false
    })

    const toggleRole = (role: UserRole) => {
      const currentRoles = roles.value.map((r) => r.value)
      const hasRole = currentRoles.includes(role)

      hasRole ? removeRole(currentRoles.indexOf(role)) : pushRoles(role)
    }

    const onSubmit = handleSubmit(async (values) => updateMutation(values))

    const onDeleteRestore = (userId: string | undefined, isDeleted: boolean) => {
      if (!userId) return
      deleteMutation({ userId, isDeleted })
    }

    const onNewUser = (): void => {
      if (!user) {
        router.replace({ name: 'user.detail', params: { id: 'nuevo' } })
        return
      }

      router.push({ name: 'user.detail', params: { id: 'nuevo' } })
    }

    const onUpdateVisible = (state: boolean) => {
      isVisible.value = state
      password.value = ''
    }

    watch([isError, isLoading], ([error, loading]) => {
      if (error && !loading) router.replace({ name: 'not.found' })
    })

    watch([isDeleteError, isUpdateError], (val) => {
      if (!val) return
      notifyInfo({ detail: 'Ha ocurrido un error al procesar la solicitud' })
    })

    watch(
      user,
      () => {
        if (!user.value) return
        const { username } = user.value
        useConfigStore().setTitle(username ? `${username}` : 'Nuevo usuario')
        resetForm({ values: user.value })
      },
      { immediate: true }
    )

    watch(isSuccess, (val) => {
      if (!val) return
      notifySuccess({ detail: val.msg })
      resetForm({ values: val.user })
    })

    watch(
      () => props.id,
      () => refetch()
    )

    return {
      //* Props
      icons,
      user,
      meta,
      errors,
      isPending,
      UserRole,
      isVisible,
      password,

      //* Form
      username,
      usernameAttrs,
      email,
      emailAttrs,
      roles,

      //! Getters
      getUserRelatedData: computed<UserRelatedMeta[]>(() => {
        if (!user.value) return []

        return [
          { title: 'Creado por:', user: user.value.createdBy, date: user.value.createdAt },
          { title: 'Actualizado por:', user: user.value.updatedBy, date: user.value.updatedAt },
          { title: 'Eliminado por:', user: user.value.deletedBy, date: user.value.deletedAt }
        ]
      }),

      //? Methods
      onSubmit,
      toggleRole,
      Formatter,
      hasRole: (role: UserRole) => roles.value.map((r) => r.value).includes(role),
      onDeleteRestore,
      onNewUser,
      onUpdateVisible
    }
  }
})
