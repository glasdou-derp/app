<script setup lang="ts">
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import type { DynamicField, DynamicSchema } from '../interfaces'
import CustomButton from './CustomButton.vue'

interface Props {
  schema: DynamicSchema
  btnLabel?: string
  initialValues?: Record<string, any>
}
const props = defineProps<Props>()
interface Emits {
  (event: 'submit', values: Record<string, any>): void
}
const emits = defineEmits<Emits>()

const onSubmit = (values: Record<string, any>) => emits('submit', values)

const validationSchema = createValidationSchema(props.schema.fields)
function createValidationSchema(fields: DynamicField[]) {
  const schemaShape: Record<string, any> = {}
  fields.forEach((field) => {
    const id = field.props.id
    schemaShape[id] = field.rules
  })
  return yup.object().shape(schemaShape)
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="validationSchema"
    class="flex flex-col gap-4"
    :initial-values="initialValues"
  >
    <template v-for="{ component, props } in schema.fields" :key="props.id">
      <Field :name="props.id" v-slot="{ field, errors }">
        <component :is="component" v-bind="{ ...field, ...props }" :error="errors[0]" />
      </Field>
    </template>
    <div class="flex justify-end gap-2">
      <CustomButton type="submit" :label="btnLabel" />
    </div>
  </Form>
</template>

<style scoped></style>
