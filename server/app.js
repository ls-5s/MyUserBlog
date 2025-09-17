const express = require('express')
const app = express()
const router = require('./router/login')
const articleRouter = require('./router/article')
const cors = require('cors')
const{ AppDataSource }= require('./data.source')

app.use(cors())
app.use(express.json())
app.use('/user', router)
app.use('/article', articleRouter)

app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') {
      console.log('JWT验证失败:', err.message);
      return res.status(401).json({
         code: 401,
         message: 'Token验证失败',
         error: err.message
      });
   }
   console.log(err)
   res.status(500).json({
      code: 500,
      message: err.message,
      data: null
   })
})

// 初始化数据库并启动服务器
AppDataSource.initialize()
   .then(() => {
      console.log("数据库连接已建立");
      app.listen(3000, () => {
         console.log('Server is running on port: http://localhost:3000')
      })
   })
   .catch((error) => {
      console.error("数据库连接错误:", error);
   });
