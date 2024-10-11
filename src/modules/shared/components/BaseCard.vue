<script setup lang="ts">
interface Props {
  loading: boolean
}
defineProps<Props>()
</script>

<template>
  <BlockUI class="w-full" :blocked="loading">
    <Card class="dark:bg-dark-950 dark:border-gray-700 border">
      <template #content>
        <slot />
      </template>
    </Card>
  </BlockUI>
</template>

<style scoped></style>
