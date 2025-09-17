const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article'); // 修复实体文件名
// 根据id查询文章详情
const getArticleDetail = async (req, res) => {
    const { id } = req.query;
    const articleRepository = AppDataSource.getRepository(Article);
    try {
        const article = await articleRepository.findOne({
            where: {
                id: id
            }
        });
        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }
        res.status(201).json({
            code: 201,
            article: article
        });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
}
module.exports = {
    getArticleDetail
}