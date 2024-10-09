<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { CardSlots } from 'primevue/card'
import { ref } from 'vue'

import type { UserSummary } from '@/modules/users/interfaces'
import { useAuthStore } from '@/modules/auth/store/auth.store'
import CustomButton from './CustomButton.vue'
import InfoPopover from './InfoPopover.vue'

interface Props {
  deleted?: boolean
  createdBy?: UserSummary | null
  createdAt?: string | Date
}

withDefaults(defineProps<Props>(), { deleted: false })
defineSlots<CardSlots>()
defineEmits(['on:edit', 'on:delete'])

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
      'dark:bg-dark-950 dark:border-gray-700 border',
      { ' border-primary-400': !deleted },
      { 'border-red-500 dark:border-red-600': deleted }
    ]"
  >
    <!-- Use the slots here -->
    <template #header>
      <slot name="header" />
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <section class="flex justify-between flex-row-reverse gap-2">
        <section class="flex gap-2">
          <template v-if="createdBy && createdAt">
            <CustomButton
              v-tooltip.top="'Info'"
              @click="toggleInfo"
              :icon="icons.INFO"
              icon-class="text-3xl"
              severity="contrast"
            />
            <InfoPopover
              title="Creado por:"
              ref="popRef"
              :user="createdBy"
              :created-at="createdAt"
            />
          </template>
          <CustomButton
            v-tooltip.top="'Editar'"
            @click="$emit('on:edit')"
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
    </template>
  </Card>
</template>

<style scoped></style>
