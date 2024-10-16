import { envs } from '@/config/envs'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Theme = 'light' | 'dark'

export const useConfigStore = defineStore('config', () => {
  const theme = ref(useLocalStorage<Theme | null>('theme', null))
  const title = ref('OTP App')
  const isMobile = ref(window.innerWidth <= 768)

  const setAppTheme = () => {
    const element = document.querySelector('html')
    element?.classList.remove('dark')

    //? check system theme preference if no theme is set
    if (!theme.value) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      theme.value = systemPrefersDark ? 'dark' : 'light'
    }

    if (theme.value === 'dark') element?.classList.add('dark')
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'

    setAppTheme()
  }

  return {
    //? Props
    title,
    isMobile,

    //* Getters
    darkTheme: computed(() => theme.value === 'dark'),

    //! Actions
    setAppTheme,
    toggleTheme,
    setTitle: (newTitle: string) => {
      title.value = `${newTitle} | ${envs.title}`.trim()
    },
    setIsMobile: (newValue: boolean) => (isMobile.value = newValue)
  }
})
