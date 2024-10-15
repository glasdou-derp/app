<script setup lang="ts">
interface Props {
  loading?: boolean
  deleted?: boolean
}
withDefaults(defineProps<Props>(), {
  deleted: false,
  loading: false
})
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
      </BlockUI>
    </template>
  </Card>
</template>

<style scoped></style>
