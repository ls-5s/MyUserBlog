const express = require('express')
const router = express.Router()
const { Useregister, Uselogin } = require('../service/userlogin.js')

// 注册
router.post('/register', async (req, res) => {
    try {
        const result = await Useregister(req, res)
        if (result.userExist === true) {
            res.status(409).json({
                code: 409,
                message: '账号存在',
                token: ''
            })
        } else {
            res.status(201).json({
                code: 201,
                message: '注册成功',
                token: 'Bearer ' + result.token
            })
        }
        // console.log(token)
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: '注册失败,用户名已存在',
            error: error.message
        })

    }
})
// 登录
router.post('/login', async (req, res) => {
    try {
        const result = await Uselogin(req, res)
        if (result.userExist === true) {
            res.status(201).json({
                code: 201,
                message: '登录成功',
                token: 'Bearer ' + result.token,
                username: req.body.username
            })
            
        } else {
            res.status(401).json({
                code: 401,
                message: '登录失败,用户名或密码错误',
                token: ''
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message,
            
        })
    }
})
module.exports = router;



