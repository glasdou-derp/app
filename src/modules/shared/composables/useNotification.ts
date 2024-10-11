import { useToast } from 'primevue/usetoast'

interface NotificationProps {
  summary?: string
  detail?: string
  severity?: 'success' | 'error' | 'warn' | 'info'
}

export const useNotification = (life: number = 1000) => {
  const toast = useToast()

  const notify = (props: NotificationProps) => {
    const { severity = 'info', summary = 'Info', detail = 'No detail provided' } = props
    toast.add({ severity, summary, detail, life })
  }

  return {
    notifySuccess: (props: NotificationProps) => notify({ ...props, severity: 'success' }),
    notifyError: (props: NotificationProps) => notify({ ...props, severity: 'error' }),
    notifyWarn: (props: NotificationProps) => notify({ ...props, severity: 'warn' }),
    notifyInfo: (props: NotificationProps) => notify({ ...props, severity: 'info' })
  }
}
