const express = require('express'); // 注意：原始代码中缺少这一行导入
const router = express.Router();
const { writeArticle } = require('../service/writearticle');
const { getArticleList } = require('../service/getarticle');
const { deleteArticle } = require('../service/deletearticle');
const { getArticleListByTitle } = require('../service/getArticleList');
const { updateArticle } = require('../service/updataArticle');
const { getArticleDetail } = require('../service/getArticleDetail');

// 文章发布
router.post('/write', async (req, res) => {
    try {
        await writeArticle(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})

// 文章列表(获取个人所有文章)
router.get('/list', async (req, res) => {
    try {
        await getArticleList(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})
// 删除文章
router.delete('/delete', async (req, res) => {
    try {
        await deleteArticle(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})
// 根据标题查询文章
router.get('/search', async (req, res) => {
    try {
        await getArticleListByTitle(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})
// 修改文章
router.post('/update', async (req, res) => {
    try {
        await updateArticle(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})
// 根据id查询修改+文章详情
router.get('/detail', async (req, res) => {
    try {
        await getArticleDetail(req, res);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
})
module.exports = router;