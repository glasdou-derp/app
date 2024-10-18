import * as yup from 'yup'

export const customerSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup.string().email('El email no es valido').required('El email es requerido')
})
