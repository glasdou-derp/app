import type { GenericObject } from 'vee-validate'
import type { Component, ComputedRef, Ref } from 'vue'
import * as yup from 'yup'

export interface DynamicSchema {
  fields: DynamicField[]
}

export interface DynamicField {
  component: Component
  rules: yup.AnySchema
  autofocus?: boolean
  props: DynamicFieldProps
}

export interface FormSetup {
  fields: Array<FormSetupField>
  errors: ComputedRef<Partial<Record<string, string | undefined>>>
  handleSubmit: (callback: (values: GenericObject) => void) => (e: Event) => void
  resetForm: () => void
}

export interface FormSetupField extends DynamicField {
  fieldValue: Ref<any>
  error: Ref<string | undefined>
  // fieldAttrs: Ref<BaseFieldProps & GenericObject>
}

export interface DynamicFieldProps {
  id: string
  disabled?: boolean
  error?: string
  label?: string
  modelValue?: string
  placeholder?: string
  size?: 'large' | 'small'
  variant?: 'outlined' | 'filled'
  loading?: boolean
  invalid?: boolean
  autofocus?: boolean
}
