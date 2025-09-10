import { defineStore } from 'pinia'

import { ref } from 'vue'
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')

  return {
    token,

  }
}, {
  persist: true
})
