<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'

import LoadingListPage from '@shared/components/LoadingListPage.vue'
import { useConfigStore } from '../stores/config.store'
import CustomButton from './CustomButton.vue'
import CustomPagination from './CustomPagination.vue'
import type { Pagination } from '../interfaces'

interface Props {
  blockBody: boolean
  title: string
  label: string
  btnDisabled: boolean
  loading: boolean
  hasData: boolean
  pagination: Pagination
}

withDefaults(defineProps<Props>(), { blockBody: false })
defineEmits(['on:click'])

const configStore = useConfigStore()
const { isMobile } = storeToRefs(configStore)
</script>

<template>
  <section class="mb-4 border-b-2 border-b-gray-300 dark:border-b-gray-700 py-4">
    <div class="flex justify-between">
      <h1 class="text-4xl font-semibold">{{ title }}</h1>
      <CustomButton
        :label="isMobile ? '' : label"
        @click="$emit('on:click')"
        :icon="icons.PLUS"
        icon-pos="right"
        :disabled="btnDisabled"
      />
    </div>
  </section>
  <BlockUI :blocked="blockBody">
    <section class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <LoadingListPage v-if="loading" />

      <article
        v-if="!hasData && !loading"
        class="mt-4 col-span-full flex justify-center items-center gap-3 w-full text-4xl text-muted-color-emphasis"
      >
        <i :class="[icons.EXCLAMATION_CIRCLE, '!text-4xl']" />
        <span>No se encontraron registros</span>
      </article>

      <slot v-else />
    </section>
    <section class="py-8">
      <CustomPagination
        :page="pagination.page"
        :last-page="pagination.lastPage"
        :total-records="pagination.totalRecords"
        :loading="pagination.loading"
      />
    </section>
  </BlockUI>
</template>

<style scoped></style>
