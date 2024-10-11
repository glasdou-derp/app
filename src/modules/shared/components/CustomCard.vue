<script setup lang="ts">
import type { CardSlots } from 'primevue/card'

import type { UserSummary } from '@/modules/users/interfaces'

interface Props {
  deleted?: boolean
  createdBy?: UserSummary | null
  createdAt?: string | Date
}

withDefaults(defineProps<Props>(), { deleted: false })
defineSlots<CardSlots>()
defineEmits(['on:info', 'on:edit', 'on:delete'])
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
      <slot name="footer" />
    </template>
  </Card>
</template>

<style scoped></style>
