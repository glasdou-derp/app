<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import BaseCard from './BaseCard.vue'
import { getLimitPaginationHelper } from '../helpers'
</script>

<template>
  <BaseCard
    :loading="false"
    v-for="index in getLimitPaginationHelper()"
    :key="index"
    class="max-w-full"
    :deleted="false"
  >
    <section class="flex flex-col gap-2">
      <Skeleton width="50%" height="2rem"></Skeleton>

      <Skeleton width="100%" height="5rem"></Skeleton>
      <div class="flex justify-end mt-1">
        <Skeleton width="50%" height="2rem"></Skeleton>
      </div>
    </section>
  </BaseCard>
</template>

<style scoped></style>
