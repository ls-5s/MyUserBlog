<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/class'
const route = useRoute()
const id = ref(route.query.id)

const article = ref({
  title: '',
  createTime: '',
  type: '',
  content: '',

})
const Detail = async () => {
  const res = await getArticleDetail(id.value)
  console.log(res.data)
  article.value = res.data.article
  console.log(article.value)
}
onMounted(async () => {
  await Detail()
})
</script>
<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p>创建时间: {{ article.createTime }}</p>
    <p>文章类型: {{ article.type }}</p>
    <div v-html="article.content">

    </div>
  </div>
</template>
<style scoped></style>
