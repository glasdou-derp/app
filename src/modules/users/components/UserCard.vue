<script setup lang="ts">
import { watch } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'

import ButtonsCard from '@/modules/shared/components/ButtonsCard.vue'
import type { User } from '@/modules/users/interfaces'
import { useUser } from '../composables'
import { useNotification } from '@/modules/shared'

interface Props {
  data: User
}

defineProps<Props>()
const { notifyInfo, notifyError } = useNotification()
const { deleteMutation, isDeleteError, isPending, isSuccess } = useUser()

watch(isSuccess, (value) => {
  if (!value) return
  notifyInfo({ detail: value.msg })
})

watch(isDeleteError, (value) => {
  if (!value) return
  notifyError({ detail: 'Ocurrió un error al procesar la solicitud' })
})
</script>

<template>
  <ButtonsCard
    @on:edit="$router.push({ name: 'user.detail', params: { id: data.username } })"
    @on:delete="deleteMutation({ userId: data.id, isDeleted: !!data.deletedAt })"
    :user="data.createdBy"
    :date="data.createdAt"
    :loading="isPending"
    :deleted="!!data.deletedAt"
  >
    <section class="flex flex-col gap-2">
      <span class="text-xl">
        <i :class="[icons.USER, 'mr-2']" />
        @{{ data.username }}
      </span>

      <span class="text-lg text-muted-color">
        <i :class="[icons.ENVELOPE, 'mr-2']" />
        {{ data.email }}
      </span>

      <div class="flex gap-2">
        <Tag v-for="(role, index) in data?.roles" :key="index" rounded :value="role" />
      </div>
    </section>
  </ButtonsCard>
</template>

<style scoped></style>
