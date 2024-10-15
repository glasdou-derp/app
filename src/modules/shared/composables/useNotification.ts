import { useToast } from 'primevue/usetoast'

interface NotificationProps {
  summary?: string
  detail?: string
  severity?: 'success' | 'error' | 'warn' | 'info'
  life?: number
}

export const useNotification = () => {
  const toast = useToast()

  const notify = (props: NotificationProps) => {
    const {
      severity = 'info',
      summary = 'Info',
      detail = 'No detail provided',
      life = 1000
    } = props
    toast.add({ severity, summary, detail, life })
  }

  return {
    notifySuccess: (props: NotificationProps) => notify({ ...props, severity: 'success' }),
    notifyError: (props: NotificationProps) => notify({ ...props, severity: 'error', life: 3000 }),
    notifyWarn: (props: NotificationProps) => notify({ ...props, severity: 'warn' }),
    notifyInfo: (props: NotificationProps) => notify({ ...props, severity: 'info' })
  }
}
