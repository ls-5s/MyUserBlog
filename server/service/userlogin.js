const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { AppDataSource } = require('../data.source');
const { User } = require('../entity/User');

const saltRounds = 10

// 注册
const Useregister = async (req, res) => {
    try {
        const { username, password } = req.body
        // 密码加密
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        // 检查用户是否已存在

        const userRepository = AppDataSource.getRepository(User);
        let userExist = await userRepository.findOne({
            where: { username: username }
        })
        // console.log("查询用户结果:", userExist ? "已存在" : "不存在");
        if (userExist === null) {
            // 5. 构建用户实体
            const user = userRepository.create({
                username: username,
                password: hashedPassword,
            });

            // 6. 保存用户日志
            const result = await userRepository.save(user);
            console.log("保存用户成功:", result);
            //  res.status(201).json({ message: "注册成功" });
            const token = jwt.sign({ username }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })
            return {
                token,
                userExist
            }
        }
        else {
            userExist = true
            return {
                token: '',
                userExist: true
            }
        }
        // 生成token


    }
    catch (error) {
        throw error
    }

}
// 登录
const Uselogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const userRepository = AppDataSource.getRepository(User);
        let userExist = await userRepository.findOne({
            where: { username: username }
        })
        // 检查用户是否存在
        if (userExist === null) {
            return {
                token: '',
                userExist: false
            }
        }
        
        if (username && (await bcrypt.compare(password, userExist.password))) {
            const token = jwt.sign(
                { username }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            return {
                token,
                userExist: true
            }

        } else {
            return {
                token: '',
                userExist: false
            }
        }
    }
    catch (error) {
        throw error
    }
}
module.exports = {
    Useregister,
    Uselogin
}
