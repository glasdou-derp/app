<script setup lang="ts">
import type { ButtonProps } from 'primevue/button'
import { useConfigStore } from '../stores/config.store'

interface Props {
  className?: string
  label?: string
  severity?: ButtonProps['severity']
  outlined?: boolean
  fluid?: boolean
  icon?: string
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  iconClass?: string
  text?: boolean
  plain?: boolean
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  type?: ButtonProps['type']
}
withDefaults(defineProps<Props>(), {
  className: '',
  severity: 'primary',
  outlined: false,
  fluid: false,
  type: 'button'
})
defineEmits(['click', 'click:middle'])
const configStore = useConfigStore()
</script>

<template>
  <Button
    :outlined="configStore.darkTheme ? true : undefined"
    :label="label"
    :severity="severity"
    :fluid="fluid"
    :icon="icon"
    :iconPos="iconPos"
    :text="text"
    :plain="plain"
    :disabled="disabled"
    :loading="loading"
    :loadingIcon="loadingIcon"
    :type="type"
    :class="className"
    :iconClass="`!${iconClass}`"
    @click="$emit('click', $event)"
    @mousedown.middle="$emit('click:middle', $event)"
  />
</template>

<style scoped></style>
