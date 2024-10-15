import { PrimeIcons as icons } from '@primevue/core/api'
import { useQuery } from '@tanstack/vue-query'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared/'
import { UserRole, type UserRelatedMeta } from '@/modules/users/interfaces'
import BaseCard from '@shared/components/BaseCard.vue'
import CustomButton from '@shared/components/CustomButton.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import DetailPlaceholder from '@shared/components/DetailPlaceholder.vue'
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
    DetailPlaceholder
  },
  setup: (props) => {
    const router = useRouter()
    const { notifyInfo, notifyError } = useNotification()
    const {
      deleteMutation,
      updateMutation,
      isError: isUserMutationError,
      isSuccess,
      isPending
    } = useUser()
    const { isVisible, password, closeDialog } = handlePassword()
    const { roles, resetForm, user, notFound, refetch, ...formData } = setupForm()

    watch(
      () => notFound,
      (val) => {
        if (val) router.replace({ name: 'not.found' })
      }
    )

    watch(isUserMutationError, (val) => {
      if (!val) return
      notifyError({ detail: val })
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

      if (val.user?.password) {
        password.value = val.user.password
        isVisible.value = true
      }

      val.msg.includes('eliminado')
        ? notifyError({ detail: val.msg })
        : notifyInfo({ detail: val.msg })

      router.replace({ name: 'user.detail', params: { id: val.user?.username } })
      resetForm({ values: val.user })
    })

    watch(
      () => props.id,
      () => refetch()
    )

    function setupForm() {
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

      const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
        validationSchema: userSchema,
        validateOnMount: false
      })
      const [username, usernameAttrs] = defineField('username')
      const [email, emailAttrs] = defineField('email')
      const {
        fields: roles,
        remove: removeRole,
        push: pushRoles
      } = useFieldArray<UserRole>('roles')

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

      return {
        user,
        notFound: !isLoading.value && isError.value,
        refetch,
        username,
        usernameAttrs,
        email,
        emailAttrs,
        roles,
        errors,
        meta,
        onSubmit,
        toggleRole,
        onDeleteRestore,
        onNewUser,
        resetForm
      }
    }

    function handlePassword() {
      const isVisible = ref(false)
      const password = ref('')

      const closeDialog = (state: boolean) => {
        isVisible.value = state
        password.value = ''
      }

      return { isVisible, password, closeDialog }
    }

    return {
      //* Props
      icons,
      user,
      UserRole,
      isVisible,
      password,
      isPending,

      //* Form
      ...formData,

      //! Getters
      getUserRelatedData: computed<UserRelatedMeta[]>(() => {
        if (!user.value || user.value.id === '') return []

        return [
          { title: 'Creado por:', user: user.value.createdBy, date: user.value.createdAt },
          { title: 'Actualizado por:', user: user.value.updatedBy, date: user.value.updatedAt },
          { title: 'Eliminado por:', user: user.value.deletedBy, date: user.value.deletedAt }
        ]
      }),

      //? Methods
      Formatter,
      hasRole: (role: UserRole) => roles.value.map((r) => r.value).includes(role),
      closeDialog
    }
  }
})
