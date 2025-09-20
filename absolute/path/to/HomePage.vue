.right-top-bottom {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  justify-content: center; /* 确保居中 */
  flex-wrap: nowrap; /* 强制在一行显示，不换行 */
  width: 100%;
}

/* 也可以稍微调整链接的宽度，让它们更加统一 */
.right-top-bottom a {
  flex: 1; /* 使两个链接宽度相等 */
  justify-content: center; /* 确保链接内的内容居中 */
  max-width: 150px; /* 设置最大宽度，防止在宽屏上过度拉伸 */
}

/* 在移动设备上保持良好显示 */
@media (max-width: 480px) {
  .right-top-bottom {
    flex-direction: column; /* 在非常小的屏幕上垂直排列 */
    align-items: center;
  }
  
  .right-top-bottom a {
    width: 100%;
    max-width: none;
  }
}