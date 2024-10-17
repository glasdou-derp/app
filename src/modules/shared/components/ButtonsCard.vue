<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref } from 'vue'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import type { UserSummary } from '@/modules/users'
import InfoPopover from './InfoPopover.vue'
import CustomButton from './CustomButton.vue'

interface Props {
  loading: boolean
  user?: UserSummary | null
  date?: Date | string | null
  deleted: boolean
}
defineProps<Props>()
defineEmits(['on:edit', 'on:edit:middle', 'on:delete'])
const authStore = useAuthStore()

const popRef = ref<any>(null)
const toggleInfo = (evt: MouseEvent) => {
  if (!popRef.value) return

  popRef.value.open(evt)
}
</script>

<template>
  <Card
    :class="[
      'w-full dark:bg-dark-950 dark:border-gray-700 border',
      { ' border-primary-400': !deleted },
      { 'border-red-500 dark:border-red-600': deleted }
    ]"
  >
    <template #content>
      <BlockUI :blocked="loading">
        <slot />
        <section class="flex justify-between flex-row-reverse gap-2 mt-2">
          <section class="flex gap-2">
            <template v-if="user">
              <CustomButton
                v-tooltip.top="'Info'"
                @click="toggleInfo"
                :icon="icons.INFO"
                icon-class="text-3xl"
                severity="contrast"
              />
              <InfoPopover title="Creado por:" ref="popRef" :user="user" :created-at="date" />
            </template>
            <CustomButton
              v-tooltip.top="'Editar'"
              @click="$emit('on:edit')"
              @click:middle="$emit('on:edit:middle')"
              :icon="icons.PENCIL"
              severity="info"
            />
            <CustomButton
              v-tooltip.top="deleted ? 'Restaurar' : 'Eliminar'"
              @click="$emit('on:delete')"
              :icon="deleted ? icons.UNDO : icons.TRASH"
              :severity="deleted ? 'secondary' : 'danger'"
              v-if="authStore.isAdmin"
            />
          </section>
          <Tag v-if="deleted" severity="danger">Eliminado</Tag>
        </section>
      </BlockUI>
    </template>
  </Card>
</template>

<style scoped></style>
