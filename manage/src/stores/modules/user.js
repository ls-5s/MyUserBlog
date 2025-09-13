import { defineStore } from 'pinia'

import { ref } from 'vue'
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')
  const username = ref('')
  const addToken = (newToken, newUsername) => {
    token.value = newToken
    username.value = newUsername
  }
  const removeToken = () => {
    token.value = ''
    username.value = ''
  }
  return {
    token,
    addToken,
    removeToken,
    username

  }
}, {
  persist: true
})
