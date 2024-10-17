<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useNotification } from '@/modules/shared'
import ButtonsCard from '@shared/components/ButtonsCard.vue'
import { useCustomer } from '../composables'
import type { Customer } from '../interfaces'

interface Props {
  data: Customer
}

const props = defineProps<Props>()
const router = useRouter()
const { notifyInfo, notifyError } = useNotification()
const { deleteMutation, isPending, isSuccess, isError } = useCustomer()

watch(isSuccess, (value) => {
  if (!value) return
  notifyInfo({ detail: value.msg })
})

watch(isError, (value) => {
  if (!value) return
  notifyError({ detail: 'Ocurrió un error al procesar la solicitud' })
})
const handleMiddleClick = () => {
  const routeData = router.resolve({ name: 'customer.detail', params: { id: props.data.code } })
  window.open(routeData.href, '_blank')
}
</script>

<template>
  <ButtonsCard
    @on:edit:middle="handleMiddleClick"
    @on:edit="$router.push({ name: 'customer.detail', params: { code: data.code } })"
    @on:delete="deleteMutation({ id: data.id, isDeleted: !!data.deletedAt })"
    :loading="isPending"
    :deleted="!!data.deletedAt"
  >
    <section class="flex flex-col gap-2">
      <span class="text-xl">
        <Tag />
      </span>

      <span class="text-xl">
        <i :class="[icons.USER, 'mr-2']" />
        {{ data.name }}
      </span>

      <span class="text-lg text-muted-color">
        <i :class="[icons.ENVELOPE, 'mr-2']" />
        {{ data.email }}
      </span>
    </section>
  </ButtonsCard>
</template>

<style scoped></style>
