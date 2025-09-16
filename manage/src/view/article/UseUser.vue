<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';
import { getArticleList, deleteArticle } from '@/api/article'
import { useUserStore } from '@/stores/index'
import { formatDate } from '@/utils/format'

const list = ref([])
const useStore = useUserStore()


// 新增文章
const add = async () => {
  const res = await getArticleList({ username: useStore.username })

  list.value = res.data.articles
  console.log(list.value)
}



// 分页相关数据
const total = ref(list.value.length); // 总数据条数
const currentPage = ref(1);
const pageSize = ref(5); // 每页最多5条数据

// 计算当前页显示的文章数据
const articles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return list.value.slice(startIndex, endIndex);
});

// 处理页码变更
const handleCurrentChange = (val) => {
  currentPage.value = val;
  console.log('当前页码:', val);
};

// 编辑文章
const handleEdit = (articleId) => {
  console.log('编辑文章:', articleId);
  // 实际项目中这里可以跳转到编辑页面或打开编辑弹窗
};

// 删除文章
const handleDelete = async (articleId) => {
  const res = await deleteArticle(articleId)
  if (res.code === 201) {

    ElMessage.success("删除文章成功")
    await add()
  } else {
    ElMessage.error(res.message)
  }
};
onMounted(() => {
  add()
})
</script>
<template>
  <div class="common-layout">
    <div class="top" @click="add">
      文章管理
    </div>
    <div class="content">
      <!-- 文章列表 - 使用框框布局 -->
      <div class="article-list">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-info">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-date">{{ formatDate(article.createTime) }}</p>

          </div>
          <div class="article-actions">
            <el-button type="primary" size="small" @click="handleEdit(article.id)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(article.id)">
              删除
            </el-button>
          </div>
        </div>
      </div>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage"
          :page-size="pageSize" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 全局容器样式 */
.common-layout {
  height: 100%;
}

.top {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content {
  height: calc(100% - 60px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

/* 文章列表容器样式 - 调整间距并隐藏滚动条 */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* 减小文章卡片之间的间距 */
  flex: 1;
  overflow-y: auto;
  /* 隐藏滚动条但保留滚动功能 */
  -ms-overflow-style: none;
  /* IE和Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* 隐藏Chrome和Safari的滚动条 */
.article-list::-webkit-scrollbar {
  display: none;
}

/* 文章卡片样式 */
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  /* 减小内边距 */
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* 文章信息区域 */
.article-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* 减小标题和日期之间的间距 */
  margin-right: 16px;
  /* 增加与操作按钮之间的间距 */
}

.article-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  max-width: 100%;
}

.article-date {
  margin: 0;
  font-size: 14px;
  color: #999;
}

/* 文章操作按钮区域 */
.article-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  /* 减小按钮之间的间距 */
  align-items: flex-end;
}

/* 分页容器样式 - 向上移动50px */
.pagination-container {

  display: flex;
  justify-content: flex-end;
}
</style>
