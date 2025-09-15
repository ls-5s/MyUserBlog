<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/message/style/css';
import { getArticleList, deleteArticle } from '@/api/article'
import { useUserStore } from '@/stores/index'
import { formatDate } from '@/utils/format'

const list = ref([])
const useStore = useUserStore()

// 分页相关数据
const total = ref(0); // 初始化为0
const currentPage = ref(1);
const pageSize = ref(5); // 每页最多5条数据

// 获取文章列表
const fetchArticleList = async () => {
  try {
    const res = await getArticleList({ username: useStore.username })
    list.value = res.data.articles || [];
    total.value = list.value.length; // 同步更新总数
  } catch (error) {
    console.error('获取文章列表失败:', error);
    ElMessage.error('获取文章列表失败');
  }
}

// 计算当前页显示的文章数据
const articles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return list.value.slice(startIndex, endIndex);
});

// 处理页码变更
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

// 编辑文章
const handleEdit = (articleId) => {
  console.log('编辑文章:', articleId);
  // 实际项目中这里可以跳转到编辑页面或打开编辑弹窗
};

// 删除文章
const handleDelete = async (articleId) => {
  try {
    const res = await deleteArticle(articleId)
    console.log(res)
    if (res.data.code === 201) {
      ElMessage.success("删除文章成功")
      await fetchArticleList() // 重新获取列表
    }
    else {
      ElMessage.error(res.message || '删除失败')
    }
  } catch (error) {
    console.error('删除文章失败:', error);
    ElMessage.error('删除文章失败');
  }
};

onMounted(async () => {
  await fetchArticleList()
})
</script>
<template>
  <div class="common-layout">
    <div class="top">
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
  cursor: pointer;
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
  flex: 1;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.article-list::-webkit-scrollbar {
  display: none;
}

/* 文章卡片样式 */
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
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
  margin-right: 16px;
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
  align-items: flex-end;
}

/* 分页容器样式 */
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
