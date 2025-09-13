<script setup>
import { getArticleList } from '@/api/article'
import { useUserStore } from '@/stores/index'
import { ref } from 'vue'
const list = ref([])
const useStore = useUserStore()
const add = async ()=> {
  const res = await getArticleList({username: useStore.username})

  list.value = res.data.articles[1].content
  console.log(list.value)
}
</script>
<template>
  <div @click="add">
    个人信息
    <div v-html = "list">

    </div>
  </div>
</template>
<style scoped>
.common-layout {
  height: 100%;
}
</style>
