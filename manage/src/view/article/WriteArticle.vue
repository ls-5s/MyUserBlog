<template>
  <div>
    <div class="top">
      <el-input v-model="input.title" style="width: 1000px; height: 70px; border-left: none !important; "
        placeholder="输入文章标题..." />
      <el-select clearable v-model="input.type" placeholder="文章分类" style="width: 240px ;height: 40px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button type="primary" @click="ADD">发布</el-button>
    </div>
    <div class="content">
      <!-- 添加 ref 属性和滚动事件监听 -->
      <el-input ref="editorLeft" v-model="input.content" style="width: 100%; height: 750px; resize: none;" :rows="37"
        type="textarea" @scroll="syncScroll('left')" />
      <el-input ref="editorRight" v-model="input.content" style="width: 100%; height: 750px; resize: none;" :rows="37"
        type="textarea" @scroll="syncScroll('right')" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const input = ref({
  title: '',
  type: '',
  content: ''
})
// 文章分类
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
// 创建引用以访问DOM元素
const editorLeft = ref(null)
const editorRight = ref(null)
// 标记当前正在滚动的编辑器，避免循环触发滚动事件
let scrollingEditor = ''

// 滚动同步函数
const syncScroll = (source) => {
  // 如果已经有编辑器在滚动，则不执行操作，避免循环
  if (scrollingEditor && scrollingEditor !== source) {
    return
  }

  scrollingEditor = source

  nextTick(() => {
    const sourceEl = source === 'left' ? editorLeft.value?.$el : editorRight.value?.$el
    const targetEl = source === 'left' ? editorRight.value?.$el : editorLeft.value?.$el

    if (sourceEl && targetEl) {
      // 找到实际的滚动容器
      const sourceScroll = sourceEl.querySelector('.el-textarea__inner') || sourceEl
      const targetScroll = targetEl.querySelector('.el-textarea__inner') || targetEl

      // 同步滚动位置
      targetScroll.scrollTop = sourceScroll.scrollTop
      targetScroll.scrollLeft = sourceScroll.scrollLeft
    }

    // 重置滚动标记
    setTimeout(() => {
      scrollingEditor = ''
    }, 10)
  })
}

const ADD = () => {
  console.log(input.value.title)
}
</script>
<style scoped>
* {
  box-sizing: border-box;
  /* 可选，让 padding 和 border 不影响元素总宽度 */
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgb(255, 255, 255);
  height: 70px;
  border-bottom: 1px solid rgb(235, 237, 240);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;

}

.el-input {
  font-size: 25px;
  font-weight: bold;
}

.el-select {
  margin-left: 30px;
}

.el-button {
  margin-left: 270px;
}

.content {
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgb(255, 255, 255);
  height: 800px;
  gap: 10px;
  padding: 10px;
}

/* 确保每个编辑器占满宽度 */
.content .el-input {
  width: 100%;
}
</style>
