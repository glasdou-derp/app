<script setup lang="ts">
import { computed } from 'vue'
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'

import { useConfigStore } from '../stores/config.store'

interface Props {
  totalRecords: number
  page: number
  lastPage: number
  loading: boolean
}

const props = defineProps<Props>()
const configStore = useConfigStore()
const { isMobile } = storeToRefs(configStore)
const visiblePages = computed(() => {
  const visible = []
  const startPage = Math.max(1, props.page - 2)
  const endPage = Math.min(props.lastPage, props.page + 2)

  for (let i = startPage; i <= endPage; i++) visible.push(i)

  return visible
})
</script>

<template>
  <article class="flex justify-center items-center py-10 gap-2" v-if="lastPage > 1">
    <Button
      text
      rounded
      :icon="icons.ANGLE_DOUBLE_LEFT"
      :disabled="page === 1"
      :class="{ disabled: page === 1 }"
      @click="$router.push({ query: { page: 1 } })"
    />
    <Button
      text
      rounded
      :icon="icons.ANGLE_LEFT"
      :disabled="page === 1"
      :class="{ disabled: page === 1 }"
      @click="$router.push({ query: { page: page - 1 } })"
    />

    <span v-if="isMobile" class="mx-4 dark:text-muted-color">{{ page }} de {{ lastPage }}</span>

    <Button
      v-else
      v-for="p in visiblePages"
      :key="p"
      :text="page !== p"
      rounded
      class="w-10"
      @click="$router.push({ query: { page: p } })"
      :label="p.toString()"
    />

    <Button
      text
      rounded
      :icon="icons.ANGLE_RIGHT"
      :disabled="page === lastPage"
      :class="{ disabled: page === lastPage }"
      @click="$router.push({ query: { page: page + 1 } })"
    />
    <Button
      text
      rounded
      :icon="icons.ANGLE_DOUBLE_RIGHT"
      :disabled="page === lastPage"
      :class="{ disabled: page === lastPage }"
      @click="$router.push({ query: { page: lastPage } })"
    />
  </article>
  <article
    v-if="loading"
    class="flex justify-center items-center py-10 gap-2 sm:w-full md:max-w-[22rem] m-auto"
  >
    <Skeleton shape="circle" width="15%" height="3rem" />
    <Skeleton shape="circle" width="15%" height="3rem" />
    <Skeleton width="40%" height="3rem" borderRadius="16px" />
    <Skeleton shape="circle" width="15%" height="3rem" />
    <Skeleton shape="circle" width="15%" height="3rem" />
  </article>
</template>

<style scoped>
.disabled {
  @apply cursor-not-allowed;
}
</style>
