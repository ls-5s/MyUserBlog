<script setup>
import { Management, User } from '@element-plus/icons-vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="header-content-right">管理中心</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen"
            @close="handleClose"> -->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            router>
            <el-menu-item index="/article/write">
              <el-icon>
                <Management />
              </el-icon>
              <span>文章编写</span>
            </el-menu-item>
            <el-menu-item index="/article/manage">
              <el-icon>
                <Management />
              </el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="/UseLayout/user">
              <el-icon>
                <User />
              </el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <!-- <el-sub-menu index="/user">
              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>个人中心</span>
              </template>
<el-menu-item index="/user/profile">
  <el-icon>
    <User />
  </el-icon>
  <span>基本资料</span>
</el-menu-item>
<el-menu-item index="/user/avatar">
  <el-icon>
    <Crop />
  </el-icon>
  <span>更换头像</span>
</el-menu-item>
<el-menu-item index="/user/password">
  <el-icon>
    <EditPen />
  </el-icon>
  <span>重置密码</span>
</el-menu-item>
</el-sub-menu> -->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
* {

  box-sizing: border-box;
  /* 可选，让 padding 和 border 不影响元素总宽度 */
}

.common-layout {
  background: rgb(242, 243, 245);
  margin: 0;

}

.el-header {
  background-color: rgb(255, 255, 255);
  color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  height: 40px;
  /* 必须设置容器高度，否则垂直居中无效果 */
  align-items: center;

}

.header-content-left {
  font-size: 20px;
  margin-right: 50px;
}

.header-content-right {
  font-size: 20px;
  color: rgb(51, 138, 250);
}

.el-aside {
  height: 85vh;
  background-color: rgb(255, 255, 255);
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-radius: 5px;
}

span {
  font-size: 18px;
}

.el-main {
  height: 85vh;
  background: rgb(255, 255, 255);
  margin-top: 70px;
  margin-left: 200px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
}
</style>
