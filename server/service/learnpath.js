const path = require('path');
// const fs = require('fs').promises;
const { readFileData, writeFileData } = require('./fs/wr.js');
const dataSource = path.join(__dirname, './learn.json');
const learnstackSource = path.join(__dirname, './learnstack.json');

// 发布学习路径
const postlearn = async (req, res) => {
    try {
        const { stack, prerequisites, time, resources, introduction, content } = req.body;
        const learnData = await readFileData(dataSource);
        // 使用与JSON文件中相同的小写字段名
        const index = learnData[stack]
        console.log(index); // 现在应该能正确打印索引值了
        if (index === -1) {
            learnData.stack = {
                stack: stack,
                prerequisites: prerequisites,
                time: time,
                resources: resources,
                introduction: introduction,
                content: content
            }
            await writeFileData(dataSource, learnData);
            return res.status(201).json({
                code: 201,
                message: '添加学习路径成功',
                data: null
            })
        }
        learnData[stack] = {
                stack: stack,
                prerequisites: prerequisites,
                time: time,
                resources: resources,
                introduction: introduction,
                content: content
            }
        await writeFileData(dataSource, learnData);
        res.status(201).json({
            code: 201,
            message: '更改学习路径成功',
        })
    } catch (error) {
        console.error('发布学习路径失败:', error)
        res.status(500).json({
            code: 500,
            message: '发布学习路径失败',
            data: null
        })
    }
}
// 获取学习路径
const getlearn = async (req, res) => {
    try {
        const learnData = await readFileData(dataSource);
        res.status(201).json({
            code: 201,
            message: '获取学习路径成功',
            data: learnData
        })
    } catch (error) {
        console.error('获取学习路径失败:', error)
        res.status(500).json({
            code: 500,
            message: '获取学习路径失败',
            data: null
        })
    }
}
// 发布学习路径技术栈
const postlearnstack = async (req, res) => {
    try {
        const { category, stack, time, introduction } = req.body;
        const learnstackData = await readFileData(learnstackSource);
        // 使用与JSON文件中相同的小写字段名
        const index = learnstackData.findIndex(item => item.stack === stack);
        console.log(index); // 现在应该能正确打印索引值了
        if (index === -1) {
            learnstackData.push({
                category: category,
                stack: stack,
                time: time,
                introduction: introduction,

            })
            await writeFileData(learnstackSource, learnstackData);
            return res.status(201).json({
                code: 201,
                message: '添加学习路径技术栈成功',
                data: null
            })
        }
        // 更新时也使用小写字段名
        learnstackData[index].stack = stack
        learnstackData[index].time = time;
        learnstackData[index].introduction = introduction;
        await writeFileData(learnstackSource, learnstackData);
        res.status(201).json({
            code: 201,
            message: '更改学习路径技术栈成功',
        })
    } catch (error) {
        console.error('发布学习路径技术栈失败:', error)
        res.status(500).json({
            code: 500,
            message: '发布学习路径技术栈失败',
            data: null
        })
    }
}
// 获取学习路径技术栈
const getlearnstack = async (req, res) => {
    try {
        const { category} = req.query;
        const learnstackData = await readFileData(learnstackSource);
        const learnstackPath = learnstackData.filter(item => item.category === category);
        if (!learnstackPath) {
            return res.status(404).json({
                code: 404,
                message: '学习路径技术栈不存在',
                data: null
            })
        }
        res.status(201).json({
            code: 201,
            message: '获取学习路径技术栈成功',
            data: learnstackPath
        })
    } catch (error) {
        console.error('获取学习路径技术栈失败:', error)
        res.status(500).json({
            code: 500,
            message: '获取学习路径技术栈失败',
            data: null
        })
    }
}
module.exports = {

    postlearn,
    getlearn,
    postlearnstack,
    getlearnstack
}
