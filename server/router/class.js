const express = require('express')
const router = express.Router()
const { getLatestArticles } = require('../service/classLatest')
// 最新文章5篇 + 文章长度
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
module.exports = router
