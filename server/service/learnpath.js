const path = require('path');
const fs = require('fs').promises;

const dataSource = path.join(__dirname, './learn.json');

// 读取文件
async function readFileData() {
    try {
        const data = await fs.readFile(dataSource, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取失败:', error.message);
        return error.code === 'ENOENT' ? {} : Promise.reject(error);
    }
}

// 写入文件
async function writeFileData(data) {
    try {
        const jsonString = JSON.stringify(typeof data === 'object' && data !== null ? data : {}, null, 2);
        await fs.writeFile(dataSource, jsonString, 'utf8');
        console.log('写入成功');
    } catch (error) {
        console.error('写入失败:', error.message);
        throw error;
    }
}
// 发布学习路径
const postlearn = async (req, res) => {
    try {
        const { stack, prerequisites, time, resources, introduction, content } = req.body;
        const learnData = await readFileData();
        // 使用与JSON文件中相同的小写字段名
        const index = learnData.findIndex(item => item.stack === stack);
        console.log(index); // 现在应该能正确打印索引值了
        if (index === -1) {
            learnData.push({
                stack:stack,
                prerequisites:prerequisites,
                time:time,
                resources:resources,
                introduction:introduction,
                content:content
            })
            await writeFileData(learnData);
            return res.status(201).json({
                code: 201,
                message: '添加学习路径成功',
                data: null
            })
        }
        // 更新时也使用小写字段名
        learnData[index].stack = stack
        learnData[index].prerequisites = prerequisites;
        learnData[index].time = time;
        learnData[index].resources = resources;
        learnData[index].introduction = introduction;
        learnData[index].content = content;

        await writeFileData(learnData);
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
        const { stack } = req.query;
        const learnData = await readFileData();
        const learnPath = learnData.find(item => item.stack === stack);
        if (!learnPath) {
            return res.status(404).json({
                code: 404,
                message: '学习路径不存在',
                data: null
            })
        }
        res.status(201).json({
            code: 201,
            message: '获取学习路径成功',
            data: learnPath
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
module.exports = {
    readFileData,
    writeFileData,
    postlearn,
    getlearn
}
