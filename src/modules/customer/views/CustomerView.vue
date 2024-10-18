<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import { computed, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useConfigStore, useNotification, type AuditInfo } from '@/modules/shared'
import CustomInputText from '@shared/components/CustomInputText.vue'
import DetailPlaceholder from '@shared/components/DetailPlaceholder.vue'
import { getCustomerAction } from '../actions'
import { useCustomer } from '../composables'
import { customerSchema } from '../schema/customer.schema'

interface Props {
  code: string
}
const props = defineProps<Props>()
const { code } = toRefs(props)
const router = useRouter()
const { notifyError, notifyInfo } = useNotification()
const { resetForm, meta, errors, name, nameAttrs, email, emailAttrs, onSubmit, onDeleteRestore } =
  configureForm()
const { deleteMutation, isError, isPending, isSuccess, updateMutation } = useCustomer()
const { customer, auditInfo, refetch } = getCustomer()

watch(isSuccess, (val) => {
  if (!val) return
  val.msg.includes('eliminado') ? notifyError({ detail: val.msg }) : notifyInfo({ detail: val.msg })

  router.replace({ name: 'customer.detail', params: { code: customer.value?.code } })
  resetForm({ values: val.user })
})

watch(isError, (val) => {
  if (!val) return
  notifyError({ detail: val })
})

watch(
  () => code,
  () => refetch()
)

function getCustomer() {
  const {
    data: customer,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryFn: () => getCustomerAction(code.value),
    queryKey: ['customer', code],
    retry: false
  })

  const auditInfo = computed<AuditInfo[]>(() => {
    if (!customer.value || customer.value.id === '') return []
    const { createdBy, createdAt, updatedBy, updatedAt, deletedBy, deletedAt } = customer.value
    return [
      { user: createdBy, date: createdAt, title: 'Creado por' },
      { user: updatedBy, date: updatedAt, title: 'Actualizado por' },
      { user: deletedBy, date: deletedAt, title: 'Eliminado por' }
    ].filter((info) => info.user && info.date)
  })
  const notFound = computed(() => !isLoading && isError)

  watch(
    customer,
    () => {
      if (!customer.value) return
      const { name } = customer.value
      useConfigStore().setTitle(name ? `${name}` : 'Nuevo cliente')
      resetForm({ values: customer.value })
    },
    { immediate: true }
  )

  watch(notFound, (val) => {
    if (val) router.replace({ name: 'not.found' })
  })

  return { customer, auditInfo, refetch }
}

function configureForm() {
  const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
    validationSchema: customerSchema
  })

  const [name, nameAttrs] = defineField('name')
  const [email, emailAttrs] = defineField('email')

  const onSubmit = handleSubmit((values) => updateMutation(values))
  const onDeleteRestore = (id: string | undefined, isDeleted: boolean) => {
    if (!id) return
    deleteMutation({ id, isDeleted })
  }

  return {
    name,
    nameAttrs,
    email,
    emailAttrs,
    errors,
    meta,

    onSubmit,
    onDeleteRestore,
    resetForm
  }
}
</script>

<template>
  <DetailPlaceholder
    v-if="customer"
    :deleted="Boolean(customer.deletedAt)"
    :loading="isPending"
    :canSubmit="meta.valid && meta.dirty"
    :relations="auditInfo"
    :title="customer.name"
    @on:back="$router.push({ name: 'customer.list' })"
    @on:new="$router.push({ name: 'customer.detail', params: { code: 'nuevo' } })"
    @on:delete="onDeleteRestore(customer.id, !!customer.deletedAt)"
    @on:submit="onSubmit"
  >
    <CustomInputText
      id="name"
      label="Nombre"
      v-model="name"
      v-bind="nameAttrs"
      :error="errors.name"
      autofocus
    />

    <CustomInputText
      id="email"
      label="Correo Electrónico"
      v-model="email"
      v-bind="emailAttrs"
      :error="errors.email"
    />
  </DetailPlaceholder>
</template>
