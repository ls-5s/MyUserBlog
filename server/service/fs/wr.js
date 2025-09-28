const fs = require('fs').promises;

// 读取文件
async function readFileData(dataSource) {
    try {
        const data = await fs.readFile(dataSource, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取失败:', error.message);
        return error.code === 'ENOENT' ? {} : Promise.reject(error);
    }
}

// 写入文件
async function writeFileData(dataSource, data) {
    try {
        const jsonString = JSON.stringify(typeof data === 'object' && data !== null ? data : {}, null, 2);
        await fs.writeFile(dataSource, jsonString, 'utf8');
        console.log('写入成功');
    } catch (error) {
        console.error('写入失败:', error.message);
        throw error;
    }
}
module.exports = {
    readFileData,
    writeFileData
}
