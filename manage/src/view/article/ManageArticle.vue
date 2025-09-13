<script setup>
import { ref, computed } from 'vue';

// 生成20条测试文章数据
const generateTestArticles = () => {
  const articles = [];
  const categories = ['技术', '生活', '科技', '教育', '职场'];

  for (let i = 1; i <= 20; i++) {
    // 生成日期（最近30天内的随机日期）
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const formattedDate = date.toISOString().split('T')[0];

    articles.push({
      id: i,
      title: `测试文章${i}: Vue.js实用技巧分享`,
      category: categories[Math.floor(Math.random() * categories.length)],
      publishDate: formattedDate
    });
  }

  return articles;
};

// 原始文章数据（20条测试数据）
const allArticles = ref(generateTestArticles());

// 分页相关数据
const total = ref(allArticles.value.length); // 总数据条数
const currentPage = ref(1);
const pageSize = ref(10); // 每页最多10条数据

// 计算当前页显示的文章数据
const articles = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return allArticles.value.slice(startIndex, endIndex);
});

// 处理页码变更
const handleCurrentChange = (val) => {
  currentPage.value = val;
  // 这里可以添加获取对应页码数据的逻辑（如果是从API获取）
  console.log('当前页码:', val);
};
</script>
<template>
  <div class="common-layout">
    <div class="top">
      文章管理
    </div>
    <div class="content">
      <!-- 文章列表表格 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="id" label="文章ID" width="80" />
        <el-table-column prop="title" label="文章标题" min-width="300" />
        <el-table-column prop="category" label="文章分类" width="120" />
        <el-table-column prop="publishDate" label="发布日期" width="120" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.common-layout {
  height: 100%;
}
.top {
  height: 60px;
  line-height: 60px;
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

/* 分页容器样式 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
