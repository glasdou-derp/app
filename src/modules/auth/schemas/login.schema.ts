import * as yup from 'yup'

import CustomInputPassword from '@shared/components/CustomInputPassword.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import type { DynamicSchema } from '@shared/interfaces'

export const loginSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required()
})

export const dynamicLoginSchema: DynamicSchema = {
  fields: [
    {
      component: CustomInputText,
      rules: yup.string().required().min(3),
      autofocus: true,
      props: {
        id: 'username',
        label: 'Username'
      }
    },
    {
      component: CustomInputPassword,
      rules: yup.string().required(),
      props: {
        id: 'password',
        label: 'Password'
      }
    }
  ]
} as const
