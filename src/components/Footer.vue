<script setup>
</script>
<template>
  <div class="footerBox isFixed">
    <div class="fLeft">
      <div class="language">
        <span>语言</span>
      </div>
      <div class="dark">
        <span>切换主题</span>
      </div>
      <div class="app">
        <span>APP下载</span>
      </div>
      <div class="us">
        <span>关于我们</span>
      </div>
      <div class="developer">
        <span>联系开发者</span>
      </div>
      <div class="source">
        <span>源码开放</span>
      </div>
      <div class="secure">
        <span>隐私政策</span>
      </div>
    </div>
    <div class="fRight">
      <a href="">
        <span>京ICP备xxxxxxxx号</span>
      </a>
      <a href="">
        <span>Copyright © 2006-2023 RecallPast</span>
      </a>
    </div>
  </div>
</template>
<style scoped>
.footerBox.isFixed {
  position: fixed;
  bottom: 0;
  z-index: 10;
}

.footerBox {
  width: 100%;
  height: 32px;
  padding: 0px 20px;
  font-weight: 400;
  font-size: 12px;
  color: rgb(85, 85, 85);
  border-top: 1px solid rgba(237, 237, 237);
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-around;
  column-gap: 20px;
}

.fLeft,
.fRight {
  display: flex;
  justify-content: space-evenly;
}

.fLeft {
  flex: 3;
}

.fRight {
  flex: 1;
}
</style>
