<script lang="ts" src="./UserView.ts" />

<template>
  <section class="flex justify-center" v-if="user">
    <BaseCard class="w-full max-w-[50rem]" :deleted="!!user.deletedAt">
      <template #title>
        <section class="flex gap-2">
          <h2 class="text-2xl font-semibold flex items-center flex-wrap gap-2 flex-1">
            <Button
              v-tooltip.top="'Regresar'"
              @click="$router.push({ name: 'user.list' })"
              :icon="icons.ANGLE_LEFT"
              icon-class="text-3xl"
              text
              rounded
            />
            <span>Usuario</span>
            <Tag v-if="!!user.deletedAt" severity="danger">Eliminado</Tag>
          </h2>
          <MenuPopup
            :is-deleted="!!user.deletedAt"
            @on:new="onNewUser"
            @on:delete="onDeleteRestore(user.id, !!user.deletedAt)"
          />
        </section>
      </template>
      <template #content>
        <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
          <!-- Code -->
          <CustomInputText
            id="username"
            label="Nombre de Usuario"
            v-model="username"
            v-bind="usernameAttrs"
            :error="errors.username"
            autofocus
          />

          <CustomInputText
            id="email"
            label="Correo Electrónico"
            v-model="email"
            v-bind="emailAttrs"
            :error="errors.email"
            autofocus
          />

          <!-- Roles -->
          <Fieldset legend="Roles">
            <section class="flex justify-start items-center flex-wrap gap-2 mb-2">
              <Button
                v-for="(item, index) in UserRole"
                :key="index"
                :label="item"
                :outlined="!hasRole(item)"
                @click="toggleRole(item)"
              />
            </section>
            <transition name="p-message" tag="section" class="flex flex-col">
              <Message v-if="errors.roles" severity="error">{{ errors.roles }}</Message>
            </transition>
          </Fieldset>

          <!-- Meta Data (Read-only) -->
          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <Fieldset legend="Creado Por" v-if="user.creator">
              <p class="m-0">
                <span class="flex items-center text-muted-color">
                  <i :class="icons.USER"></i>
                  <span class="ml-2">@{{ user.creator?.username }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.ENVELOPE"></i>
                  <span class="ml-2">{{ user.creator?.email }}</span>
                </span>
                <span class="flex items-center text-muted-color">
                  <i :class="icons.CALENDAR"></i>
                  <span class="ml-2">{{ Formatter.getDate(user.createdAt) }}</span>
                </span>
              </p>
            </Fieldset>
          </section>

          <!-- Submit Button -->
          <div class="flex justify-end gap-2">
            <CustomButton
              type="submit"
              label="Guardar cambios"
              :disabled="!meta.dirty && meta.valid"
              :loading="isPending"
            />
          </div>
        </form>
      </template>
    </BaseCard>
    <UserCredentialDialog
      :visible="isVisible"
      :username="user.username"
      :password="password"
      @update:visible="onUpdateVisible"
    />
  </section>
</template>
