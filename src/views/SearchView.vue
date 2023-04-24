<script setup>
import PostDetail from "../components/PostDetail.vue";
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { usePostStore } from "../stores/post";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const postStore = usePostStore();
const searchResult = computed(() => postStore.searchResultList);
const route = useRoute();
const term = computed(() => route.params.term);
</script>

<template>
  <div>
    <h2 class="title">搜索结果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post"/>
      <!-- <PostDetail /> -->
    </PostList>
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 24px;
}
</style>
