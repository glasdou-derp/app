<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'

interface Props {
  // Existing props
  disabled?: boolean
  error?: string
  id: string
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
const isPwd = ref(true)
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id as string">{{ label }}</label>
    <IconField>
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
        :type="isPwd ? 'password' : 'text'"
      />
      <InputIcon :class="isPwd ? icons.EYE : icons.EYE_SLASH" @click="isPwd = !isPwd" />
    </IconField>
    <transition name="p-message" tag="div" class="flex flex-col">
      <Message v-if="hasError" severity="error">{{ error }}</Message>
    </transition>
  </div>
</template>

<style scoped>
#password-btn {
  padding: 0 0;
}
</style>
