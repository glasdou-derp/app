<script setup lang="ts">
import { reactive } from 'vue'

import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'

useConfigStore().setTitle('Usuarios')
const { users, lastPage, total, isFetching, isLoading, isPlaceholderData } = useUsers()
const { page } = usePagination()
const pagination = reactive({ page, lastPage, total, loading: isLoading && !isPlaceholderData })
</script>

<template>
  <ListPage
    title="Usuarios"
    @on:click="$router.push({ name: 'user.detail', params: { id: 'nuevo' } })"
    :blockBody="isFetching && isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :pagination="pagination"
    :data="users"
    :component="UserCard"
  />
</template>

<style scoped></style>
