const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { Article } = require('../entity/Article');
const { Like } = require('typeorm'); // 添加Like函数的导入

// 根据标题查询文章列表
const getArticleListByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const articleRepository = AppDataSource.getRepository(Article);

        // 构建查询条件
        const queryConditions = title ? { title: Like(`%${title}%`) } : {};

        const articles = await articleRepository.find({
            where: queryConditions,
            order: {
                createTime: 'DESC' 
            }
        });

        if (!articles || articles.length === 0) {
            return res.status(404).json({ code: 404, message: '文章不存在' });
        }
        // console.log(articles)

        res.status(201).json({ // 使用正确的状态码
            code: 201,
            message: '文章列表获取成功',
            success: true,
            articles: articles // 直接返回查询结果数组
        });
    } catch (error) {
        console.error('获取文章列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
};

// 导出函数
module.exports = {
    getArticleListByTitle
};