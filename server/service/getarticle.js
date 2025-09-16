const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article'); // 修复实体文件名

// 文章列表(获取个人所有文章)
const getArticleList = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await AppDataSource.manager.findOne(User, {
            where: { username },
            relations: { articles: true },
            // 添加排序配置，指定 articles 的排序字段和方式
            order: {
                articles: {
                    // 假设文章有 createTime 字段，按创建时间升序
                    // 可替换为实际需要排序的字段（如 id、publishTime 等）
                    createTime: 'DESC'
                }
            }
        });
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }
        // 修复核心逻辑：遍历articles数组并格式化响应
        // const articles = user.articles.map(article => ({
        //     title: article.title,
        //     content: article.content,
        //     type: article.type,
        //     id: article.id,
        //     createTime: article.createTime // 注意：实体中定义的是createTime而非time
        // }));

        res.status(201).json({ // 修复状态码为201
            code: 201,
            message: '文章列表获取成功',
            success: true,
            articles: user.articles // 返回格式化后的文章数组
        });
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
}

module.exports = {
    getArticleList
}
