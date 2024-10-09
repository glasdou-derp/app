<script setup lang="ts">
import ButtonsCard from '@/modules/shared/components/ButtonsCard.vue'
import type { User } from '@/modules/users/interfaces'
import { useUser } from '../composables'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'

interface Props {
  user: User
}

defineProps<Props>()
const toast = useToast()
const { deleteMutation, isDeletePending, isDeleteSuccess, deletedUser } = useUser()

watch(isDeleteSuccess, (value) => {
  if (!value) return

  const isDeleted = deletedUser.value?.deletedAt

  toast.add({
    severity: isDeleted ? 'error' : 'info',
    summary: 'Éxito',
    detail: `Usuario ${isDeleted ? 'eliminado' : 'restaurado'} correctamente`,
    life: 1000
  })
})
</script>

<template>
  <BlockUI :blocked="isDeletePending">
    <ButtonsCard
      :created-at="user.createdAt"
      :created-by="user.creator"
      :deleted="!!user.deletedAt"
      @on:edit="$router.push({ name: 'user.detail', params: { id: user.username } })"
      @on:delete="deleteMutation({ userId: user.id, isDeleted: !!user.deletedAt })"
    >
      <template #title>@{{ user.username }}</template>
      <template #subtitle>{{ user.email }}</template>
      <template #content>
        <div class="flex gap-2">
          <Tag v-for="(role, index) in user?.roles" :key="index" rounded :value="role" />
        </div>
      </template>
    </ButtonsCard>
  </BlockUI>
</template>

<style scoped></style>
