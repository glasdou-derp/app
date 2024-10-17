<script setup lang="ts">
import type { GenericObject } from 'vee-validate'
import { ref } from 'vue'

import { useConfigStore, useNotification } from '@/modules/shared'
import BaseCard from '@shared/components/BaseCard.vue'
import DynamicForm from '@shared/components/DynamicForm.vue'
import { useAuthStore } from '../store/auth.store'
import { dynamicLoginSchema } from '../schemas'
import { envs } from '@/config/envs'

useConfigStore().setTitle('Inicio de sesión')
const authStore = useAuthStore()
const { notifySuccess, notifyError } = useNotification()
const initialValues = {
  username: envs.mode === 'development' ? 'dev' : '',
  password: envs.mode === 'development' ? 'Dev@123' : ''
}

const loading = ref(false)
const error = ref<string | null>(null)
const onSubmit = async ({ username, password }: GenericObject) => {
  loading.value = true

  try {
    const ok = await authStore.login(username, password)

    if (!ok) {
      error.value = 'Credenciales incorrectas'
      return
    }

    notifySuccess({ detail: 'Inicio de sesión exitoso' })
  } catch (error) {
    notifyError({ detail: 'Ocurrió un error al iniciar sesión' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-[30rem] h-full mx-auto flex items-center flex-col justify-center">
    <h1 class="font-bold text-center text-2xl mb-5">Logo</h1>
    <BaseCard :loading="loading">
      <h4 class="text-center text-2xl mb-4">Inicio de sesión</h4>

      <DynamicForm
        :schema="dynamicLoginSchema"
        btn-label="Iniciar Sesión"
        @submit="onSubmit"
        :initial-values="initialValues"
      />
    </BaseCard>
  </div>
</template>
