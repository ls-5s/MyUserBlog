const express = require('express')
const router = express.Router()
const { getLatestArticles } = require('../service/classLatest')
const { getArticleCount } = require('../service/classCount')
// 最新文章5篇
router.get('/latest', (req, res) => {
    try {
        getLatestArticles(req, res)
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取最新文章失败',
            data: null
        })
    }

})
// 文章数量
router.get('/count', (req, res) => {
    try {
        getArticleCount(req, res)
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取文章数量失败',
            data: null
        })
    }
})
module.exports = router
