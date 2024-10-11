<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
  // Existing props
  id?: string // Made optional since 'id' may come from $attrs
  disabled?: boolean
  error?: string
  label?: string
  modelValue?: string
  placeholder?: string
  loading?: boolean
  autofocus?: boolean
}

const props = defineProps<Props>()
defineEmits(['update:modelValue', 'blur'])
const attrs = useAttrs()
const hasError = computed(() => Boolean(props.error))
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="attrs.id as string">{{ label }}</label>
    <InputText
      v-bind="attrs"
      :id="id"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      @blur="$emit('blur')"
      :invalid="hasError"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :autofocus="autofocus"
      fluid
    />
    <transition name="p-message" tag="div" class="flex flex-col">
      <Message v-if="hasError" severity="error">{{ error }}</Message>
    </transition>
  </div>
</template>

<style scoped>
.expand-enter-to,
.expand-leave-from {
  height: 1.5rem;
}
</style>
