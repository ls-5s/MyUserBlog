const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');

const { Article } = require('../entity/Article'); // 修复实体文件名

// 删除文章
const deleteArticle = async (req, res) => {
    const { id } = req.query;
    console.log(id)
    const articleRepository = AppDataSource.getRepository(Article);
    try {
        const article = await articleRepository.findOne({ where: { id: id } });

        if (!article) {
            return res.status(404).json({ message: '文章不存在' });
        }
        await articleRepository.remove(article);
        res.status(201).json({
            code: 201,
            message: '文章删除成功'
        });
    } catch (error) {
        res.status(500).json({ message: '删除文章失败', error: error.message });
    }
}
module.exports = {
    deleteArticle
}
