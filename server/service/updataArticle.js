const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article'); // 修复实体文件名

// 修改文章
const updateArticle = async (req, res) => {
    const { id, title, type, content, markdownContent } = req.body;

    if (!id || !title || !type || !content || !markdownContent) {
        return res.status(400).json({ message: '缺少必要字段' });
    }
    try {
        const articleRepository = AppDataSource.getRepository(Article);
        const article = await articleRepository.findOne({ where: { id: id } });
        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }
        article.title = title;
        article.type = type;
        article.content = content;
        article.markdownContent = markdownContent;
        await articleRepository.save(article);
        res.status(201).json({
            code: 201,
            message: '文章更新成功'
        });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error: error.message });
    }
}
module.exports = { updateArticle }
