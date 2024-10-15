<script setup lang="ts">
import { UserRole } from '@/modules/users/interfaces'
import { PrimeIcons as icons } from '@primevue/core/api'
import { computed, ref } from 'vue'
import { hasRole } from '../helpers'
import { useAuthStore } from '@/modules/auth/store/auth.store'

interface Props {
  isDeleted: boolean
}

interface Emits {
  (event: 'on:new'): void
  (event: 'on:delete'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const menu = ref()
const authStore = useAuthStore()

const items = computed(() => [
  {
    label: 'Opciones',
    items: [
      { label: 'Nuevo', icon: icons.PLUS_CIRCLE, command: () => emits('on:new') },
      {
        visible: hasRole(authStore.userRoles, UserRole.Admin),
        label: props.isDeleted ? 'Restaurar' : 'Eliminar',
        icon: props.isDeleted ? icons.UNDO : icons.TRASH,
        command: () => emits('on:delete')
      }
    ]
  }
])
const toggle = (event: MouseEvent) => menu.value.toggle(event)
</script>

<template>
  <Button
    type="button"
    icon="pi pi-ellipsis-v"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
    text
    rounded
  />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>

<style scoped></style>
