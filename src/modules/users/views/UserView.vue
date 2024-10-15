<script lang="ts" src="./UserView.ts" />

<template>
  <DetailPlaceholder
    v-if="user"
    :deleted="Boolean(user.deletedAt)"
    :loading="isPending"
    :canSubmit="meta.valid && meta.dirty"
    :relations="getUserRelatedData"
    :title="user.username"
    @on:back="$router.push({ name: 'user.list' })"
    @on:new="onNewUser"
    @on:delete="onDeleteRestore(user.id, !!user.deletedAt)"
    @on:submit="onSubmit"
  >
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
    />

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
        <Message v-if="meta.dirty && errors.roles" severity="error">{{ errors.roles }}</Message>
      </transition>
    </Fieldset>
    <UserCredentialDialog
      :visible="isVisible"
      :username="user.username"
      :password="password"
      @update:visible="onUpdateVisible"
    />
  </DetailPlaceholder>
</template>
