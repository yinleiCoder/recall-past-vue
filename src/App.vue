<script setup>
import { provide } from "vue";
import { RouterView } from "vue-router";
import { ElNotification, ElMessage } from "element-plus";
import NavBar from "./components/NavBar.vue";
import Layout from "./components/Layout.vue";
import Footer from "./components/Footer.vue";
import useAxios from "./composables/useAxios";

provide("$http", useAxios());
provide("$message", ElMessage);
provide("$notify", ElNotification);
</script>

<template>
  <template v-if="$route.name !== 'login'">
    <header>
      <NavBar />
    </header>
    <Layout>
      <RouterView></RouterView>
    </Layout>
    <footer>
      <Footer />
    </footer>
    <el-backtop :right="20" :bottom="60" style="color: black" />
  </template>
  <template v-else>
    <RouterView></RouterView>
  </template>
</template>

<style scoped>
header {
  height: 5rem;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

footer {
  width: 100%;
  height: 32px;
  position: relative;
  z-index: 1050;
}

@media (min-width: 1024px) {
}
</style>
