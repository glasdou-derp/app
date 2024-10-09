<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import BaseCard from './BaseCard.vue'
import { getLimitPaginationHelper } from '../helpers'
</script>

<template>
  <BaseCard v-for="index in getLimitPaginationHelper()" :key="index" class="max-w-full">
    <template #title>
      <Skeleton width="50%"></Skeleton>
    </template>
    <template #subtitle>
      <Skeleton width="70%"></Skeleton>
    </template>
    <template #content>
      <Skeleton width="100%" height="4rem"></Skeleton>
    </template>
    <template #footer>
      <div class="flex justify-end mt-1">
        <Skeleton width="50%" height="3rem"></Skeleton>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped></style>
