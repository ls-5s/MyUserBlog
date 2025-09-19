const path = require('path');
const fs = require('fs').promises;

const dataSource = path.join(__dirname, './data.json');

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

// 处理 about 请求
const about = async (req, res) => {
  try {
    const { about, id } = req.body;
    const data = await readFileData();
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) 
      return res.status(404).json({ code: 404, error: '数据不存在' });
    
    data[index].about = about;
    data[index].id = id;
    await writeFileData(data);
    res.status(201).json({ code: 201, message: '数据发布成功', data: data[index] });
  } catch (error) {
    res.status(500).json({ code: 500, error: '数据发布失败' });
  }
};
// 前台获取所有数据
const getAbout = async (req, res) => {
  try {
    const { id } = req.query;
    // console.log(id);
    const data = await readFileData();
    // console.log(data);
    const aboutData = data.find(item => item.id == id);
    // console.log(aboutData);
    if (!aboutData) 
      return res.status(404).json({ code: 404, error: '数据不存在' });
    // console.log(aboutData);
    res.status(201).json({ code: 201, data: aboutData });
  } catch (error) {
    res.status(500).json({ code: 500, error: '数据获取失败' });
  }
};


module.exports = { about, getAbout };