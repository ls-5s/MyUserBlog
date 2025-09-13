const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');
const { Article } = require('../entity/Article');

const writeArticle = async (req, res) => {
    try {
        const { username, title, type, content } = req.body;
        
        // 1. 验证输入数据
        if (!username || !title || !type || !content) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要的文章信息',
                success: false
            });
        }
        
        // 2. 先查找用户（第一张表）
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                username: username
            }
        });
        
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: '用户不存在',
                success: false
            });
        }
        
        // 3. 然后检查该用户是否已发布相同标题的文章（关联第一张表后查询第二张表）
        const articleRepository = AppDataSource.getRepository(Article);
        
        // 使用QueryBuilder实现先关联用户表再查询文章表的逻辑
        const existingArticle = await articleRepository
            .createQueryBuilder('article')
            .innerJoin('article.user', 'user') // 关联用户表
            .where('article.title = :title', { title: title })
            .andWhere('user.id = :userId', { userId: user.id })
            .getOne();
        
        if (existingArticle) {
            return res.status(409).json({
                code: 409,
                message: '您已发布过相同标题的文章',
                success: false
            });
        }
        
        // 4. 创建新文章
        const article = articleRepository.create({
            title: title,
            type: type,
            content: content,
            createTime: new Date().toISOString() // 格式化时间以匹配varchar类型
        });
        
        // 5. 保存文章到数据库
        const savedArticle = await articleRepository.save(article);
        
        // 6. 重新获取用户并关联文章
        const updatedUser = await userRepository.findOne({
            where: { id: user.id },
            relations: ['articles']
        });
        
        if (!updatedUser.articles) {
            updatedUser.articles = [];
        }
        updatedUser.articles.push(savedArticle);
        await userRepository.save(updatedUser);
        
        // 7. 返回成功响应
        return res.status(201).json({
            code: 201,
            message: '文章发布成功',
            success: true,
            data: {
                articleId: savedArticle.id,
                content: savedArticle.content,
                title: savedArticle.title,
                createTime: savedArticle.createTime,
                userId: user.id,
                username: user.username
            }
        });
    } catch (error) {
        // 错误处理
        console.error('发布文章失败:', error);
        return res.status(500).json({
            code: 500,
            message: '服务器内部错误',
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    writeArticle
};