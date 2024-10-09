<script setup lang="ts">
import type { UserSummary } from '@/modules/users/interfaces'
import { Formatter } from '@shared/helpers/formatter.helper'
import { PrimeIcons as icons } from '@primevue/core/api'
import type { PopoverMethods } from 'primevue/popover'
import { ref } from 'vue'

interface Props {
  user: UserSummary | null | undefined
  createdAt: string | Date
  title: string
}

withDefaults(defineProps<Props>(), {
  title: 'Creado:'
})
defineEmits(['on:open', 'on:close'])

const op = ref<PopoverMethods | null>(null)

const open = (evt: MouseEvent) => {
  op.value?.toggle(evt)
}

const close = () => {
  op.value?.hide()
}

defineExpose({ open, close })
</script>

<template>
  <Popover ref="op">
    <div class="flex flex-col">
      <span class="font-medium block mb-2">{{ title }}</span>

      <span class="flex items-center text-muted-color">
        <i :class="icons.USER"></i>
        <span class="ml-2">@{{ user?.username }}</span>
      </span>
      <span class="flex items-center text-muted-color">
        <i :class="icons.ENVELOPE"></i>
        <span class="ml-2">{{ user?.email }}</span>
      </span>
      <span class="flex items-center text-muted-color">
        <i :class="icons.CALENDAR"></i>
        <span class="ml-2">{{ Formatter.getDate(createdAt) }}</span>
      </span>
    </div>
  </Popover>
</template>

<style scoped></style>
