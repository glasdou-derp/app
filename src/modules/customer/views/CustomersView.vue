<script setup lang="ts">
import { reactive } from 'vue'

import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import CustomerCard from '../components/CustomerCard.vue'
import { useCustomers } from '../composables'

useConfigStore().setTitle('Clientes')
const { customers, lastPage, total, isFetching, isLoading, isPlaceholderData } = useCustomers()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total, loading: isLoading && !isPlaceholderData })
</script>

<template>
  <ListPage
    title="Clientes"
    @on:click="$router.push({ name: 'customer.detail', params: { code: 'nuevo' } })"
    :blockBody="isFetching && isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :pagination="pagination"
    :data="customers"
    :component="CustomerCard"
  />
</template>

<style scoped></style>
