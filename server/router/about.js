const express = require('express'); // 注意：原始代码中缺少这一行导入
const router = express.Router();
const {about, getAbout} = require('../service/aboutsum')

// 后台个人中心的所有数据
router.post('/about', async (req, res) => {
  try {
    await about(req, res);
  } catch (error) {
    res.status(500).json({ code: 500, error: '数据发布失败' });
  }
})
// 前台获取对应id数据
router.get('/about', async (req, res) => {
  try {
    await getAbout(req, res);
  } catch (error) {
    res.status(500).json({ code: 500, error: '数据获取失败' });
  }
})
module.exports = router;