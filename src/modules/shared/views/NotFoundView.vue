<script setup lang="ts">
import CustomButton from '../components/CustomButton.vue'
import BaseCard from '../components/BaseCard.vue'
</script>

<template>
  <!-- component -->
  <BaseCard class="sm:w-full md:w-1/2 xl:w-2/5 m-auto max-w-[30rem]">
    <template #content>
      <section class="flex flex-col justify-center items-center">
        <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider">404</p>
        <p
          class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider mt-4 text-muted-color-emphasis"
        >
          No encontrado
        </p>
        <p class="mt-4 pb-4 border-b-2 text-center text-muted-color">
          La página que buscas no existe o ha sido movida.
        </p>

        <CustomButton
          class="mt-6"
          label="Regresar al inicio"
          @click="$router.replace({ name: 'home' })"
        />
      </section>
    </template>
  </BaseCard>
</template>
