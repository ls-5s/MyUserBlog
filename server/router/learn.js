const express = require('express')
const router = express.Router()
const { postlearn, getlearn, postlearnstack, getlearnstack } = require('../service/learnpath');
// 发布学习路径详情
router.post('/path', (req, res) => {
    try {
        postlearn(req, res);
    } catch (error) {
        console.error('发布学习路径失败:', error)
        res.status(500).json({
            code: 500,
            message: '发布学习路径失败',
            data: null
        })
    }
})
// 获取学习路径详情
router.get('/path', (req, res) => {
    try {
        getlearn(req, res);
    } catch (error) {
        console.error('获取学习路径失败:', error)
        res.status(500).json({
            code: 500,
            message: '获取学习路径失败',
            data: null
        })
    }
})
// 发布学习路径技术栈
router.post('/stack', (req, res) => {
    try {
        postlearnstack(req, res);
    } catch (error) {
        console.error('发布学习路径技术栈失败:', error)
        res.status(500).json({
            code: 500,
            message: '发布学习路径技术栈失败',
            data: null
        })
    }
})
// 获取学习路径技术栈
router.get('/stack', (req, res) => {
    try {
        getlearnstack(req, res);
    } catch (error) {
        console.error('获取学习路径技术栈失败:', error)
        res.status(500).json({
            code: 500,
            message: '获取学习路径技术栈失败',
            data: null
        })
    }
})
module.exports = router
