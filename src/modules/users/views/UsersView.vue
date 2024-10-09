<script setup lang="ts">
import CustomPagination from '@shared/components/CustomPagination.vue'
import ListPage from '@shared/components/ListPage.vue'
import { usePagination } from '@shared/composables/usePagination'
import { useConfigStore } from '@shared/stores/config.store'
import UserCard from '../components/UserCard.vue'
import { useUsers } from '../composables/useUsers'

useConfigStore().setTitle('Usuarios | OTP')
const { users, lastPage, total, isFetching, isLoading, isPlaceholderData } = useUsers()
const { page } = usePagination()
</script>

<template>
  <ListPage
    :blockBody="isFetching && isPlaceholderData"
    title="Usuarios"
    label="Nuevo Usuario"
    @on:click="
      $router.push({
        name: 'user.detail',
        params: { id: 'nuevo' }
      })
    "
    :btn-disabled="isLoading && !isPlaceholderData"
    :loading="isLoading && !isPlaceholderData"
    :has-data="!!users && users.length > 0"
  >
    <template #body>
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </template>
    <template #footer>
      <CustomPagination
        :page="page"
        :last-page="lastPage"
        :total-records="total"
        :loading="isLoading && !isPlaceholderData"
      />
    </template>
  </ListPage>
</template>

<style scoped></style>
