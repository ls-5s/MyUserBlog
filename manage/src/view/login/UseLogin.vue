<script setup>
import { ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { register, login } from "@/api/login"
import router from '@/router/index'
import { useUserStore } from '@/stores/index'
const userStore = useUserStore()
const isForm = ref(false)
const form = ref()
const fromModel = ref({
  username: '',
  password: ''
})

watch(isForm, () => {
  fromModel.value = {
    username: '',
    password: '',

  }
})
// 3. 正则校验 pattern: 正则规则  \S 非空字符
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^.{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
  ],
}

// 注册
const registerSubmit = async () => {
  try {
    await form.value.validate()
    const res = await register(fromModel.value)
    console.log(res.data.code)
    if (res.data.code === 201) {
      ElMessage.success('注册成功')
    }
    fromModel.value = {
      username: '',
      password: '',

    }

  } catch (error) {
    fromModel.value = {
      username: '',
      password: '',

    }
     console.log(error.response.data.message)

  }
}
// 登录
const loginSubmit = async () => {
  try {
    await form.value.validate()
    const res = await login(fromModel.value)

    console.log(res.data.token)
    if (res.data.code === 201) {
      userStore.addToken(res.data.token, res.data.username)
      ElMessage.success('登录成功')
      router.push('/UseLayout')

    }

    // 确认 token 已设置

    fromModel.value = {
      username: '',
      password: '',

    }

  } catch (error) {
    fromModel.value = {
      username: '',
      password: '',

    }
     console.log(error)

  }
}
</script>
<template>
  <el-row>
    <el-col :span="12">
      <img src="@/assets/logo.png" alt="" />
    </el-col>
    <el-col :span="6" :offset="3">
      <el-form v-if="isForm" :model="fromModel" :rules="rules" ref="form">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="fromModel.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" v-model="fromModel.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerSubmit">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="isForm = false">去登录</el-link>
        </el-form-item>
      </el-form>
      <el-form v-else :model="fromModel" :rules="rules" ref="form">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="fromModel.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" v-model="fromModel.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="isForm = true">去注册</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.el-row {

  display: flex;
  align-items: center
}

img {
  width: 100%;
  height: 880px;
}

.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  width: 80%;
  height: 400px;
  background-color: rgba(255, 255, 255);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.el-input {
  width: 300px;
}
</style>
