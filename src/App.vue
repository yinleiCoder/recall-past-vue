<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Layout from "./components/Layout.vue";
</script>

<template>
  <header class="header">
    <NavBar />
  </header>
  <Layout>
    <RouterView></RouterView>
  </Layout>
</template>

<style scoped>
.header {
  height: 5rem;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
}

@media (min-width: 1024px) {
}
</style>
