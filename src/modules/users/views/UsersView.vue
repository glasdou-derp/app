<script setup lang="ts">
import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'

useConfigStore().setTitle('Usuarios')
const { users, lastPage, total, isFetching, isLoading, isPlaceholderData } = useUsers()
const { page } = usePagination()
</script>

<template>
  <ListPage
    :blockBody="isFetching && isPlaceholderData"
    title="Usuarios"
    label="Nuevo Usuario"
    @on:click="$router.push({ name: 'user.detail', params: { id: 'nuevo' } })"
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!users && users.length > 0"
    :pagination="{
      page,
      lastPage,
      totalRecords: total,
      loading: isLoading && !isPlaceholderData
    }"
  >
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </ListPage>
</template>

<style scoped></style>
