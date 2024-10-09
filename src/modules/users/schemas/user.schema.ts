import { UserRole } from '@/modules/users/interfaces'

import * as yup from 'yup'

export const userSchema = yup.object().shape({
  username: yup.string().min(2).trim().lowercase().required(),
  email: yup.string().email().trim().lowercase().required(),
  roles: yup
    .array()
    .of(yup.mixed<UserRole>().oneOf(Object.values(UserRole)))
    .min(1)
    .required()
})
