<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/message/style/css';
import { getArticleList, deleteArticle, searchArticle } from '@/api/article'
import { useUserStore } from '@/stores/index'
import { formatDate } from '@/utils/format'
import router from '@/router/index'
const list = ref([])

const input = ref('')

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
const handleEdit = async (articleId) => {
  await router.push('/article/update?id=' + articleId)
  // console.log(articleId)

};

// 删除文章
const handleDelete = async (articleId) => {
  try {
    const res = await deleteArticle(articleId)
    // console.log(res)
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
// 搜索文章
const handleSearch = async () => {
  try {
    // 添加搜索关键词验证
    if (!input.value.trim()) {
      ElMessage.warning('请输入搜索关键词');
      return;
    }
    const res = await searchArticle(input.value)
    input.value = ''
    console.log(res)
    if (res.data.code === 201) {
      currentPage.value = 1; // 搜索后重置当前页码
      list.value = res.data.articles || [];
      total.value = list.value.length; // 同步更新总数
      ElMessage.success('搜索成功')
    }
    else {
      ElMessage.error(res.message || '搜索失败')
    }
  } catch (error) {
    input.value = ''
    console.error('搜索文章失败:', error);
    ElMessage.error('搜索文章失败', error.message);
  }
}
// 重新获取文章列表
const refreshArticleList = async () => {
  currentPage.value = 1; // 搜索后重置当前页码
  await fetchArticleList()
  ElMessage.success('刷新成功')
}
onMounted(async () => {
  await fetchArticleList()
})
</script>
<template>
  <div class="common-layout">
    <!-- 现代化头部样式 -->
    <div class="header-section">
      <div class="header-left">
        <h1 class="page-title">📝 文章管理</h1>
        <p class="page-subtitle">管理和编辑您的所有文章内容</p>
      </div>
      <div class="header-right">
        <div class="search-wrapper">
          <el-input @keyup.enter="handleSearch" v-model="input" :prefix-icon="Search" placeholder="请输入文章标题关键词"
            class="search-input" />
          <div class="button-group">
            <el-button type="primary" @click="handleSearch" class="search-btn">
              <Search class="search-icon" />
              查询
            </el-button>
            <el-button type="success" @click="refreshArticleList" class="reset-btn">
              重置
            </el-button>
          </div>
        </div>
      </div>
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
/* 全局容器样式 - 减小整体高度 */
.common-layout {
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
}

/* 现代化头部样式 */
.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 32px; /* 从24px改为16px，减小垂直内边距 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 80px; /* 从120px改为80px，降低头部高度 */
}

/* 内容区域样式 - 相应调整高度计算 */
.content {
  height: calc(100% - 100px); /* 从140px改为100px，与头部高度保持适配 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 其他样式保持不变 */
.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 从8px改为4px，减小标题与副标题间距 */
}

.page-title {
  margin: 0;
  font-size: 24px; /* 从28px改为24px，适当减小标题大小 */
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  font-weight: 300;
}

.header-right {
  flex: 1;
  max-width: 600px;
  min-width: 300px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

.search-input input {
  background: transparent !important;
  color: white !important;
}

.search-input input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.button-group {
  display: flex;
  gap: 8px;
}

.search-btn,
.reset-btn {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-btn {
  background: white;
  color: #667eea;
  border: none;
}

.search-btn:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.reset-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.search-icon {
  font-size: 14px;
}

.content {
  height: calc(100% - 140px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    padding: 20px 16px;
    text-align: center;
  }

  .header-left {
    align-items: center;
  }

  .page-title {
    font-size: 24px;
  }

  .header-right {
    width: 100%;
  }

  .search-wrapper {
    justify-content: center;
  }

  .search-input {
    width: 100%;
    max-width: 400px;
  }

  .button-group {
    width: 100%;
    justify-content: center;
  }

  .content {
    margin: 8px;
    padding: 16px;
  }
}
</style>
