const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article'); // 修复实体文件名

// 最新文章5篇
const getLatestArticles = async (req, res) => {
    try {
        const articleRepository = AppDataSource.getRepository(Article);
        const articles = await articleRepository.find({
            order: {
                createTime: 'DESC'
            },
            take: 5
        });
        res.status(201).json({
            code: 201,
            message: '最新文章',
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '获取最新文章失败',
            data: null
        })
    }
}
module.exports = {
    getLatestArticles
}
