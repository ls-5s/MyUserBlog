const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article'); // 修复实体文件名
// 文章数量
const getArticleCount = async (req, res) => {
    const articleRepository = AppDataSource.getRepository(Article);
    try {
        const count = await articleRepository.count();
        res.status(201).json({
            code: 201,
            message: '获取文章数量成功',
            data: count
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取文章数量失败',
            data: null
        })
    }
}

module.exports = {
    getArticleCount
}
