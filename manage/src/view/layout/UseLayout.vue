<template>
  <div class="simple-component">
    <h2>{{ title }}</h2>
    <p>当前值: {{ count }}</p>
    <button @click="increase">增加</button>
    <button @click="reset">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const title = ref('简单Vue3组件')
const count = ref(0)

// 方法
const increase = () => {
  count.value++
}

const reset = () => {
  count.value = 0
}
</script>

<style scoped>
.simple-component {
  text-align: center;
  padding: 20px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
