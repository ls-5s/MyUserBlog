import { defineStore } from 'pinia'

import { ref } from 'vue'
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')
  const addToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  return {
    token,
    addToken,
    removeToken,

  }
}, {
  persist: true
})
