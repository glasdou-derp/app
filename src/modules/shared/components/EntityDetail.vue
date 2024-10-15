<script setup lang="ts">
import type { UserRelatedMeta } from '@/modules/users'
import { PrimeIcons as icons } from '@primevue/core/api'
import { Formatter } from '../helpers'

interface Props {
  data: UserRelatedMeta[]
}
defineProps<Props>()
</script>

<template>
  <Accordion :expand-icon="icons.PLUS" :collapse-icon="icons.MINUS">
    <AccordionPanel value="1" class="!border-none">
      <AccordionHeader>Información Adicional</AccordionHeader>
      <AccordionContent>
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <template v-for="({ date, title, user }, index) in data" :key="index">
            <Fieldset :legend="title" v-if="user">
              <p class="m-0">
                <span class="flex items-center text-muted-color">
                  <i :class="icons.USER"></i>
                  <span class="ml-2">@{{ user?.username }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.ENVELOPE"></i>
                  <span class="ml-2">{{ user?.email }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.CALENDAR"></i>
                  <span class="ml-2">{{ Formatter.getDate(date) }}</span>
                </span>
              </p>
            </Fieldset>
          </template>
        </section>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped></style>
