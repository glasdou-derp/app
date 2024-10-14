<script setup lang="ts">
import type { UserRelatedMeta } from '@/modules/users'
import { PrimeIcons as icons } from '@primevue/core/api'
import EntityDetail from './EntityDetail.vue'
import MenuPopup from './MenuPopup.vue'
import CustomButton from './CustomButton.vue'
import BaseCard from './BaseCard.vue'

interface Props {
  deleted: boolean
  loading: boolean
  canSubmit: boolean
  relations: UserRelatedMeta[]
  title: string
}
defineProps<Props>()
defineEmits(['on:new', 'on:delete', 'on:submit', 'on:back'])
</script>

<template>
  <section class="flex justify-center">
    <BaseCard class="w-full max-w-[50rem]" :deleted="deleted" :loading="loading">
      <section class="flex gap-2 mb-4">
        <h2 class="text-2xl font-semibold flex items-center flex-wrap gap-2 flex-1">
          <Button
            v-tooltip.top="'Regresar'"
            @click="$emit('on:back')"
            :icon="icons.ANGLE_LEFT"
            icon-class="text-3xl"
            text
            rounded
          />
          <span class="text-3xl">{{ title }}</span>
          <Tag v-if="deleted" severity="danger">Eliminado</Tag>
        </h2>
        <MenuPopup
          :is-deleted="deleted"
          @on:new="$emit('on:new')"
          @on:delete="$emit('on:delete')"
        />
      </section>
      <form @submit.prevent="$emit('on:submit')" class="flex flex-col gap-6" v-focustrap>
        <slot />

        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <CustomButton
            type="submit"
            label="Guardar cambios"
            :disabled="!canSubmit"
            :loading="loading"
          />
        </div>

        <EntityDetail :data="relations" v-if="relations.length > 0" />
      </form>
    </BaseCard>
  </section>
</template>
