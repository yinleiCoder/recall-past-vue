<script setup>
import { computed, onMounted } from "vue";
import PostDetail from "../components/PostDetail.vue";
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { usePostStore } from "../stores/post";

const postStore = usePostStore();
const posts = computed(() => postStore.list);

onMounted(() => {
  postStore.loadAllPosts();
  postStore.likedPost();
});
</script>

<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post._id"/>
      <!-- <PostDetail /> -->
    </PostList>
  </div>
</template>

<style scoped></style>
